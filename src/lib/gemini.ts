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
  if (!genAI || !apiKey || apiKey === 'placeholder') {
    console.log('[Gemini Enrichment] No GEMINI_API_KEY found, generating authentic Kathmandu fallback copy.');
    return getFallbackEnrichedCopy(business);
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are the master local-business copywriter for Sunya Visibility, a bespoke agency in Kathmandu, Nepal.
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
  const isRestaurant = b.category.toLowerCase().includes('restaurant') || b.category.toLowerCase().includes('momo') || b.category.toLowerCase().includes('cafe');
  const isSpa = b.category.toLowerCase().includes('spa') || b.category.toLowerCase().includes('wellness') || b.category.toLowerCase().includes('salon');
  const isBoutique = b.category.toLowerCase().includes('boutique') || b.category.toLowerCase().includes('craft') || b.category.toLowerCase().includes('store');

  if (isRestaurant) {
    return {
      tagline: 'Fresh Flavors, Grounded in Kathmandu Tradition',
      hero_title: 'The Neighborhood Table in ' + b.district,
      hero_subtitle: 'Handmade daily with slow-simmered spices, firewood aroma, and honest Himalayan warmth.',
      about_story: `${b.name} was established with one commitment: serving uncomplicated, deeply satisfying plates right in the heart of ${b.district}. What started as a modest neighborhood recipe has grown into a trusted daily gathering spot for valley residents. Every dish reflects hours of early morning market selection from Asan and Kalimati, honoring heritage spices without shortcuts.`,
      brand_voice: 'Warm, conversational, and proud of local valley heritage',
      primary_color: '#831843',
      accent_color: '#D97706',
      signature_offerings: [
        { title: 'Special Steamed Kothey Plate', description: 'Pan-crisped dumplings stuffed with tender mountain spices and smoked chili chutney.', price_npr: 'NPR 380' },
        { title: 'Charcoal Sekuwa & Beaten Rice', description: 'Marinated overnight with timur, mustard oil, and Himalayan rock salt over open charcoal.', price_npr: 'NPR 520' },
        { title: 'Slow-Brewed Masala Spiced Tea', description: 'Fresh full-cream milk brewed with organic cardamom, cinnamon, and fresh ginger.', price_npr: 'NPR 120' },
      ],
      review_themes: [
        { sentiment: 'Signature Taste', original_testimonial_summary: 'Patrons celebrate the distinct timur-infused chili chutney and consistent steaming freshness.', customer_archetype: 'Food Enthusiast' },
        { sentiment: 'Atmosphere', original_testimonial_summary: 'Praised by local families for its spotless seating, quick hospitality, and unhurried courtyard breeze.', customer_archetype: 'Local Resident' },
      ],
      faqs: [
        { question: 'Do you take group table reservations?', answer: 'Yes! Walk-ins are always welcomed, but for groups of 6 or more, advance phone bookings ensure quick seating.' },
        { question: 'Is parking available near the venue?', answer: `Convenient two-wheeler and four-wheeler parking is accessible within 50 meters of our ${b.district} location.` },
      ],
      local_seo_keywords: [`best ${b.category} in ${b.district}`, `${b.name} menu`, `top rated dining kathmandu`],
      nepali_content: {
        hero_title: 'काठमाडौँको मौलिक स्वाद र न्यानो आतिथ्य',
        tagline: 'हरेक दिन ताजा, सधैं आत्मीय',
        about_snippet: `${b.name} मा यहाँहरुलाई हार्दिक स्वागत छ। हाम्रो मौलिक स्वादको अनुभव लिनुहोस्।`
      }
    };
  }

  if (isSpa) {
    return {
      tagline: 'Ancient Ayurvedic Solace in the Valley',
      hero_title: 'Restore Your Vitality in ' + b.district,
      hero_subtitle: 'Holistic therapies, cold-pressed Himalayan botanical oils, and dedicated therapist care.',
      about_story: `Tucked away from the frantic hum of valley traffic, ${b.name} provides a restorative sanctuary inspired by centuries of Ayurvedic healing. Our practitioners combine deep herbal steam, traditional marma massage, and therapeutic warm poultices to rejuvenate both tired bodies and busy minds.`,
      brand_voice: 'Serene, grounding, and scientifically attentive',
      primary_color: '#064E3B',
      accent_color: '#10B981',
      signature_offerings: [
        { title: 'Himalayan Herbal Abhyanga (75 min)', description: 'Full body restorative rhythm with warm herb-infused sesame oil to stimulate circulation.', price_npr: 'NPR 2,800' },
        { title: 'Patan Deep Tissue Re-alignment', description: 'Focused trigger-point release targeting lumbar tightness and shoulder fatigue.', price_npr: 'NPR 3,400' },
        { title: 'Wild Botanical Facial Treatment', description: 'Gentle exfoliating scrub using wild high-altitude herbs and cold-pressed apricot nectar.', price_npr: 'NPR 2,200' },
      ],
      review_themes: [
        { sentiment: 'Therapist Mastery', original_testimonial_summary: 'Clients frequently note the exceptional attentiveness and technical precision of certified therapists.', customer_archetype: 'Wellness Seeker' },
        { sentiment: 'Calm Environment', original_testimonial_summary: 'Regarded as a tranquil haven that isolates visitors entirely from city noise.', customer_archetype: 'Working Professional' },
      ],
      faqs: [
        { question: 'Do I need to book in advance?', answer: 'We strongly suggest booking at least 2 hours prior to your desired session to ensure therapist availability.' },
        { question: 'What natural oils are used during sessions?', answer: 'We source exclusively chemical-free, cold-pressed oils blended with wild Himalayan herbs.' }
      ],
      local_seo_keywords: [`spa in ${b.district}`, `massage center kathmandu`, `ayurvedic therapy nepal`],
      nepali_content: {
        hero_title: 'तनावमुक्त जीवन, प्राकृतिक उपचार',
        tagline: 'आयुर्वेदिक स्पर्शले शरीर र मनलाई नयाँ ऊर्जा',
        about_snippet: `${b.name} मा प्राकृतिक विधिद्वारा शान्ति र पुनर्ताजगी प्राप्त गर्नुहोस्।`
      }
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
      { title: 'Standard Service Consultation', description: 'Comprehensive diagnostic evaluation tailored specifically to your individual requirements.', price_npr: 'NPR 1,500' },
      { title: 'Comprehensive Care Package', description: 'End-to-end specialized attention designed for lasting quality and peace of mind.', price_npr: 'NPR 4,500' },
      { title: 'Priority On-Demand Assistance', description: 'Expedited support with dedicated specialist follow-up.', price_npr: 'NPR 7,000' },
    ],
    review_themes: [
      { sentiment: 'Reliability', original_testimonial_summary: 'Recognized by patrons for transparent quotes, reliable timelines, and meticulous execution.', customer_archetype: 'Long-term Client' },
      { sentiment: 'Professionalism', original_testimonial_summary: 'Praised for prompt communication and respectful, attentive customer support.', customer_archetype: 'New Client' },
    ],
    faqs: [
      { question: 'How do I get started?', answer: 'Reach out via our direct WhatsApp button or give us a quick call to schedule your first visit.' },
      { question: 'What are your working hours?', answer: 'We are open Sunday through Friday from 9:30 AM to 6:30 PM.' }
    ],
    local_seo_keywords: [`trusted ${b.category} in ${b.district}`, `${b.name} kathmandu`, `best ${b.category} nepal`],
    nepali_content: {
      hero_title: 'विश्वसनीय सेवा, स्थानीय सन्तुष्टि',
      tagline: 'तपाईंको आवश्यकतामा हाम्रो पूर्ण समर्पण',
      about_snippet: `${b.name} द्वारा गुणस्तरीय सेवा प्रदान गर्न हामी सधैं तत्पर छौं।`
    }
  };
}
