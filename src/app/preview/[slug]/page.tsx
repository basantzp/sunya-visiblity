import React from 'react';
import { notFound } from 'next/navigation';
import { discoverPlaces } from '@/lib/places';
import { enrichAndGenerateCopy } from '@/lib/gemini';
import { resolveTemplateType, getTemplateComponent } from '@/lib/templates';
import { ClaimModalBanner } from './ClaimModalBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params;

  // Retrieve mock or database leads to match slug
  const allLeads = await discoverPlaces({ category: 'all', district: 'All' });
  const matched = allLeads.find(l => {
    const s = l.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return s === slug || slug.includes(s) || s.includes(slug);
  }) || allLeads[0];

  if (!matched) {
    notFound();
  }

  const copy = await enrichAndGenerateCopy({
    name: matched.name,
    category: matched.category,
    district: matched.district,
    address: matched.address,
    rating: matched.rating,
    reviews_count: matched.user_ratings_total,
  });

  const templateType = resolveTemplateType(matched.category);
  const TemplateComponent = getTemplateComponent(templateType);

  return (
    <div className="relative min-h-screen">
      {/* Top Claim & Purchase Banner for Business Owners */}
      <ClaimModalBanner businessName={matched.name} district={matched.district} />

      {/* Render The Custom Business Template */}
      <TemplateComponent
        business={{
          name: matched.name,
          category: matched.category,
          address: matched.address,
          district: matched.district,
          phone: matched.phone,
          rating: matched.rating,
          reviews_count: matched.user_ratings_total,
          photos: matched.photos,
        }}
        copy={copy}
        previewMode={true}
      />
    </div>
  );
}
