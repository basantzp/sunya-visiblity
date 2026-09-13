import React, { Suspense } from 'react';
import { getPlaceBySlug } from '@/lib/places';
import { ClientOnboardingWizard } from './ClientOnboardingWizard';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ClientOnboardingPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const interest = typeof resolvedSearchParams.interest === 'string' ? resolvedSearchParams.interest : '';
  const email = typeof resolvedSearchParams.email === 'string' ? resolvedSearchParams.email : '';

  const place = await getPlaceBySlug(slug);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0A09] text-stone-400 p-8 font-mono text-xs">Loading onboarding pipeline...</div>}>
      <ClientOnboardingWizard
        slug={slug}
        initialLead={place}
        initialEmail={email}
        interestConfirmed={interest === 'confirmed'}
      />
    </Suspense>
  );
}
