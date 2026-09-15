import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { generateColdEmailCopy } from '../src/lib/mailer';

dotenv.config({ path: '.env.local' });
dotenv.config();

function buildPreview(businessName: string, category: string, slug: string, filename: string) {
  const emailData = generateColdEmailCopy({
    toEmail: 'info@shankhamulfitness.com.np',
    businessName,
    district: 'Kathmandu',
    category,
    previewUrl: `http://localhost:3005/preview/${slug}`,
    slug,
    isConfidential: true,
  });

  const logoPath = path.join(process.cwd(), 'public', 'sunya-logo-horizontal-white.png');
  let finalHtml = emailData.html;
  if (fs.existsSync(logoPath)) {
    const logoBase64 = fs.readFileSync(logoPath).toString('base64');
    finalHtml = finalHtml.replace(
      /src="cid:brandlogo"/g,
      `src="data:image/png;base64,${logoBase64}"`,
    );
  }

  const outPath = path.join(process.cwd(), 'public', filename);
  fs.writeFileSync(outPath, finalHtml, 'utf-8');
  console.log(`✅ Saved preview to: ${outPath} (${(finalHtml.length / 1024).toFixed(1)} KB)`);
  return outPath;
}

buildPreview(
  'Shankhamul Health Club & Fitness Centre',
  'gym',
  'shankhamul-health-club-fitness',
  'preview-email-shankhamul-gym.html',
);

console.log('Finished generating gym email preview for browser inspection.');
