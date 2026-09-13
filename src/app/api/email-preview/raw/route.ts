import { NextRequest, NextResponse } from 'next/server';
import { generateColdEmailCopy } from '@/lib/mailer';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const business = searchParams.get('business') || searchParams.get('name') || 'Sandar Momo (Sankhamul)';
  const category = searchParams.get('category') || 'restaurant';
  const slug = searchParams.get('slug') || 'sandar-momo-sankhamul';
  const district = searchParams.get('district') || 'Kathmandu';
  const isConfidential = searchParams.get('confidential') !== 'false';

  const baseUrl = req.nextUrl.origin;

  const emailData = generateColdEmailCopy({
    toEmail: 'owner@example.com',
    businessName: business,
    district,
    category,
    previewUrl: `${baseUrl}/preview/${slug}`,
    slug,
    isConfidential,
  });

  // Replace cid:brandlogo with relative web path for localhost browser display
  const webHtml = emailData.html.replace(
    /src="cid:brandlogo"/g,
    'src="/sunya-logo-horizontal-white.png"'
  );

  return new NextResponse(webHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
