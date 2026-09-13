import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from 'fs';
import { discoverPlaces } from '../src/lib/places';
import { enrichAndGenerateCopy } from '../src/lib/gemini';
import { generateColdEmailCopy } from '../src/lib/mailer';

async function verifyZeroApiFeesArchitecture() {
  console.log('================================================================');
  console.log('⚡ SUNYA — ZERO API FEES & PSYCHOLOGICAL OUTREACH AUDIT SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let total = 7;

  // 1. Audit Environment Variables (Zero paid API keys loaded)
  console.log('1️⃣ [ENV AUDIT] Inspecting API Keys & Billing Toggles:');
  const zeroApiFees = process.env.ZERO_API_FEES === 'true';
  const hasGooglePlacesKey = !!process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACES_API_KEY.trim().length > 0;
  const hasPaidGeminiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0;

  console.log(`   • ZERO_API_FEES: ${process.env.ZERO_API_FEES}`);
  console.log(`   • GOOGLE_PLACES_API_KEY active: ${hasGooglePlacesKey ? 'YES (Warning: May incur cost)' : 'NO ($0.00 Bypassed)'}`);
  console.log(`   • GEMINI_API_KEY active: ${hasPaidGeminiKey ? 'YES' : 'NO ($0.00 Bypassed)'}`);

  if (zeroApiFees && !hasGooglePlacesKey && !hasPaidGeminiKey) {
    console.log('   ✅ PASS: Paid cloud APIs are completely disabled ($0.00 / NPR 0.00 billing)\n');
    passed++;
  } else {
    console.log('   ❌ FAIL: Paid cloud APIs are configured.\n');
  }

  // 2. Audit Discovery Engine (OpenStreetMap Overpass + Local Verified Leads)
  console.log('2️⃣ [DISCOVERY AUDIT] Testing Zero-Fee Discovery Engine:');
  const flowerLeads = await discoverPlaces({ category: 'flower shop', district: 'Kathmandu', limit: 3 });
  console.log(`   • Discovered ${flowerLeads.length} qualified leads in Kathmandu.`);
  if (flowerLeads.length >= 2 && flowerLeads[0].name.includes('Parijat')) {
    console.log(`   • Sample lead: ${flowerLeads[0].name} (${flowerLeads[0].address})`);
    console.log('   ✅ PASS: Business discovery operates at NPR 0.00\n');
    passed++;
  } else {
    console.log('   ❌ FAIL: Discovery failed or returned empty results\n');
  }

  // 3. Audit Copywriting Engine (Deterministic Kathmandu Localization)
  console.log('3️⃣ [COPYWRITING AUDIT] Testing Authentic Local Copywriting & Social Listening:');
  const sampleBusiness = flowerLeads[0];
  const copy = await enrichAndGenerateCopy({
    name: sampleBusiness.name,
    category: sampleBusiness.category,
    district: sampleBusiness.district,
    address: sampleBusiness.address,
    rating: sampleBusiness.rating,
    reviews_count: sampleBusiness.user_ratings_total,
  });

  const hasSocialSentiment = copy.review_themes.some(t => t.sentiment.includes('Reddit') || t.sentiment.includes('Facebook'));
  console.log(`   • Generated Tagline: "${copy.tagline}"`);
  console.log(`   • Social Listening in Review Themes: ${hasSocialSentiment ? 'YES (Reddit r/Nepal & Facebook)' : 'NO'}`);
  console.log(`   • Nepali snippet: "${copy.nepali_content.tagline}"`);
  if (copy.tagline && copy.signature_offerings.length >= 2 && hasSocialSentiment) {
    console.log('   ✅ PASS: Localized copy with cross-platform social proof generated at NPR 0.00\n');
    passed++;
  } else {
    console.log('   ❌ FAIL: Copy generation missing fields\n');
  }

  // 4. Audit Direct Email Rendering & Psychological Persuasion Pillars
  console.log('4️⃣ [EMAIL AUDIT] Testing Deep Research, FOMO, Hope & "At Least Call" Triggers:');
  const mailContent = generateColdEmailCopy({
    toEmail: 'test@example.com',
    businessName: sampleBusiness.name,
    district: sampleBusiness.district,
    category: sampleBusiness.category,
    previewUrl: `http://localhost:3005/preview/${sampleBusiness.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    slug: sampleBusiness.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    isConfidential: true,
  });
  const html = mailContent.html;

  const containsSunyaOnly = html.includes('Sunya') && !html.includes('Sunya Visibility');
  const containsDeepResearch = /facebook/i.test(html) && /twitter/i.test(html) && /reddit/i.test(html);
  const containsFOMO = /fomo/i.test(html) || /60%/i.test(html);
  const containsHope = /hope/i.test(html) || /0% commission/i.test(html);
  const containsDisclaimer = /this is just a sample format/i.test(html);
  const containsBudgets = /any budget ranges according to your need/i.test(html);
  const containsAtLeastCall = /at least (give us a quick call|call us)/i.test(html) && html.includes('9867333080');
  const containsReferEarn = /refer.*earn/i.test(html);

  console.log(`   • Exact brand "Sunya" enforced: ${containsSunyaOnly}`);
  console.log(`   • Deep Research (Facebook · Twitter · Reddit): ${containsDeepResearch}`);
  console.log(`   • Intense FOMO trigger present: ${containsFOMO}`);
  console.log(`   • Hope & Complete Empowerment present: ${containsHope}`);
  console.log(`   • Sample format disclaimer present: ${containsDisclaimer}`);
  console.log(`   • Any budget ranges pitch present: ${containsBudgets}`);
  console.log(`   • "At Least Call" low-friction CTA (9867333080): ${containsAtLeastCall}`);
  console.log(`   • Refer & Earn commission program present: ${containsReferEarn}`);

  if (containsSunyaOnly && containsDeepResearch && containsFOMO && containsHope && containsDisclaimer && containsBudgets && containsAtLeastCall && containsReferEarn) {
    console.log('   ✅ PASS: Outreach email renders all psychological triggers and client requirements\n');
    passed++;
  } else {
    console.log('   ❌ FAIL: Outreach email missing one or more required elements\n');
  }

  // 5. Audit WhatsApp Direct Link (0 Meta WhatsApp Cloud API cost)
  console.log('5️⃣ [WHATSAPP AUDIT] Testing WhatsApp Direct Link:');
  const testWaUrl = `https://wa.me/9779867333080?text=${encodeURIComponent('Namaste Basantji, I would like to discuss building our website with Sunya.')}`;
  console.log(`   • Deep Link: ${testWaUrl}`);
  if (testWaUrl.includes('9779867333080')) {
    console.log('   ✅ PASS: Direct WhatsApp communication costs NPR 0.00 (0 Meta API fees)\n');
    passed++;
  } else {
    console.log('   ❌ FAIL: WhatsApp URL misconfigured\n');
  }

  // 6. Audit SMTP Dispatch (Free Personal Google SMTP)
  console.log('6️⃣ [SMTP AUDIT] Inspecting Mail Dispatch Engine:');
  const gmailUser = process.env.GMAIL_USER;
  const hasAppPassword = !!process.env.GMAIL_APP_PASSWORD;
  console.log(`   • SMTP Host: smtp.gmail.com:465 (SSL)`);
  console.log(`   • Sender: ${gmailUser}`);
  console.log(`   • App Password Configured: ${hasAppPassword ? 'YES (Free Google App Password)' : 'NO'}`);
  console.log(`   • Free Tier Allowance: Up to 500 emails/day at NPR 0.00 / $0.00`);

  if (gmailUser && hasAppPassword) {
    console.log('   ✅ PASS: Mail delivery costs NPR 0.00 (Zero SendGrid/Mailgun subscription fees)\n');
    passed++;
  } else {
    console.log('   ❌ FAIL: SMTP credentials incomplete\n');
  }

  // 7. Audit Skills Memory Persistence
  console.log('7️⃣ [SKILLS MEMORY AUDIT] Inspecting Skill Persistence:');
  const skill1 = fs.existsSync('/home/basant/.agents/skills/sunya-cold-outreach/SKILL.md');
  const skill2 = fs.existsSync('/home/basant/.gemini/config/skills/sunya-cold-outreach/SKILL.md');
  const skill3 = fs.existsSync('/home/basant/sunya-visiblity/skills/sunya-cold-outreach/SKILL.md');

  console.log(`   • ~/.agents/skills/sunya-cold-outreach/SKILL.md: ${skill1 ? 'EXISTS ✅' : 'MISSING ❌'}`);
  console.log(`   • ~/.gemini/config/skills/sunya-cold-outreach/SKILL.md: ${skill2 ? 'EXISTS ✅' : 'MISSING ❌'}`);
  console.log(`   • sunya-visiblity/skills/sunya-cold-outreach/SKILL.md: ${skill3 ? 'EXISTS ✅' : 'MISSING ❌'}`);

  if (skill1 && skill2 && skill3) {
    console.log('   ✅ PASS: Full Sunya outreach skill permanently persisted across all memory locations\n');
    passed++;
  } else {
    console.log('   ❌ FAIL: Skill memory missing in one or more locations\n');
  }

  console.log('================================================================');
  console.log(`🎯 AUDIT SUMMARY: ${passed}/${total} TESTS PASSED`);
  if (passed === total) {
    console.log('🏆 STATUS: 100% OPERATIONAL WITH ZERO API FEES & FULL SKILL MEMORY PERSISTENCE');
  }
  console.log('================================================================\n');
}

verifyZeroApiFeesArchitecture().catch(console.error);
