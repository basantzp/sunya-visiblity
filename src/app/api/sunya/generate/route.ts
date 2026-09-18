import { NextRequest, NextResponse } from 'next/server';
import { enrichAndGenerateCopy } from '@/lib/gemini';
import { generateColdEmailCopy } from '@/lib/mailer';
import { discoverPlaces, GooglePlaceResult } from '@/lib/places';
import { resolveTemplateType } from '@/lib/templates';
import { generateWhatsAppMessage } from '@/lib/whatsapp';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = (body.query || 'gym of sankhamul').trim();
    const generateEmail = body.generateEmail !== false;
    const generateWebsite = Boolean(body.generateWebsite);
    const generateWhatsApp = body.generateWhatsApp !== false;
    const customEmail = body.customEmail?.trim();
    const customPhone = body.customPhone?.trim();

    const lowerQuery = query.toLowerCase();

    // Retrieve all qualified valley leads
    const allLeads = await discoverPlaces({ category: 'all', district: 'All' });

    // Try finding matching business
    let matched: GooglePlaceResult | undefined = allLeads.find((lead) => {
      const leadName = lead.name.toLowerCase();
      const leadCategory = lead.category.toLowerCase();
      const leadAddress = lead.address.toLowerCase();

      // Check keyword overlap
      const queryTokens = lowerQuery.split(/\s+/);
      return queryTokens.every(
        (token: string) =>
          leadName.includes(token) || leadCategory.includes(token) || leadAddress.includes(token),
      );
    });

    // If not all tokens match, try partial match
    if (!matched) {
      matched = allLeads.find((lead) => {
        const leadName = lead.name.toLowerCase();
        const leadCategory = lead.category.toLowerCase();
        const leadAddress = lead.address.toLowerCase();

        return (
          lowerQuery.includes(leadCategory) ||
          leadName.includes(lowerQuery) ||
          (lowerQuery.includes('gym') &&
            (leadCategory.includes('gym') || leadName.includes('health club'))) ||
          (lowerQuery.includes('momo') && leadName.includes('momo')) ||
          (lowerQuery.includes('flower') &&
            (leadCategory.includes('flower') || leadName.includes('parijat')))
        );
      });
    }

    // If still no direct match, dynamically construct a realistic lead from query
    if (!matched) {
      let category = 'Local Business';
      if (lowerQuery.includes('gym') || lowerQuery.includes('fitness')) category = 'gym';
      else if (
        lowerQuery.includes('momo') ||
        lowerQuery.includes('restaurant') ||
        lowerQuery.includes('food')
      )
        category = 'restaurant';
      else if (
        lowerQuery.includes('cafe') ||
        lowerQuery.includes('coffee') ||
        lowerQuery.includes('bakery')
      )
        category = 'cafe';
      else if (
        lowerQuery.includes('flower') ||
        lowerQuery.includes('nursery') ||
        lowerQuery.includes('flora')
      )
        category = 'flower shop';
      else if (
        lowerQuery.includes('spa') ||
        lowerQuery.includes('wellness') ||
        lowerQuery.includes('massage')
      )
        category = 'spa';
      else if (
        lowerQuery.includes('clinic') ||
        lowerQuery.includes('doctor') ||
        lowerQuery.includes('dental')
      )
        category = 'clinic';

      let district: 'Kathmandu' | 'Lalitpur' | 'Bhaktapur' = 'Kathmandu';
      if (
        lowerQuery.includes('patan') ||
        lowerQuery.includes('lalitpur') ||
        lowerQuery.includes('jhamsikhel')
      )
        district = 'Lalitpur';
      else if (lowerQuery.includes('bhaktapur')) district = 'Bhaktapur';

      let locationName = 'Kathmandu';
      if (lowerQuery.includes('sankhamul')) locationName = 'Sankhamul';
      else if (lowerQuery.includes('baneshwor')) locationName = 'New Baneshwor';
      else if (lowerQuery.includes('thamel')) locationName = 'Thamel';
      else if (lowerQuery.includes('boudha')) locationName = 'Boudha';
      else if (lowerQuery.includes('lazimpat')) locationName = 'Lazimpat';
      else if (lowerQuery.includes('new road')) locationName = 'New Road';
      else if (lowerQuery.includes('patan')) locationName = 'Patan';

      const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      const generatedName = `${locationName} ${capitalizedCategory} Hub`;
      const slug = generatedName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      matched = {
        place_id: `custom_${slug}`,
        name: generatedName,
        category,
        district,
        address: `${locationName} Marg, ${district} 44600`,
        phone: customPhone || '+977-9867333080',
        email: customEmail || `info@${slug}.com.np`,
        rating: 4.6,
        user_ratings_total: 120,
        google_maps_url: `https://maps.google.com/?q=${encodeURIComponent(generatedName)}`,
      };
    }

    const businessPhone = customPhone || matched.phone || '9867333080';
    const businessEmail = customEmail || matched.email || `contact@${matched.place_id}.com.np`;
    const slug = matched.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const baseUrl = req.nextUrl.origin;
    const previewUrl = `${baseUrl}/preview/${slug}`;

    // 1. Generate Email Template if requested
    let emailResult = null;
    if (generateEmail) {
      const emailData = generateColdEmailCopy({
        toEmail: businessEmail,
        businessName: matched.name,
        district: matched.district,
        category: matched.category,
        previewUrl,
        slug,
        isConfidential: true,
      });

      // Replace cid: with web paths for previewing
      const webHtml = emailData.html
        .replace(/src="cid:brandlogo"/g, 'src="/sunya-logo-horizontal-white.png"')
        .replace(/src="cid:redditproof"/g, 'src="/social-proof-reddit-sandar.png"')
        .replace(/src="cid:xproof"/g, 'src="/social-proof-x-sandar.png"')
        .replace(/src="cid:fbproof"/g, 'src="/social-proof-fb-sandar.png"');

      emailResult = {
        subject: emailData.subject,
        bodyText: emailData.bodyText,
        html: webHtml,
        rawHtml: emailData.html,
      };
    }

    // 2. Generate Website if requested
    let websiteResult = null;
    if (generateWebsite) {
      const copy = await enrichAndGenerateCopy({
        name: matched.name,
        category: matched.category,
        district: matched.district,
        address: matched.address,
        rating: matched.rating,
        reviews_count: matched.user_ratings_total,
      });
      const templateType = resolveTemplateType(matched.category);

      websiteResult = {
        previewUrl,
        templateType,
        copy,
      };
    }

    // 3. Prepare WhatsApp Message for Client
    let whatsAppResult = null;
    if (generateWhatsApp) {
      const cleanPhoneDigits = businessPhone.replace(/[^0-9]/g, '');
      const nepPhone = cleanPhoneDigits.startsWith('977')
        ? cleanPhoneDigits
        : cleanPhoneDigits.length === 10
          ? `977${cleanPhoneDigits}`
          : `9779867333080`;

      const pdfFileName = `${slug}-proposal.pdf`;

      const bilingualPitch = `Dear Sir/Ma'am (${matched.name}),

We noticed ${matched.name} has fantastic ${matched.rating}★ reviews in ${matched.district}, but no official mobile website for patrons searching on Google.

📄 Attached Below: Official Mobile Website Design & Proposal PDF ("${pdfFileName}").
You can open it directly in WhatsApp to preview:
✅ Full mobile website visual design
✅ 1-Tap WhatsApp membership & inquiry button
✅ Shift hours & packages showcase
✅ Google Local SEO for Kathmandu Valley

Transparent pricing: NPR 9,999 one-time setup + NPR 1,500/month cloud hosting. (eSewa / Khalti / FonePay accepted).

Would you like to connect your own domain (e.g. ${slug}.com.np) this week? Simply reply to this chat!`;

      // Authentic Kathmandu Nepali tone
      const isGym =
        matched.category.toLowerCase().includes('gym') ||
        matched.name.toLowerCase().includes('fitness');
      const categoryIcon = isGym ? '💪🏋️' : '🥟🍜';
      const nepaliPitch = `आदरणीय Sir/Ma'am (${matched.name})!

हामीले ${matched.district} मा हजुरहरूको ${matched.category} को ${matched.rating}★ उत्कृष्ट reviews देख्यौँ। Google मा खोज्ने नयाँ ग्राहकहरूका लागि official mobile website नभएकोले, हामीले हजुरहरूका लागि एउटा सम्पूर्ण मोबाइल वेबसाइट डिजाइन तयार गरेका छौँ।

📄 सँगै Attached छ: हजुरहरूको Official Mobile Website Design & Proposal PDF ("${pdfFileName}")।
यहीँ WhatsApp मा खोलेर हेर्न सक्नुहुन्छ:
✅ सिधै WhatsApp मा enquiry/booking आउने १-ट्याप बटन
✅ काठमाडौं उपत्यका Google Local SEO अप्टिमाइजेसन
✅ सम्पूर्ण सिफ्ट समय र सदस्यता शुल्क विवरण
✅ नेपाली र अंग्रेजी दुबै भाषामा सहज दृश्य

हजुरहरूको आफ्नै ब्राण्डको .com.np डोमेनमा यसलाई जडान गर्न चाहनुहुन्छ भने हामीलाई यहीँ WhatsApp मा reply गर्नुहोला!`;

      // Category-tailored Pitch
      const categoryPitch = isGym
        ? `Dear Sir/Ma'am (${matched.name}), ${categoryIcon}

Every morning from 5:30 AM, fitness lovers in ${matched.district} search for gym shift timings, equipment, and monthly membership pricing on Google.

📄 Attached: Official Mobile Website Design & Proposal PDF ("${pdfFileName}").
Tap to open directly in WhatsApp to see:
✅ Monthly / 3-Month Membership Showcase (NPR 2,500 / NPR 6,500)
✅ 1-Tap WhatsApp Membership Consultation
✅ Morning (5:30 AM) & Evening (4:00 PM) shift hours
✅ Zero complex apps needed — opens directly on every phone

Would you like to activate your own domain this week? Simply reply here!`
        : bilingualPitch;

      // Short & Direct Pitch
      const shortPitch = `Dear Sir/Ma'am (${matched.name}), We noticed you have fantastic ${matched.rating}★ reviews in ${matched.district}, but no official mobile website.
📄 Attached below: Your official Mobile Website Design & Proposal PDF ("${pdfFileName}"). Tap to open and view the design directly in WhatsApp!
Can we connect your custom domain this week?`;

      const directWhatsAppUrl = `https://wa.me/${nepPhone}?text=${encodeURIComponent(bilingualPitch)}`;

      whatsAppResult = {
        phone: nepPhone,
        message: bilingualPitch,
        directUrl: directWhatsAppUrl,
        templates: {
          bilingual: bilingualPitch,
          nepali: nepaliPitch,
          category: categoryPitch,
          short: shortPitch,
        },
      };
    }

    return NextResponse.json({
      success: true,
      business: {
        placeId: matched.place_id,
        name: matched.name,
        category: matched.category,
        district: matched.district,
        address: matched.address,
        phone: businessPhone,
        email: businessEmail,
        rating: matched.rating,
        reviewsCount: matched.user_ratings_total,
        slug,
      },
      email: emailResult,
      website: websiteResult,
      whatsapp: whatsAppResult,
    });
  } catch (err: any) {
    console.error('[Sunya Generate Error]:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
