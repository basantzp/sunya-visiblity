import React from 'react';
import { notFound } from 'next/navigation';
import { enrichAndGenerateCopy } from '@/lib/gemini';
import { discoverPlaces } from '@/lib/places';
import {
  resolveTemplateType,
  RestaurantTemplate,
  RetailTemplate,
  ServicesTemplate,
  WellnessTemplate,
} from '@/lib/templates';
import { ClaimModalBanner } from './ClaimModalBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params;

  // Retrieve mock or database leads to match slug
  const allLeads = await discoverPlaces({ category: 'all', district: 'All' });
  const cleanSlug = slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const matched =
    allLeads.find((l) => {
      const s = l.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const pid = (l.place_id || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return (
        s === cleanSlug ||
        cleanSlug.includes(s) ||
        s.includes(cleanSlug) ||
        pid === cleanSlug ||
        cleanSlug.includes(pid)
      );
    }) ||
    // Try matching significant keywords (e.g., 'steak-house', 'french-bakery', 'the-pump')
    allLeads.find((l) => {
      const slugWords = cleanSlug.split('-').filter((w) => w.length >= 4);
      const nameWords = l.name
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length >= 4);
      const common = slugWords.filter((w) => nameWords.includes(w));
      return common.length >= 2;
    }) ||
    allLeads[0];

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
  const templateProps = {
    business: {
      name: matched.name,
      category: matched.category,
      address: matched.address,
      district: matched.district,
      phone: matched.phone,
      rating: matched.rating,
      reviews_count: matched.user_ratings_total,
      photos: matched.photos,
    },
    copy,
    previewMode: true,
  };

  return (
    <div className="relative min-h-screen">
      {/* Top Claim & Purchase Banner for Business Owners */}
      <ClaimModalBanner businessName={matched.name} district={matched.district} slug={slug} />

      {/* Render The Custom Business Template */}
      {templateType === 'wellness' ? (
        <WellnessTemplate {...templateProps} />
      ) : templateType === 'retail' ? (
        <RetailTemplate {...templateProps} />
      ) : templateType === 'services' ? (
        <ServicesTemplate {...templateProps} />
      ) : (
        <RestaurantTemplate {...templateProps} />
      )}
    </div>
  );
}
