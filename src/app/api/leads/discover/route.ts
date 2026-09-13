import { NextResponse } from 'next/server';
import { discoverPlaces } from '@/lib/places';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const category = body.category || 'all';
    const district = body.district || 'All';
    const limit = typeof body.limit === 'number' ? body.limit : 15;

    console.log(`[API Discover Leads] Category: ${category} | District: ${district} | Limit: ${limit}`);

    const leads = await discoverPlaces({
      category,
      district,
      limit,
    });

    return NextResponse.json({
      success: true,
      costNPR: 0.0,
      costUSD: 0.0,
      engine: 'OpenStreetMap Overpass + Sunya Kathmandu Local Directory',
      zeroApiFees: true,
      totalFound: leads.length,
      leads: leads.map(l => ({
        id: l.place_id,
        name: l.name,
        category: l.category,
        district: l.district,
        address: l.address,
        rating: l.rating,
        reviews: l.user_ratings_total,
        slug: l.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        previewUrl: `/preview/${l.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
        hasPhone: !!l.phone,
        phone: l.phone,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[API Discover Leads Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Discovery failure' },
      { status: 500 }
    );
  }
}
