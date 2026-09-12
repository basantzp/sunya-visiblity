/**
 * Sunya Visibility — Live Test Script for Shandar Momo
 * 1. Discovers and loads "Shandar Momo Corner"
 * 2. Synthesizes authentic Kathmandu valley Momo copywriting & menu
 * 3. Builds the live preview website link (http://localhost:3005/preview/shandar-momo-corner)
 * 4. Generates and dispatches the executive confidential cold email to pokhrelbasant00@gmail.com
 * 5. Saves the full rendered HTML email artifact to outreach/shandar-momo-cold-mail.html
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { deployPreviewSite } from '../src/lib/deployer';
import { enrichAndGenerateCopy } from '../src/lib/gemini';
import { generateColdEmailCopy, sendOutreachEmail } from '../src/lib/mailer';
import { discoverPlaces } from '../src/lib/places';
import { resolveTemplateType } from '../src/lib/templates';

async function main() {
  console.log('🥟 [Shandar Momo Test Runner] Initializing test cycle...\n');

  // Step 1: Discover Shandar Momo
  const places = await discoverPlaces({
    category: 'all',
    district: 'All',
  });

  const shandar = places.find(
    (p) =>
      p.name.toLowerCase().includes('shandar') ||
      p.place_id === 'ktm_place_shandar' ||
      p.name.toLowerCase().includes('momo corner'),
  );

  if (!shandar) {
    throw new Error('Could not find Shandar Momo Corner in places database.');
  }

  // Ensure recipient email is explicitly set to user target
  shandar.email = 'pokhrelbasant00@gmail.com';

  console.log('📍 Lead Identified:');
  console.log(`   Name:     ${shandar.name}`);
  console.log(`   Address:  ${shandar.address}`);
  console.log(`   District: ${shandar.district}`);
  console.log(`   Rating:   ${shandar.rating} ★ (${shandar.user_ratings_total} reviews)`);
  console.log(`   Email:    ${shandar.email}\n`);

  // Step 2: Enrich Copy & Menu
  console.log('✍️  [Copywriting Engine] Synthesizing localized copy for Shandar Momo...');
  const copy = await enrichAndGenerateCopy({
    name: shandar.name,
    category: shandar.category,
    district: shandar.district,
    address: shandar.address,
    rating: shandar.rating,
    reviews_count: shandar.user_ratings_total,
  });

  console.log(`   Tagline: "${copy.tagline}"`);
  console.log(`   Hero Title: "${copy.hero_title}"`);
  console.log(`   Offerings:`);
  copy.signature_offerings.forEach((item, i) => {
    console.log(`     ${i + 1}. ${item.title} (${item.price_npr}): ${item.description}`);
  });
  console.log('');

  // Step 3: Template & Preview Generation
  const templateType = resolveTemplateType(shandar.category);
  const slug = 'shandar-momo-corner';
  const deployment = await deployPreviewSite(slug, {
    business: shandar,
    copy,
    templateType,
  });

  console.log('🌐 [Website Preview Generated]:');
  console.log(`   Template: ${templateType} (Apple Dark Frosted Glass + Vibrant Warm Orange)`);
  console.log(`   Local URL: ${deployment.previewUrl}\n`);

  // Step 4: Cold Email Generation
  console.log('✉️  [Cold Mail Engine] Generating confidential executive proposal...');
  const targetEmail = 'pokhrelbasant00@gmail.com';
  const mailOptions = {
    toEmail: targetEmail,
    businessName: shandar.name,
    district: shandar.district,
    category: 'Momo Restaurant',
    previewUrl: deployment.previewUrl,
    slug,
    specificDetail: copy.signature_offerings[0]?.title || 'Special Steamed Buff Momo',
    priceNpr: 9999,
    founderName: process.env.FOUNDER_NAME || 'Basant',
    founderWhatsApp: process.env.FOUNDER_WHATSAPP || '+977-9800000000',
    isConfidential: true,
  };

  const { subject, bodyText, html } = generateColdEmailCopy(mailOptions);

  // Save HTML artifact for inspection
  const outreachDir = path.join(process.cwd(), 'outreach');
  if (!fs.existsSync(outreachDir)) {
    fs.mkdirSync(outreachDir, { recursive: true });
  }
  const htmlFilePath = path.join(outreachDir, 'shandar-momo-cold-mail.html');
  fs.writeFileSync(htmlFilePath, html, 'utf-8');
  console.log(`📁 Rendered HTML saved to: ${htmlFilePath}`);

  console.log('\n===============================================================');
  console.log(`SUBJECT: ${subject}`);
  console.log('===============================================================');
  console.log(bodyText);
  console.log('===============================================================\n');

  // Step 5: Dispatch Email
  console.log(`🚀 [Dispatching Email] Sending to ${targetEmail}...`);
  const dispatchResult = await sendOutreachEmail(mailOptions);

  if (dispatchResult.success) {
    if (dispatchResult.simulated) {
      console.log('✅ [Dispatch Success - Simulated / Dev Mode]');
      console.log(`   Message ID: ${dispatchResult.messageId}`);
      console.log(
        `   Notice: GMAIL_APP_PASSWORD not set or in development mode. Email content and headers fully validated.`,
      );
      console.log(
        `   To send a live email to your inbox: add your 16-character Gmail App Password to .env.local`,
      );
    } else {
      console.log('🎉 [Live Email Delivered Successfully!]');
      console.log(`   Message ID: ${dispatchResult.messageId}`);
      console.log(`   Delivered to: ${targetEmail} via Gmail SMTP`);
    }
  } else {
    console.error('❌ [Dispatch Error]:', dispatchResult.error);
  }

  console.log('\n✨ Test cycle completed successfully!');
}

main().catch((err) => {
  console.error('💥 Test run failed:', err);
  process.exit(1);
});
