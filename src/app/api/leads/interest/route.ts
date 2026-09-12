import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug') || '';
  const response = searchParams.get('response') || 'interested';
  const email = searchParams.get('email') || '';

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005';

  console.log(
    `[Lead Direct Interest Response] Slug: ${slug} | Response: ${response} | Email: ${email}`,
  );

  // Update lead in Supabase if live
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
    ) {
      const newStatus = response === 'interested' ? 'replied' : 'archived';
      await supabase
        .from('leads')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .ilike('name', `%${slug.replace(/-/g, ' ')}%`);
    }
  } catch (dbErr) {
    console.warn('[DB Update Warning]:', dbErr);
  }

  if (response === 'interested') {
    // Redirect client directly to the Next Operation Setup (Onboarding & Activation)
    const targetUrl = new URL(`/preview/${slug}/onboarding`, baseUrl);
    targetUrl.searchParams.set('interest', 'confirmed');
    if (email) targetUrl.searchParams.set('email', email);
    return NextResponse.redirect(targetUrl);
  } else {
    // Client declined
    const targetUrl = new URL(`/preview/${slug}`, baseUrl);
    targetUrl.searchParams.set('status', 'declined');
    return NextResponse.redirect(targetUrl);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, response, email, notes } = body;

    console.log('[API Direct Interest Post]:', { slug, response, email });

    // If interested, status becomes 'replied' / 'interested'
    const isInterested = response === 'interested' || response === 'yes';

    return NextResponse.json({
      success: true,
      slug,
      status: isInterested ? 'interested' : 'declined',
      nextOperationUrl: `/preview/${slug}/onboarding`,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to record response' },
      { status: 500 },
    );
  }
}
