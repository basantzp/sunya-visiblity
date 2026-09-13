import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();
import { discoverPlaces } from '../src/lib/places';
import { enrichAndGenerateCopy } from '../src/lib/gemini';
import { generateColdEmailCopy, sendOutreachEmail } from '../src/lib/mailer';

async function testDispatch() {
  console.log('================================================================');
  console.log('SUNYA — EXTREME COLD EMAIL & GMAIL DISPATCH AUDIT');
  console.log('================================================================');

  console.log('\n=== STEP 1: DISCOVER SANDAR MOMO ===');
  const leads = await discoverPlaces({ category: 'all', district: 'All' });
  const sandar = leads.find(l => l.name.toLowerCase().includes('sandar')) || leads[0];
  console.log('Found Lead:', {
    name: sandar.name,
    address: sandar.address,
    rating: sandar.rating,
    phone: sandar.phone,
    reviews: sandar.user_ratings_total,
  });

  console.log('\n=== STEP 2: GENERATE ENRICHED COPY ===');
  const copy = await enrichAndGenerateCopy({
    name: sandar.name,
    category: sandar.category,
    district: sandar.district,
    address: sandar.address,
    rating: sandar.rating,
    reviews_count: sandar.user_ratings_total,
  });
  console.log('Tagline:', copy.tagline);
  console.log('Hero Title:', copy.hero_title);
  console.log('Offerings:', copy.signature_offerings.map(o => `${o.title} (${o.price_npr})`));

  console.log('\n=== STEP 3: PREPARE EXTREME COLD EMAIL ===');
  const targetEmail = 'audit-sandar@example.com';
  const slug = 'sandar-momo-sankhamul';
  const previewUrl = `http://localhost:3005/preview/${slug}`;

  const emailPayload = generateColdEmailCopy({
    toEmail: targetEmail,
    businessName: sandar.name,
    district: sandar.district,
    category: sandar.category,
    previewUrl,
    slug,
    isConfidential: true,
  });

  console.log('\nSubject Line:', emailPayload.subject);
  console.log('HTML Byte Length:', emailPayload.html.length, 'bytes');

  console.log('\n=== STEP 4: DISPATCH EMAIL VIA MAILER (SAFE DRY-RUN) ===');
  const result = await sendOutreachEmail({
    toEmail: targetEmail,
    businessName: sandar.name,
    district: sandar.district,
    category: sandar.category,
    previewUrl,
    slug,
    isConfidential: true,
    dryRun: true,
  });

  console.log('Dispatch Result:', {
    success: result.success,
    simulated: result.simulated,
    messageId: result.messageId,
    error: result.error ? result.error.slice(0, 100) + '...' : undefined
  });

  console.log('\n=== STEP 5: VERIFICATION CHECKPOINTS ===');
  const checks: { name: string; passed: boolean; details?: string }[] = [];

  // Check 1: Subject line
  const expectedSubject = '[CONFIDENTIAL PROPOSAL] Private Website & Digital Ordering Draft for Sandar Momo (Sankhamul)';
  checks.push({
    name: "1. Exact Subject Line Match",
    passed: emailPayload.subject === expectedSubject,
    details: emailPayload.subject
  });

  // Check 2: Confidential Headers
  const headers = result.headers || {};
  const hasHeaders = 
    headers['Sensitivity'] === 'Company-Confidential' &&
    headers['X-Priority'] === '1 (Highest)' &&
    headers['X-Draft-Classification'] === 'Direct-Executive-Proposal';
  checks.push({
    name: "2. Confidential Executive Headers (Sensitivity, X-Priority, X-Draft-Classification)",
    passed: Boolean(hasHeaders),
    details: `Sensitivity: ${headers['Sensitivity']}, X-Priority: ${headers['X-Priority']}, X-Draft-Classification: ${headers['X-Draft-Classification']}`
  });

  // Check 3: Authentic Tone & Deep Research Content
  const textAndHtml = emailPayload.bodyText + ' ' + emailPayload.html;
  const mentionsBridge = /Sankhamul Bridge/i.test(textAndHtml);
  const mentionsTimur = /timur/i.test(textAndHtml);
  const mentionsRating = /4\.7★/i.test(textAndHtml);
  const mentionsSocialProof = /Facebook.*Reddit.*Twitter/is.test(textAndHtml);
  checks.push({
    name: "3. Authentic Researched Pitch (Bridge crowd, timur paste, 4.7★ rating, multi-platform social proof)",
    passed: mentionsBridge && mentionsTimur && mentionsRating && mentionsSocialProof,
    details: `Bridge: ${mentionsBridge}, Timur: ${mentionsTimur}, 4.7★ Rating: ${mentionsRating}, Social Proof: ${mentionsSocialProof}`
  });

  // Check 4: Table-based Embedded Mini-Website Storefront with Menu, Prices, Hours, Location
  const hasStorefrontTable = emailPayload.html.includes('<!-- EMBEDDED WEBSITE STOREFRONT');
  const hasBuffMomo = emailPayload.html.includes('Special Buff Steamed Momo') && emailPayload.html.includes('160');
  const hasCMomo = emailPayload.html.includes('Crispy Buff C-Momo') && emailPayload.html.includes('210');
  const hasChickenMomo = emailPayload.html.includes('Chicken Steamed &amp; Jhol Momo') && emailPayload.html.includes('240');
  const hasTimurJar = emailPayload.html.includes('Signature Timur Chili Paste') && emailPayload.html.includes('40');
  const hasHours = emailPayload.html.includes('11:00 AM – 8:30 PM');
  const hasLocation = emailPayload.html.includes('Sankhamul Marg') && emailPayload.html.includes('Sankhamul Bridge');
  checks.push({
    name: "4. Embedded Mini-Website Storefront (Menu, prices, hours, location via table-based inline CSS)",
    passed: hasStorefrontTable && hasBuffMomo && hasCMomo && hasChickenMomo && hasTimurJar && hasHours && hasLocation,
    details: `Storefront Table: ${hasStorefrontTable}, Menu: ${hasBuffMomo && hasCMomo && hasChickenMomo && hasTimurJar}, Hours: ${hasHours}, Location: ${hasLocation}`
  });

  // Check 5: Direct WhatsApp Takeaway Order Preview
  const hasWhatsAppTakeaway = emailPayload.html.includes('DIRECT WHATSAPP TAKEAWAY PREVIEW') && 
                              emailPayload.html.includes('Instant Customer Takeaway Order');
  checks.push({
    name: "5. WhatsApp Takeaway Order Component Preview (0% aggregator commission)",
    passed: hasWhatsAppTakeaway,
    details: `WhatsApp preview card present in Gmail HTML table`
  });

  // Check 6: Streamlined Template & Removed Clutter
  const hasNoOrangeButton = !emailPayload.html.includes('VIEW LIVE INTERACTIVE WEBSITE PREVIEW');
  const hasNoBlueBox = !emailPayload.html.includes('Content expires in 7 days');
  const hasNoGreenClaim = !emailPayload.html.includes('CLAIM THIS FOR SANDAR MOMO');
  const isConcise = emailPayload.bodyText.length < 2000;
  checks.push({
    name: "6. Streamlined Template (Removed orange preview button, blue expiry box & green claim button; short attention scannable)",
    passed: hasNoOrangeButton && hasNoBlueBox && hasNoGreenClaim && isConcise,
    details: `No Orange Btn: ${hasNoOrangeButton}, No Blue Expiry: ${hasNoBlueBox}, No Green Claim: ${hasNoGreenClaim}, Body chars: ${emailPayload.bodyText.length}`
  });

  // Check 7: Direct Action Buttons (Call & WhatsApp)
  const hasCallButton = emailPayload.html.includes('tel:+9779867333080') && emailPayload.html.includes('Call Basant');
  const hasWaButton = emailPayload.html.includes('https://wa.me/9779867333080') && emailPayload.html.includes('WhatsApp: 9867333080');
  checks.push({
    name: "7. Direct Action Buttons (Call Basant & WhatsApp 9867333080)",
    passed: hasCallButton && hasWaButton,
    details: `Call button: ${hasCallButton}, WhatsApp button: ${hasWaButton}`
  });

  // Check 8: Founder Contact (Basant, 9867333080)
  const hasFounderContact = textAndHtml.includes('Basant') && textAndHtml.includes('9867333080');
  checks.push({
    name: "8. Founder Contact (Basant, Direct WhatsApp & Phone: 9867333080)",
    passed: hasFounderContact,
    details: `Basant and 9867333080 present across header, body, contact card, and footer`
  });

  // Check 9: Brand Logo (Native HTML/SVG Vector, not as image)
  const hasNativeHtmlLogo = emailPayload.html.includes('SUNYA') && 
                            emailPayload.html.includes('शून्य') && 
                            emailPayload.html.includes('<svg') &&
                            !emailPayload.html.includes('src="cid:brandlogo"');
  checks.push({
    name: "9. Sunya Brand Logo (Native HTML/SVG vector lockup, not as image)",
    passed: hasNativeHtmlLogo,
    details: `Native HTML/SVG Vector Logo present: ${hasNativeHtmlLogo}`
  });

  // Check 10: Dispatch Reliability
  checks.push({
    name: "10. Mailer Dispatch Execution (Zero syntax or runtime errors)",
    passed: result.success === true,
    details: `Success: ${result.success}, MessageId: ${result.messageId}`
  });

  console.log('\nAudit Results:');
  let allPassed = true;
  for (const check of checks) {
    const icon = check.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${icon} | ${check.name}`);
    if (check.details) console.log(`       ↳ ${check.details}`);
    if (!check.passed) allPassed = false;
  }

  console.log('\n================================================================');
  if (allPassed) {
    console.log('🌟 ALL 10 OUTREACH & GMAIL RENDERING CHECKS PASSED PERFECTLY!');
  } else {
    console.error('⚠️ SOME CHECKS FAILED');
    process.exit(1);
  }
  console.log('================================================================\n');
}

testDispatch().catch(err => {
  console.error('Error running test dispatch:', err);
  process.exit(1);
});
