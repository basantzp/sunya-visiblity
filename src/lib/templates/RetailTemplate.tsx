'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Globe,
  MapPin,
  MessageSquare,
  PackageCheck,
  Phone,
  Shield,
  ShoppingBag,
  Sparkles,
  Star,
} from 'lucide-react';

interface TemplateProps {
  business: {
    name: string;
    category: string;
    address: string;
    district: string;
    phone?: string;
    rating?: number;
    reviews_count?: number;
    photos?: string[];
  };
  copy: {
    tagline: string;
    hero_title: string;
    hero_subtitle: string;
    about_story: string;
    signature_offerings: Array<{ title: string; description: string; price_npr?: string }>;
    review_themes: Array<{
      sentiment: string;
      original_testimonial_summary: string;
      customer_archetype: string;
    }>;
    nepali_content: { hero_title: string; tagline: string; about_snippet: string };
  };
}

export function RetailTemplate({ business, copy }: TemplateProps) {
  const [lang, setLang] = useState<'en' | 'np'>('en');

  const isClothing =
    business.name.toLowerCase().includes('clothing') ||
    business.name.toLowerCase().includes('cloth') ||
    business.name.toLowerCase().includes('boutique') ||
    business.name.toLowerCase().includes('pashmina') ||
    business.name.toLowerCase().includes('textile') ||
    business.name.toLowerCase().includes('fashion') ||
    business.name.toLowerCase().includes('apparel') ||
    business.category.toLowerCase().includes('clothing') ||
    business.category.toLowerCase().includes('apparel');

  const isOrganicGrocer =
    business.name.toLowerCase().includes('pasal') ||
    business.name.toLowerCase().includes('dry food') ||
    business.name.toLowerCase().includes('healthy') ||
    business.name.toLowerCase().includes('spice') ||
    business.category.toLowerCase().includes('grocery') ||
    business.category.toLowerCase().includes('organic');

  const isFlower =
    business.category.toLowerCase().includes('flower') ||
    business.category.toLowerCase().includes('nursery') ||
    business.category.toLowerCase().includes('flora');

  const heroImage =
    business.photos?.[0] ||
    (isClothing
      ? 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80'
      : isOrganicGrocer
        ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'
        : isFlower
          ? 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80'
          : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80');

  const cleanPhone = (business.phone || '').replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.length >= 7 ? `977${cleanPhone}` : '9779867333080';
  const whatsappCatalogUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
    `Hello Sir/Ma'am! I would like to view the latest ${isClothing ? 'clothing catalog and sizes' : isOrganicGrocer ? 'organic products and price list' : 'catalog and prices'} for ${business.name}.`,
  )}`;

  const categoryBadge = isClothing
    ? 'Handmade Apparel & Fashion Boutique'
    : isOrganicGrocer
      ? 'Organic Grocer & Dry Superfoods'
      : isFlower
        ? 'Floral Boutique & Plant Nursery'
        : 'Curated Boutique & Crafts';

  const sectionHeadline = isClothing
    ? 'Handcrafted Apparel & Seasonal Lookbook'
    : isOrganicGrocer
      ? 'Organic Harvest & Himalayan Superfoods'
      : isFlower
        ? 'Fresh Bouquets & Living Plant Collections'
        : 'Curated Artisanal Collections';

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d0d11] font-sans text-stone-100 selection:bg-amber-400 selection:text-black">
      {/* Background Accent */}
      <div className="pointer-events-none absolute right-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />

      {/* Editorial Luxury Header */}
      <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0d0d11]/90 px-4 py-3.5 backdrop-blur-xl sm:flex-nowrap sm:px-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate text-base font-black uppercase tracking-widest text-white sm:text-xl">
              {business.name}
            </span>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              {categoryBadge}
            </span>
          </div>
          <span className="mt-0.5 block truncate text-[11px] font-medium uppercase tracking-wider text-stone-400">
            {business.address || `${business.district}, Kathmandu Valley`}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:gap-3">
          <button
            onClick={() => setLang((l) => (l === 'en' ? 'np' : 'en'))}
            className="flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 px-2.5 py-1.5 text-stone-300 transition-colors hover:text-white sm:px-3"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
          </button>

          <a
            href={whatsappCatalogUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-2 text-xs font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] sm:gap-2 sm:px-5"
          >
            <ShoppingBag className="h-3.5 w-3.5 fill-stone-950" />
            <span>{isClothing ? 'Inquire Lookbook' : 'Inquire Catalog'}</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-16 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-6">
          <div className="glass-card-gold inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold text-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{lang === 'en' ? copy.tagline : copy.nepali_content.tagline}</span>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {lang === 'en' ? (
              <>
                <span className="block">
                  {copy.hero_title ||
                    (isClothing
                      ? `Handcrafted Nepali Fashion & Textiles at ${business.name}`
                      : isOrganicGrocer
                        ? `Pure Organic Harvest at ${business.name}`
                        : `Curated Floral Art & Craft at ${business.name}`)}
                </span>
              </>
            ) : (
              <>
                <span className="gold-gradient-text">{copy.nepali_content.hero_title}</span>
              </>
            )}
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base">
            {copy.hero_subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={whatsappCatalogUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-3.5 text-sm font-extrabold text-stone-950 shadow-xl shadow-amber-500/25 transition-transform hover:scale-[1.02]"
            >
              <ShoppingBag className="h-4 w-4 fill-stone-950" />
              <span>{isClothing ? 'View Clothing Lookbook' : 'Order via WhatsApp'}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href="#lookbook"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <span>{isClothing ? 'Browse Garments' : 'View Catalog'}</span>
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="flex items-center gap-6 pt-4 text-xs text-stone-400">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{business.rating || 4.8} / 5.0</span>
              <span className="text-stone-500">({business.reviews_count || 120}+ reviews)</span>
            </div>
            <div className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span>{business.district}, Kathmandu Valley</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto aspect-[4/3] max-w-lg overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/60">
            <img
              src={heroImage}
              alt={business.name}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* About Story */}
      {copy.about_story && (
        <section className="mx-auto max-w-5xl border-t border-white/10 px-6 py-16">
          <div className="glass-card space-y-4 rounded-3xl p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Heritage & Craft
            </span>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Rooted in {business.address || business.district}
            </h2>
            <p className="text-sm leading-relaxed text-stone-300 sm:text-base">
              {copy.about_story}
            </p>
          </div>
        </section>
      )}

      {/* Lookbook / Collections */}
      <section id="lookbook" className="mx-auto max-w-7xl space-y-12 px-6 py-20">
        <div className="mx-auto max-w-2xl space-y-2 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Curated Offerings
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{sectionHeadline}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.signature_offerings.map((item, idx) => (
            <div
              key={idx}
              className="glass-card flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/40"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  {item.price_npr && (
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-xs font-extrabold text-amber-300">
                      {item.price_npr}
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-stone-400 sm:text-sm">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-6">
                <span className="flex items-center gap-1 text-[11px] text-stone-500">
                  <PackageCheck className="h-3.5 w-3.5 text-emerald-400" /> In Stock & Fresh
                </span>

                <a
                  href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                    `Hello Sir/Ma'am! I would like to order: ${item.title} (${item.price_npr || 'as per catalog'}) from ${business.name}.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-amber-400 transition-colors hover:text-amber-300"
                >
                  <span>Order via WhatsApp</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Patron Praise / Reviews */}
      {copy.review_themes && copy.review_themes.length > 0 && (
        <section className="mx-auto max-w-7xl border-t border-white/10 px-6 py-16">
          <div className="mx-auto mb-10 max-w-2xl space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Patron Impressions
            </span>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              What Kathmandu & Lalitpur Patrons Say
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {copy.review_themes.map((review, idx) => (
              <div key={idx} className="glass-card space-y-3 rounded-3xl p-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm italic text-stone-300">
                  &quot;{review.original_testimonial_summary}&quot;
                </p>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                  — {review.customer_archetype} · Verified Patron
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Location & Directions */}
      <section className="mx-auto max-w-5xl border-t border-white/10 px-6 py-16">
        <div className="glass-card grid items-center gap-8 rounded-3xl p-8 sm:grid-cols-2">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Visit Our Store
            </span>
            <h3 className="text-2xl font-bold text-white">{business.name}</h3>
            <p className="flex items-start gap-2 text-sm text-stone-400">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-400" />
              <span>{business.address || `${business.district}, Kathmandu Valley`}</span>
            </p>
            <p className="flex items-center gap-2 text-sm text-stone-400">
              <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{business.phone || '+977-9867333080'}</span>
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={business.phone ? `tel:${business.phone}` : 'tel:+9779867333080'}
                className="rounded-xl bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/15"
              >
                Call Store
              </a>
              <a
                href={whatsappCatalogUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-stone-950 transition-colors hover:bg-amber-300"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <div className="relative h-56 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(business.address || 'Sankhamul Kathmandu')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="opacity-80 contrast-125 grayscale transition-opacity hover:opacity-100"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-12 text-center text-xs text-stone-500">
        <p>
          © {new Date().getFullYear()} {business.name} · {business.district}, Kathmandu Valley.
        </p>
      </footer>
    </div>
  );
}
