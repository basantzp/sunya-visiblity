import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import fs from 'fs';
import path from 'path';
import { generateColdEmailCopy } from '../src/lib/mailer';

function buildPreview(businessName: string, category: string, slug: string, filename: string) {
  const emailData = generateColdEmailCopy({
    toEmail: 'owner@example.com',
    businessName,
    district: 'Kathmandu',
    category,
    previewUrl: `http://localhost:3005/preview/${slug}`,
    slug,
    isConfidential: true,
  });

  // Convert cid:brandlogo and proof screenshots to base64 data URI so it displays in any browser
  const logoPath = path.join(process.cwd(), 'public', 'sunya-logo-horizontal-white.png');
  let finalHtml = emailData.html;
  if (fs.existsSync(logoPath)) {
    const logoBase64 = fs.readFileSync(logoPath).toString('base64');
    finalHtml = finalHtml.replace(/src="cid:brandlogo"/g, `src="data:image/png;base64,${logoBase64}"`);
  }

  const redditProofPath = path.join(process.cwd(), 'public', 'social-proof-reddit-sandar.png');
  if (fs.existsSync(redditProofPath)) {
    const redditBase64 = fs.readFileSync(redditProofPath).toString('base64');
    finalHtml = finalHtml.replace(/src="cid:redditproof"/g, `src="data:image/png;base64,${redditBase64}"`);
  }

  const xProofPath = path.join(process.cwd(), 'public', 'social-proof-x-sandar.png');
  if (fs.existsSync(xProofPath)) {
    const xBase64 = fs.readFileSync(xProofPath).toString('base64');
    finalHtml = finalHtml.replace(/src="cid:xproof"/g, `src="data:image/png;base64,${xBase64}"`);
  }

  const fbProofPath = path.join(process.cwd(), 'public', 'social-proof-fb-sandar.png');
  if (fs.existsSync(fbProofPath)) {
    const fbBase64 = fs.readFileSync(fbProofPath).toString('base64');
    finalHtml = finalHtml.replace(/src="cid:fbproof"/g, `src="data:image/png;base64,${fbBase64}"`);
  }

  const outPath = path.join(process.cwd(), 'public', filename);
  fs.writeFileSync(outPath, finalHtml, 'utf-8');
  console.log(`✅ Saved preview to: ${outPath} (${(finalHtml.length / 1024).toFixed(1)} KB)`);
  return outPath;
}

const sandarFile = buildPreview('Sandar Momo (Sankhamul)', 'restaurant', 'sandar-momo-sankhamul', 'preview-email-sandar.html');
const parijatFile = buildPreview('Parijat Flower House & Nursery', 'flower shop', 'parijat-flower-house-sankhamul', 'preview-email-parijat.html');

console.log('Finished generating email previews for browser inspection.');
