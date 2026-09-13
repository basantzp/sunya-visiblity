import { NextResponse } from 'next/server';
import { sendOutreachEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      toEmail,
      businessName,
      district,
      category,
      previewUrl,
      slug,
      specificDetail,
      isConfidential,
    } = body;

    if (!toEmail || !businessName) {
      return NextResponse.json(
        { error: 'Missing required parameters: toEmail and businessName' },
        { status: 400 },
      );
    }

    const result = await sendOutreachEmail({
      toEmail,
      businessName,
      district: district || 'Kathmandu',
      category: category || 'Local Business',
      previewUrl: previewUrl || `/preview/${slug}`,
      slug: slug || businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      specificDetail: specificDetail || 'high-rating local services',
      isConfidential: isConfidential !== false,
    });

    return NextResponse.json({
      success: result.success,
      simulated: result.simulated ?? false,
      messageId: result.messageId,
      error: result.error,
      sentTo: toEmail,
      confidential: isConfidential !== false,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[API Send Direct Mail Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Internal dispatch failure' },
      { status: 500 },
    );
  }
}
