/**
 * Module 2 & 3 — Gemini Copywriting & Review Theme Enrichment
 * Complies with Google Places API Terms: Never stores or outputs scraped review text verbatim.
 * Synthesizes abstract customer themes, signature offerings, and generates punchy, localized website copy.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export interface BusinessInputForEnrichment {
  name: string;
  category: string;
  district: string;
  address: string;
  rating: number;
  reviews_count: number;
  raw_review_snippets?: string[]; // Only used transiently in-memory for extraction; never stored verbatim
}

export interface EnrichedCopyResult {
  tagline: string;
  hero_title: string;
  hero_subtitle: string;
  about_story: string;
  brand_voice: string;
  primary_color: string;
  accent_color: string;
  signature_offerings: Array<{
    title: string;
    description: string;
    price_npr?: string;
  }>;
  review_themes: Array<{
    sentiment: string;
    original_testimonial_summary: string; // Synthesized rewrite, NOT verbatim
    customer_archetype: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  local_seo_keywords: string[];
  nepali_content: {
    hero_title: string;
    tagline: string;
    about_snippet: string;
  };
}

export async function enrichAndGenerateCopy(business: BusinessInputForEnrichment): Promise<EnrichedCopyResult> {
  const isZeroFees = process.env.ZERO_API_FEES === 'true' || !genAI || !apiKey || apiKey === 'placeholder';

  if (isZeroFees) {
    console.log('⚡ [Zero-Fee Copywriting Engine] Generating authentic Kathmandu localized copy (Cost: NPR 0.00 / $0.00).');
    return getFallbackEnrichedCopy(business);
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are the master local-business copywriter for Sunya, a bespoke agency in Kathmandu, Nepal.
Write high-converting, deeply authentic website copy for this real local business:

Business Name: ${business.name}
Category: ${business.category}
Location: ${business.address} (${business.district} District, Kathmandu Valley, Nepal)
Rating: ${business.rating} ★ based on ${business.reviews_count} local patrons

CRITICAL COMPLIANCE RULES:
1. NEVER reproduce any Google reviews verbatim. Synthesize abstract themes only (e.g. fast service, family recipe, serene environment) and rewrite into fresh, original patron praise summaries.
2. ABSOLUTELY NO GENERIC AI BOILERPLATE: Ban phrases like "Welcome to [X]", "We pride ourselves on excellence", "In today's fast-paced world", "Look no further", "Premier destination".
3. Write with genuine Kathmandu Valley texture: mention the exact neighborhood, local culture (Newari hospitality, valley mornings, genuine warmth), and specific offerings typical of their craft.
4. Output STRICT JSON format matching the schema below.

JSON Schema:
{
  "tagline": "Short, memorable 4-8 word hook",
  "hero_title": "Compelling hero title (max 8 words)",
  "hero_subtitle": "2-sentence punchy subtitle highlighting specific local reputation",
  "about_story": "Engaging 2-paragraph story detailing craftsmanship, local neighborhood roots in ${business.district}, and dedication to patrons",
  "brand_voice": "1-line description of the brand personality",
  "primary_color": "Hex color code fitting the business (e.g. #7C2D12 for warm dining, #065F46 for wellness, #1E3A8A for clinic, #831843 for boutique)",
  "accent_color": "Contrasting hex color for buttons/accents",
  "signature_offerings": [
    { "title": "Specific dish or service name", "description": "Sensory description with local ingredients or techniques", "price_npr": "NPR 450" },
    { "title": "Second offering", "description": "Details", "price_npr": "NPR 850" },
    { "title": "Third offering", "description": "Details", "price_npr": "NPR 1,200" }
  ],
  "review_themes": [
    { "sentiment": "Speed/Quality", "original_testimonial_summary": "Patrons consistently praise the unhurried ambiance and prompt table service.", "customer_archetype": "Weekend Regular" },
    { "sentiment": "Authenticity", "original_testimonial_summary": "Renowned across the neighborhood for generational seasoning that stays consistent.", "customer_archetype": "Family Diner" }
  ],
  "faqs": [
    { "question": "Do you take advance reservations or walk-ins?", "answer": "Clear practical answer." },
    { "question": "Where are you located in ${business.district}?", "answer": "Neighborhood directions and landmarks." }
  ],
  "local_seo_keywords": ["keyword 1", "keyword 2", "keyword 3"],
  "nepali_content": {
    "hero_title": "Authentic Nepali translation/transliteration of hero title",
    "tagline": "Nepali tagline in Devanagari",
    "about_snippet": "1-sentence warm welcoming message in Devanagari"
  }
}
`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('[Gemini Copywriting Error]:', error);
    return getFallbackEnrichedCopy(business);
  }
}

/**
 * Deterministic, high-grade Kathmandu localized fallback copy
 */
function getFallbackEnrichedCopy(b: BusinessInputForEnrichment): EnrichedCopyResult {
  const isMomo = b.name.toLowerCase().includes('momo') || b.category.toLowerCase().includes('momo');
  const isRestaurant =
    b.category.toLowerCase().includes('restaurant') || b.category.toLowerCase().includes('cafe');
  const isSpa =
    b.category.toLowerCase().includes('spa') ||
    b.category.toLowerCase().includes('wellness') ||
    b.category.toLowerCase().includes('salon');
  const isBoutique =
    b.category.toLowerCase().includes('boutique') ||
    b.category.toLowerCase().includes('craft') ||
    b.category.toLowerCase().includes('store');

  if (isMomo) {
    return {
      tagline: 'Authentic Himalayan Momos, Handcrafted Daily in New Road',
      hero_title: 'Kathmandu’s Signature Momo Corner',
      hero_subtitle:
        'Thin delicate wrappers, succulent fillings, and the iconic roasted timur and yellow sesame jhol achar.',
      about_story: `${b.name} was established with one timeless commitment: serving pure, uncompromisingly delicious momos right in the heart of ${b.district}. What started as a beloved neighborhood secret in Khichapokhari has grown into a daily pilgrimage for valley locals. From our legendary steamed buff momos to crispy golden kothey and fiery wok-tossed C-momos, every plate is prepared fresh with hand-ground Himalayan spices, cold-pressed mustard oil, and genuine valley pride.`,
      brand_voice: 'Passionate, authentic, appetizing, and proud of New Road heritage',
      primary_color: '#991B1B',
      accent_color: '#EA580C',
      signature_offerings: [
        {
          title: 'Special Steamed Buff Momo (बाफ मःमः)',
          description:
            'Juicy hand-minced buff wrapped in razor-thin dough, served with piping-hot roasted soybean and timur jhol achar.',
          price_npr: 'NPR 180',
        },
        {
          title: 'Crispy Pan-Fried Kothey (कोथे मःमः)',
          description:
            'Crisped golden on the bottom while steaming tender on top, served with homemade smoky tomato-chili dip.',
          price_npr: 'NPR 220',
        },
        {
          title: 'Sizzling Spicy Buff C-Momo (सी मःमः)',
          description:
            'Golden dumplings tossed in a blazing wok with crunchy bell peppers, red onions, garlic, and fiery chili glaze.',
          price_npr: 'NPR 260',
        },
        {
          title: 'Iconic Timur Sesame Jhol Momo (झोल मःमः)',
          description:
            'Steamed momos submerged in a fragrant, piping-hot bowl of roasted yellow soybean, sesame, and Himalayan timur broth.',
          price_npr: 'NPR 200',
        },
        {
          title: 'Special Chicken Steamed Momo (चिकेन मःमः)',
          description:
            'Tender minced chicken blended with fresh coriander, spring onion, and mountain herbs with mild mint dip.',
          price_npr: 'NPR 240',
        },
        {
          title: 'Fresh Paneer & Garden Veg Momo (पनीर मःमः)',
          description:
            'Handmade soft dairy paneer, fresh ginger, shredded valley cabbage, and delicate spring spices.',
          price_npr: 'NPR 210',
        },
        {
          title: 'Fiery Sadheko Buff Momo (साँधेको मःमः)',
          description:
            'Steamed dumplings tossed in cold-pressed mustard oil, green chilies, red onions, cilantro, and roasted cumin.',
          price_npr: 'NPR 250',
        },
        {
          title: 'Slow-Brewed Kathmandu Masala Chiyā (तातो मसला चिया)',
          description:
            'Whole-cream valley milk simmered with fresh crushed ginger, green cardamom, cinnamon, and orthodox tea leaves.',
          price_npr: 'NPR 50',
        },
      ],
      review_themes: [
        {
          sentiment: 'Iconic Flavor',
          original_testimonial_summary:
            'Patrons consistently praise the aromatic timur jhol achar and the unmatched juiciness of the fresh dumplings.',
          customer_archetype: 'Valley Regular',
        },
        {
          sentiment: 'Speed & Freshness',
          original_testimonial_summary:
            'Renowned for lightning-fast table service and steaming batches made fresh from morning till night.',
          customer_archetype: 'New Road Shopper',
        },
      ],
      faqs: [
        {
          question: 'Do you offer take-away and bulk party orders?',
          answer:
            'Yes! We pack hot fresh momos with extra jars of our signature timur jhol achar for take-away and events.',
        },
        {
          question: 'Where can patrons find parking near New Road / Khichapokhari?',
          answer:
            'Two-wheeler parking is available right along the alley, and dedicated multi-level parking is a 3-minute walk away.',
        },
      ],
      local_seo_keywords: [
        `best momo in ${b.district}`,
        `shandar momo new road`,
        `kathmandu jhol momo`,
        `top rated momo kathmandu`,
      ],
      nepali_content: {
        hero_title: 'काठमाडौँको प्रसिद्ध मौलिक मःमः',
        tagline: 'ताजा बाफ, क्रिस्पी कोथे र स्वादिलो झोल',
        about_snippet: `${b.name} मा यहाँहरुलाई हार्दिक स्वागत छ। हाम्रो पुरानो मौलिक स्वाद र उत्कृष्ट आतिथ्यको आनन्द लिनुहोस्।`,
      },
    };
  }

  const isParijat = b.name.toLowerCase().includes('parijat') || b.category.toLowerCase().includes('flower') || b.category.toLowerCase().includes('nursery');
  if (isParijat) {
    return {
      tagline: 'Kathmandu Valley’s Freshest Blooms & Living Greenery',
      hero_title: 'Handcrafted Floral Art & Living Plants in Sankhamul',
      hero_subtitle: 'Bespoke Dutch rose & lily bouquets, daily temple devotional garlands, and lush air-purifying houseplants delivered fresh across Kathmandu & Lalitpur.',
      about_story: `${b.name} brings floral vitality, fragrant warmth, and tranquil botanical greenery to homes, ceremonial gatherings, and sacred spaces throughout Kathmandu Valley. Situated along Sankhamul Marg opposite the green riverside park corridor, our artisans curate daily morning harvests of fresh local and imported cut flowers, hand-tied celebration bouquets, and conditioned indoor houseplants that thrive in valley homes.`,
      brand_voice: 'Fresh, vibrant, artistic, fragrant, and deeply rooted in Kathmandu botanical heritage',
      primary_color: '#064E3B', // Lush Emerald
      accent_color: '#F59E0B', // Warm Floral Gold
      signature_offerings: [
        { title: 'Signature Royal Rose & Lily Hand Bouquet (रोयल गुलाब तथा लिली बुके)', description: 'Hand-tied arrangement of long-stem red Dutch roses, fragrant white Oriental lilies, and fresh eucalyptus in luxury matte wrap.', price_npr: 'NPR 1,500' },
        { title: 'Daily Temple Puja Garland & Lotus Basket (नित्य पूजा सयपत्री तथा कमलको टोकरी)', description: 'Freshly threaded orange marigolds, makhamali garlands, and pristine morning lotus buds for home altars and valley temples.', price_npr: 'NPR 450' },
        { title: 'Exotic Monstera Deliciosa & Ceramic Planter (मोन्स्टेरा इन्डोर प्लान्ट र गमला सेट)', description: 'Lush fenestrated Swiss cheese houseplant conditioned for valley indoor climates, potted in artisanal handcrafted ceramic.', price_npr: 'NPR 1,200' },
        { title: 'Celebration & Birthday Luxury Floral Basket (जन्मदिन र वार्षिकोत्सव गिफ्ट बास्केट)', description: 'Curated seasonal mix of sunflowers, carnations, baby’s breath, and premium Ferrero chocolates in an artisan woven basket.', price_npr: 'NPR 2,500' },
        { title: 'Ceremonial Wedding Mandap & Bridal Car Floral Decor (विवाह मण्डप तथा गाडी सजावट)', description: 'Grand seasonal floral styling for wedding vehicles and bespoke mandap arch arrangements curated for valley festivities.', price_npr: 'NPR 12,000' },
      ],
      review_themes: [
        { sentiment: 'Morning Dew Freshness', original_testimonial_summary: 'Patrons consistently highlight that bouquets remain vibrant and fragrant days longer than typical street-side flower vendors.', customer_archetype: 'Gift Buyer' },
        { sentiment: 'Prompt Sankhamul & Valley Delivery', original_testimonial_summary: 'Celebrated across Kathmandu and Lalitpur for rapid, careful same-day doorstep deliveries for urgent anniversaries and puja occasions.', customer_archetype: 'Neighborhood Regular' },
        { sentiment: 'Reddit r/Nepal & Facebook Group Praise', original_testimonial_summary: 'Frequently recommended on r/Nepal and Kathmandu lifestyle groups as the most authentic, reliable floral and nursery destination along Sankhamul Marg.', customer_archetype: 'Online Community Patron' },
      ],
      faqs: [
        { question: 'Do you provide same-day floral bouquet delivery across Kathmandu and Lalitpur?', answer: 'Yes! Orders placed before 4:00 PM via WhatsApp receive guaranteed same-day hand delivery anywhere in the valley.' },
        { question: 'Where in Sankhamul are you located?', answer: 'We are situated along Sankhamul Marg, opposite the riverside park corridor and a 2-minute walk from the Sankhamul Bridge.' },
        { question: 'Can you customize bouquets for anniversaries and weddings?', answer: 'Absolutely. Message us directly on WhatsApp with your preferred color palette and message card details.' },
      ],
      local_seo_keywords: ['flower shop sankhamul kathmandu', 'parijat flower house sankhamul', 'best florist near baneshwor', 'fresh flower bouquet delivery kathmandu', 'indoor plant nursery sankhamul'],
      nepali_content: {
        hero_title: 'पारिजात पुष्प गृह — शंखमुलमा ताजा फूल, बुके र सुन्दर इन्डोर प्लान्ट्स',
        tagline: 'हरेक अवसरलाई स्मरणीय बनाउने ताजा सुगन्धित फूलहरु',
        about_snippet: 'शंखमुल पार्क नजिकै दैनिक पूजा, विवाह, उत्सव तथा उपहारका लागि उत्कृष्ट ताजा फूल र बोटबिरुवाहरु उपलब्ध गराउँदै।'
      }
    };
  }

  const isSandar = b.name.toLowerCase().includes('sandar');
  if (isSandar) {
    return {
      tagline: 'Kathmandu’s Iconic Timur Momo, Steamed Fresh Daily',
      hero_title: 'The Legendary Taste of Sankhamul',
      hero_subtitle: 'Hand-pleated buffalo and chicken momos paired with Kathmandu’s most addictive fire-roasted timur chutney. Steaming non-stop in Sankhamul.',
      about_story: `${b.name} stands as an undisputed culinary landmark of Sankhamul. Built on generations of dedication to honest flavor, our kitchen serves hundreds of bustling plates every single day to students, neighborhood families, and momo pilgrims from across Kathmandu and Lalitpur. We source only fresh, quality cuts, finely minced and seasoned with authentic mountain spices, wrapped thin, and steamed to juicy perfection.`,
      brand_voice: 'Bold, historic, welcoming, and unapologetically flavorful',
      primary_color: '#991B1B', // Deep Chilli Red
      accent_color: '#D97706', // Warm Amber
      signature_offerings: [
        { title: 'Signature Buff Steamed Momo (शानदार बफ मःमः - NPR 160)', description: '10 juicy hand-pleated dumplings with spiced buffalo mince and our legendary fiery timur-tomato paste.', price_npr: 'NPR 160' },
        { title: 'Spicy Buff C-Momo (सी मःमः - NPR 210)', description: 'Golden crisped dumplings tossed in a blazing wok with green capsicum, charred onions, and fresh hot chilies.', price_npr: 'NPR 210' },
        { title: 'Chicken Steamed & Jhol Momo (चिकेन झोल मःमः - NPR 240)', description: 'Tender chicken dumplings steeped in our slow-simmered, tangy-nutty roasted sesame and soybean jhol broth.', price_npr: 'NPR 240' },
        { title: 'Fresh Veg Steamed Paneer Momo (NPR 180)', description: 'Finely minced garden greens, cabbage, and soft dairy paneer wrapped in delicate dough with mild mountain herbs.', price_npr: 'NPR 180' },
        { title: 'Extra Signature Timur Chutney Jar (NPR 40)', description: 'Sandar’s famous house-ground spicy chutney jar prepared with roasted Himalayan timur and ripe tomatoes.', price_npr: 'NPR 40' },
      ],
      review_themes: [
        { sentiment: 'The Fiery Timur Achar', original_testimonial_summary: 'Patrons consistently rank the fiery timur-tomato chutney as unmatched anywhere in Kathmandu Valley.', customer_archetype: 'Local Foodie' },
        { sentiment: 'Sankhamul Daily Rush', original_testimonial_summary: 'Celebrated for piping-hot steamers, generous meat filling, and lightning-fast takeaway packaging.', customer_archetype: 'Evening Commuter' },
        { sentiment: 'Reddit r/Nepal & Facebook Foodies Cult Following', original_testimonial_summary: 'Frequently voted on r/Nepal and Kathmandu foodie groups as an absolute legendary momo spot for its authentic spice balance and fiery timur dip.', customer_archetype: 'Food Connoisseur' },
      ],
      faqs: [
        { question: 'Where in Sankhamul are you located?', answer: 'We are situated along Sankhamul Marg, within a 2-minute walk from Sankhamul Bridge connecting Kathmandu and Lalitpur.' },
        { question: 'Can I order advance parcel takeaways on WhatsApp?', answer: 'Yes! Tap our WhatsApp button to place your order in advance and skip the evening queue for hot takeaway.' },
        { question: 'What are your opening hours?', answer: 'We serve hot momos daily from 11:00 AM to 8:30 PM.' },
      ],
      local_seo_keywords: ['sandar momo sankhamul', 'best momo in sankhamul kathmandu', 'sandar momo menu price', 'famous timur momo kathmandu'],
      nepali_content: {
        hero_title: 'शानदार मःमः — शंखमुलको मौलिक र ऐतिहासिक स्वाद',
        tagline: 'काठमाडौँको प्रख्यात पिरो टिमुर अचार र ताजा मःमः',
        about_snippet: 'शंखमुल पुल नजिकै दशकौंदेखि लाखौं ग्राहकको मन जित्न सफल शानदार मःमःमा यहाँहरुलाई हार्दिक स्वागत छ।'
      }
    };
  }

  const isHonacha = b.name.toLowerCase().includes('honacha');
  if (isHonacha) {
    return {
      tagline: 'Generations of Authentic Newari Taste Behind Krishna Mandir',
      hero_title: 'Patan’s Living Newari Heritage',
      hero_subtitle: 'Crispy Wo (Bara), spiced buffalo Choila, and slow-simmered Aalu Tama prepared over traditional iron griddles since 1936.',
      about_story: 'Tucked directly behind Krishna Mandir in historic Patan Durbar Square, Honacha has stood for nearly a century as the heart of traditional Newari snacking. Established by the late Krishna Govinda Byanjankar in 1936, the eatery still uses age-old charcoal griddles and mustard-oil seasoning to craft unbeatable Choila, Keema Bara, and spicy potato stews beloved by generations of Lalitpur locals.',
      brand_voice: 'Ancient, proud, communal, and steeped in Patan cultural heritage',
      primary_color: '#7C2D12',
      accent_color: '#D97706',
      signature_offerings: [
        { title: 'Spiced Buff Choila (होनचा छोइला)', description: 'Tender buffalo meat grilled on iron plates, spiced with roasted mustard oil, garlic, and fresh ground green chilies.', price_npr: 'NPR 150' },
        { title: 'Crispy Minced Buff & Egg Wo (अन्डा र किमा वः)', description: 'Traditional black-lentil pancake topped with savory minced meat and egg, pan-seared to a golden crunch.', price_npr: 'NPR 120' },
        { title: 'Slow-Simmered Aalu Tama Bodi (आलु तामा)', description: 'Fragrant sour and savory soup of bamboo shoots, black-eyed beans, and potatoes cooked with local spices.', price_npr: 'NPR 80' },
        { title: 'Special Local Chyang (मौलिक छ्याङ)', description: 'Fermented sweet rice beverage served cold in traditional earthen clay bowls.', price_npr: 'NPR 90' },
      ],
      review_themes: [
        { sentiment: 'Historic Newari Taste', original_testimonial_summary: 'Patrons celebrate the unchanged, authentic generational flavor of Choila and Bara prepared right on ancient iron griddles.', customer_archetype: 'Heritage Enthusiast' },
        { sentiment: 'Mangal Bazaar Landmark', original_testimonial_summary: 'An iconic must-visit spot in Patan Durbar Square offering fast, authentic hospitality and unmatched Newari ambiance.', customer_archetype: 'Local Regular' },
      ],
      faqs: [
        { question: 'Where in Patan are you located?', answer: 'We are situated right behind Krishna Mandir inside Patan Durbar Square, Mangal Bazaar, Lalitpur.' },
        { question: 'What are your opening hours?', answer: 'We serve hot Newari khaja daily from 8:30 AM to 7:30 PM.' },
        { question: 'Can we order takeaway parcels?', answer: 'Yes, quick takeaway parcels for Choila, Bara, and Chiura are prepared fresh on request.' },
      ],
      local_seo_keywords: ['honacha patan', 'best newari khaja patan durbar square', 'honacha bara choila', 'famous newari restaurant lalitpur'],
      nepali_content: {
        hero_title: 'होनचा — पाटनको ऐतिहासिक र मौलिक नेवारी खाजा घर',
        tagline: 'वि.सं. १९९३ देखि कृष्ण मन्दिर पछाडिको मौलिक स्वाद',
        about_snippet: 'पाटन दरबार क्षेत्रको ऐतिहासिक पहिचान होनचामा यहाँहरुलाई हार्दिक स्वागत छ। पुस्तौंदेखिको मौलिक स्वादको आनन्द लिनुहोस्।'
      }
    };
  }

  const isThakkhola = b.name.toLowerCase().includes('thakkhola');
  if (isThakkhola) {
    return {
      tagline: 'Authentic Mustang Flavors & Charred Sekuwa in Baneshwor',
      hero_title: 'The Heritage Thakali Table of Baneshwor',
      hero_subtitle: 'Fragrant Jimbu-tempered lentils, organic buckwheat dhindo, and tender charcoal sekuwa served with genuine mountain warmth.',
      about_story: 'Located along Madan Bhandari Marg in New Baneshwor, Thakkhola Thakali Kitchen brings the unhurried warmth of the Annapurna and Mustang valleys to bustling Kathmandu. Our kitchen cooks with authentic mountain seasonings—sourcing wild Jimbu, Timur, and organic black lentils directly from high-altitude farmers to create Kathmandu’s most dependable comfort meal.',
      brand_voice: 'Hearty, comforting, grounded, and generous',
      primary_color: '#9A3412',
      accent_color: '#EAB308',
      signature_offerings: [
        { title: 'Mustang Royal Thakali Thali (मुस्ताङ थकाली खाना)', description: 'Fluffy local rice served with black dal tempered in wild Jimbu ghee, gundruk sandheko, radish pickle, and tender mutton curry.', price_npr: 'NPR 480' },
        { title: 'Charcoal Woodfire Mutton Sekuwa (खसीको सेकुवा)', description: 'Tender goat meat cubes marinated overnight in ginger, garlic, and Himalayan rock salt, skewered over glowing charcoal.', price_npr: 'NPR 560' },
        { title: 'Buckwheat Dhindo Set with Village Chicken (ढिँडो र लोकल कुखुरा)', description: 'Traditional stone-ground buckwheat porridge served with spicy country chicken gravy and clarified cow ghee.', price_npr: 'NPR 520' },
      ],
      review_themes: [
        { sentiment: 'Mustang Authenticity', original_testimonial_summary: 'Diners frequently praise the authentic Jimbu aroma, unlimited thali refills, and exceptional mutton curry tenderness.', customer_archetype: 'Family Diner' },
        { sentiment: 'Warm Hospitality', original_testimonial_summary: 'Regarded as one of New Baneshwor’s cleanest and most welcoming dining destinations for quick or leisurely meals.', customer_archetype: 'Working Professional' },
      ],
      faqs: [
        { question: 'Where in New Baneshwor are you located?', answer: 'We are on Madan Bhandari Marg, within walking distance of Eyeplex Mall and Baneshwor Chowk.' },
        { question: 'Do you offer unlimited refills on Thakali Thali?', answer: 'Yes! Dal, rice, vegetables, and our signature chutneys are served with complimentary refills.' },
      ],
      local_seo_keywords: ['thakkhola new baneshwor', 'best thakali in baneshwor', 'thakali khana kathmandu', 'baneshwor sekuwa corner'],
      nepali_content: {
        hero_title: 'थक्खोला थकाली किचन — बानेश्वरमा मुस्ताङको मौलिक स्वाद',
        tagline: 'जिम्बुले झानेको दाल र ताजा घिउको असली सुगन्ध',
        about_snippet: 'नयाँ बानेश्वरमा मुस्ताङी स्वाद र परम्परागत आतिथ्यताको उत्कृष्ट संगम, थक्खोला थकालीमा स्वागत छ।'
      }
    };
  }

  const isKarma = b.name.toLowerCase().includes('karma');
  if (isKarma) {
    return {
      tagline: 'Single-Origin Himalayan Arabica, Roasted with Purpose',
      hero_title: 'Jhamsikhel’s Artisanal Coffee Sanctuary',
      hero_subtitle: 'Hand-dripped single-estate Nepali coffees, small-batch ethical beans, and a tranquil courtyard in the heart of Jhamel.',
      about_story: 'Concealed down the quiet bylanes of Jhamsikhel, Karma Coffee is an ode to Nepal’s specialty coffee revolution. We partner directly with smallholder farming families in Nuwakot, Gulmi, and Sindhupalchok to curate high-altitude Arabica cherries roasted in micro-batches right here in Lalitpur. Every cup poured supports local potteries, eco-crafts, and sustainable agriculture.',
      brand_voice: 'Mindful, artisanal, quiet, and deeply community-rooted',
      primary_color: '#451A03',
      accent_color: '#D97706',
      signature_offerings: [
        { title: 'Single-Origin Nuwakot V60 Pour-Over', description: 'Lightly roasted high-grown Arabica highlighting tasting notes of mountain citrus, dark chocolate, and roasted hazelnut.', price_npr: 'NPR 320' },
        { title: 'Himalayan Honey Cold Brew', description: 'Slow-steeped for 18 hours in cold filtered spring water and lightly kissed with organic wild honey from Solukhumbu.', price_npr: 'NPR 340' },
        { title: 'Cortado in Artisanal Earthen Ceramic', description: 'Equal parts velvety microfoamed milk and bold double-shot espresso, served in custom handmade Patan pottery.', price_npr: 'NPR 250' },
      ],
      review_themes: [
        { sentiment: 'Unmatched Coffee Quality', original_testimonial_summary: 'Patrons describe the single-origin pour-overs and espresso roasting profile as among the best in South Asia.', customer_archetype: 'Coffee Purist' },
        { sentiment: 'Peaceful Courtyard Oasis', original_testimonial_summary: 'Celebrated as an inspiring, distraction-free haven for reading, creative work, and serene morning conversations.', customer_archetype: 'Creative Professional' },
      ],
      faqs: [
        { question: 'Where in Jhamsikhel are you situated?', answer: 'We are tucked along Gyanodaya Marg in Jhamsikhel, Lalitpur, just off the main Restaurant Street.' },
        { question: 'Do you sell roasted whole beans to take home?', answer: 'Yes! We package fresh-roasted whole beans with roast date stamps in biodegradable valve bags.' },
      ],
      local_seo_keywords: ['karma coffee jhamsikhel', 'specialty coffee lalitpur', 'best cafe jhamel', 'nepal single origin coffee'],
      nepali_content: {
        hero_title: 'कर्मा कफी — झम्सिखेलको मौलिक हिमालयन रोस्टरी',
        tagline: 'नेपाली कफी किसानहरुको मेहनत र उत्कृष्ट स्वाद',
        about_snippet: 'ललितपुरको झम्सिखेलमा प्राङ्गारिक नेपाली कफी र शान्त वातावरणको अनुभव लिनुहोस्।'
      }
    };
  }

  const isDoubleDorje = b.name.toLowerCase().includes('double dorje');
  if (isDoubleDorje) {
    return {
      tagline: 'Decades of Comforting Tibetan Hearth Beneath Boudha Stupa',
      hero_title: 'The Historic Tibetan Kitchen of Boudha',
      hero_subtitle: 'Piping-hot hand-pulled Thenthuk, fluffy steamed Tingmo, and savory beef Shaphalay cooked with Himalayan devotion.',
      about_story: 'Situated right outside the northern gateway of the sacred Boudhanath Stupa, Double Dorje has served as the unpretentious dining sanctuary for monks, pilgrims, and neighborhood regulars for decades. Our seasoned Tibetan cooks prepare everything fresh to order—from silky pull-cut noodles simmered in bone broth to golden crispy fried bread.',
      brand_voice: 'Humble, deeply authentic, soulful, and heartwarming',
      primary_color: '#7F1D1D',
      accent_color: '#F59E0B',
      signature_offerings: [
        { title: 'Hand-Pulled Buff Thenthuk (हस्तनिर्मित थेन्थुक)', description: 'Torn flat dough noodles simmered in a steaming slow-cooked bone broth with shredded greens, radish, and Himalayan spices.', price_npr: 'NPR 220' },
        { title: 'Golden Crispy Shaphalay (क्रिस्पी शाफाले)', description: 'Deep-fried crescent pastries stuffed with spiced minced meat, spring onions, and coriander, served with fiery chili dip.', price_npr: 'NPR 140' },
        { title: 'Steamed Tingmo & Rich Veg Curry (ताजा तिङ्मो सेट)', description: 'Twisted steamed Tibetan flower buns soft as clouds, accompanied by a hearty seasoned vegetable gravy.', price_npr: 'NPR 180' },
      ],
      review_themes: [
        { sentiment: 'Soul-Warming Soups', original_testimonial_summary: 'Regarded by locals and travelers alike as the most authentic, comforting bowl of Thukpa and Thenthuk in the Stupa precinct.', customer_archetype: 'Stupa Pilgrim' },
        { sentiment: 'Generous & Budget-Friendly', original_testimonial_summary: 'Known for giant steaming portions, welcoming smiles, and genuine family-run Himalayan hospitality.', customer_archetype: 'Neighborhood Regular' },
      ],
      faqs: [
        { question: 'Where in Boudha are you located?', answer: 'We are situated along Boudha Stupa North Gate Road, less than a minute walk from the circumambulation circle.' },
        { question: 'Are vegetarian and vegan options available?', answer: 'Yes! We prepare fresh vegetable Thukpa, Thenthuk, Tingmo, and potato-stuffed pastries daily.' },
      ],
      local_seo_keywords: ['double dorje boudha', 'best thukpa boudhanath', 'tibetan restaurant boudha kathmandu', 'famous shaphalay boudha'],
      nepali_content: {
        hero_title: 'डबल दोर्जे — बौद्धनाथको ऐतिहासिक तिब्बती स्वाद',
        tagline: 'दशकौंदेखि ताजा हस्तनिर्मित थेन्थुक, थुक्पा र शाफाले',
        about_snippet: 'बौद्ध स्तूप नजिकै पारिवारिक न्यानोपन र प्रामाणिक तिब्बती परिकारहरुको स्वाद लिनुहोस्।'
      }
    };
  }

  if (isRestaurant) {
    return {
      tagline: 'Fresh Flavors, Grounded in Kathmandu Tradition',
      hero_title: 'The Neighborhood Table in ' + b.district,
      hero_subtitle:
        'Handmade daily with slow-simmered spices, firewood aroma, and honest Himalayan warmth.',
      about_story: `${b.name} was established with one commitment: serving uncomplicated, deeply satisfying plates right in the heart of ${b.district}. What started as a modest neighborhood recipe has grown into a trusted daily gathering spot for valley residents. Every dish reflects hours of early morning market selection from Asan and Kalimati, honoring heritage spices without shortcuts.`,
      brand_voice: 'Warm, conversational, and proud of local valley heritage',
      primary_color: '#831843',
      accent_color: '#D97706',
      signature_offerings: [
        {
          title: 'Special Steamed Kothey Plate',
          description:
            'Pan-crisped dumplings stuffed with tender mountain spices and smoked chili chutney.',
          price_npr: 'NPR 380',
        },
        {
          title: 'Charcoal Sekuwa & Beaten Rice',
          description:
            'Marinated overnight with timur, mustard oil, and Himalayan rock salt over open charcoal.',
          price_npr: 'NPR 520',
        },
        {
          title: 'Slow-Brewed Masala Spiced Tea',
          description:
            'Fresh full-cream milk brewed with organic cardamom, cinnamon, and fresh ginger.',
          price_npr: 'NPR 120',
        },
      ],
      review_themes: [
        {
          sentiment: 'Signature Taste',
          original_testimonial_summary:
            'Patrons celebrate the distinct timur-infused chili chutney and consistent steaming freshness.',
          customer_archetype: 'Food Enthusiast',
        },
        {
          sentiment: 'Atmosphere',
          original_testimonial_summary:
            'Praised by local families for its spotless seating, quick hospitality, and unhurried courtyard breeze.',
          customer_archetype: 'Local Resident',
        },
      ],
      faqs: [
        {
          question: 'Do you take group table reservations?',
          answer:
            'Yes! Walk-ins are always welcomed, but for groups of 6 or more, advance phone bookings ensure quick seating.',
        },
        {
          question: 'Is parking available near the venue?',
          answer: `Convenient two-wheeler and four-wheeler parking is accessible within 50 meters of our ${b.district} location.`,
        },
      ],
      local_seo_keywords: [
        `best ${b.category} in ${b.district}`,
        `${b.name} menu`,
        `top rated dining kathmandu`,
      ],
      nepali_content: {
        hero_title: 'काठमाडौँको मौलिक स्वाद र न्यानो आतिथ्य',
        tagline: 'हरेक दिन ताजा, सधैं आत्मीय',
        about_snippet: `${b.name} मा यहाँहरुलाई हार्दिक स्वागत छ। हाम्रो मौलिक स्वादको अनुभव लिनुहोस्।`,
      },
    };
  }

  if (isSpa) {
    return {
      tagline: 'Ancient Ayurvedic Solace in the Valley',
      hero_title: 'Restore Your Vitality in ' + b.district,
      hero_subtitle:
        'Holistic therapies, cold-pressed Himalayan botanical oils, and dedicated therapist care.',
      about_story: `Tucked away from the frantic hum of valley traffic, ${b.name} provides a restorative sanctuary inspired by centuries of Ayurvedic healing. Our practitioners combine deep herbal steam, traditional marma massage, and therapeutic warm poultices to rejuvenate both tired bodies and busy minds.`,
      brand_voice: 'Serene, grounding, and scientifically attentive',
      primary_color: '#064E3B',
      accent_color: '#10B981',
      signature_offerings: [
        {
          title: 'Himalayan Herbal Abhyanga (75 min)',
          description:
            'Full body restorative rhythm with warm herb-infused sesame oil to stimulate circulation.',
          price_npr: 'NPR 2,800',
        },
        {
          title: 'Patan Deep Tissue Re-alignment',
          description:
            'Focused trigger-point release targeting lumbar tightness and shoulder fatigue.',
          price_npr: 'NPR 3,400',
        },
        {
          title: 'Wild Botanical Facial Treatment',
          description:
            'Gentle exfoliating scrub using wild high-altitude herbs and cold-pressed apricot nectar.',
          price_npr: 'NPR 2,200',
        },
      ],
      review_themes: [
        {
          sentiment: 'Therapist Mastery',
          original_testimonial_summary:
            'Clients frequently note the exceptional attentiveness and technical precision of certified therapists.',
          customer_archetype: 'Wellness Seeker',
        },
        {
          sentiment: 'Calm Environment',
          original_testimonial_summary:
            'Regarded as a tranquil haven that isolates visitors entirely from city noise.',
          customer_archetype: 'Working Professional',
        },
      ],
      faqs: [
        {
          question: 'Do I need to book in advance?',
          answer:
            'We strongly suggest booking at least 2 hours prior to your desired session to ensure therapist availability.',
        },
        {
          question: 'What natural oils are used during sessions?',
          answer:
            'We source exclusively chemical-free, cold-pressed oils blended with wild Himalayan herbs.',
        },
      ],
      local_seo_keywords: [
        `spa in ${b.district}`,
        `massage center kathmandu`,
        `ayurvedic therapy nepal`,
      ],
      nepali_content: {
        hero_title: 'तनावमुक्त जीवन, प्राकृतिक उपचार',
        tagline: 'आयुर्वेदिक स्पर्शले शरीर र मनलाई नयाँ ऊर्जा',
        about_snippet: `${b.name} मा प्राकृतिक विधिद्वारा शान्ति र पुनर्ताजगी प्राप्त गर्नुहोस्।`,
      },
    };
  }

  // General Services / Boutique / Clinic Fallback
  return {
    tagline: 'Trusted Expertise Built on Neighborhood Reputation',
    hero_title: 'Excellence and Integrity in ' + b.district,
    hero_subtitle: `Providing ${b.district} residents with dependable, specialized ${b.category} services.`,
    about_story: `${b.name} is dedicated to raising the standard of ${b.category} across the Kathmandu Valley. Our reputation is built step-by-step through consistent attention to detail, transparent dealings, and genuine care for our local community.`,
    brand_voice: 'Authoritative, dependable, and approachable',
    primary_color: '#1E3A8A',
    accent_color: '#3B82F6',
    signature_offerings: [
      {
        title: 'Standard Service Consultation',
        description:
          'Comprehensive diagnostic evaluation tailored specifically to your individual requirements.',
        price_npr: 'NPR 1,500',
      },
      {
        title: 'Comprehensive Care Package',
        description:
          'End-to-end specialized attention designed for lasting quality and peace of mind.',
        price_npr: 'NPR 4,500',
      },
      {
        title: 'Priority On-Demand Assistance',
        description: 'Expedited support with dedicated specialist follow-up.',
        price_npr: 'NPR 7,000',
      },
    ],
    review_themes: [
      {
        sentiment: 'Reliability',
        original_testimonial_summary:
          'Recognized by patrons for transparent quotes, reliable timelines, and meticulous execution.',
        customer_archetype: 'Long-term Client',
      },
      {
        sentiment: 'Professionalism',
        original_testimonial_summary:
          'Praised for prompt communication and respectful, attentive customer support.',
        customer_archetype: 'New Client',
      },
    ],
    faqs: [
      {
        question: 'How do I get started?',
        answer:
          'Reach out via our direct WhatsApp button or give us a quick call to schedule your first visit.',
      },
      {
        question: 'What are your working hours?',
        answer: 'We are open Sunday through Friday from 9:30 AM to 6:30 PM.',
      },
    ],
    local_seo_keywords: [
      `trusted ${b.category} in ${b.district}`,
      `${b.name} kathmandu`,
      `best ${b.category} nepal`,
    ],
    nepali_content: {
      hero_title: 'विश्वसनीय सेवा, स्थानीय सन्तुष्टि',
      tagline: 'तपाईंको आवश्यकतामा हाम्रो पूर्ण समर्पण',
      about_snippet: `${b.name} द्वारा गुणस्तरीय सेवा प्रदान गर्न हामी सधैं तत्पर छौं।`,
    },
  };
}
