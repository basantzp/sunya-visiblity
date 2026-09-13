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
  const heroImage =
    business.photos?.[0] ||
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80';

  const cleanPhone = (business.phone || '').replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.length >= 7 ? `977${cleanPhone}` : '9779867333080';
  const whatsappCatalogUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
    `Namaste ${business.name}! I would like to view your latest catalog and prices.`,
  )}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d0d11] font-sans text-stone-100 selection:bg-amber-400 selection:text-black">
      {/* Background Accent */}
      <div className="pointer-events-none absolute right-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />

      {/* Editorial Luxury Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0d0d11]/90 border-b border-white/10 px-4 sm:px-6 py-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base sm:text-xl font-black tracking-widest uppercase text-white truncate">{business.name}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {business.category.toLowerCase().includes('flower') || business.category.toLowerCase().includes('nursery') || business.category.toLowerCase().includes('flora')
                ? 'Floral Boutique & Plant Nursery'
                : 'Curated Boutique'}
            </span>
          </div>
          <span className="block text-[11px] font-medium tracking-wider text-stone-400 uppercase mt-0.5 truncate">
            {business.address || `${business.district}, Kathmandu Valley`}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <button
            onClick={() => setLang(l => (l === 'en' ? 'np' : 'en'))}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 border border-white/15 rounded-xl text-stone-300 hover:text-white bg-white/5 transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
          </button>

          <a
            href={whatsappCatalogUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform text-xs"
          >
            <ShoppingBag className="h-3.5 w-3.5 fill-stone-950" />
            <span>Inquire Catalog</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-8 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card-gold text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'en' ? copy.tagline : copy.nepali_content.tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {lang === 'en' ? (
              <>
                <span className="block">{copy.hero_title || `Curated Floral Art & Craft at ${business.name}`}</span>
              </>
            ) : (
              <>
                <span className="gold-gradient-text">{copy.nepali_content?.hero_title || `${business.name} मा विशिष्ट शैली र मौलिकता`}</span>
              </>
            )}
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {lang === 'en' ? copy.hero_subtitle : copy.nepali_content?.about_snippet || copy.hero_subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a
              href={whatsappCatalogUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto justify-center px-6 py-3.5 sm:py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 flex items-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-105 transition-all"
            >
              <MessageSquare className="h-4 w-4 fill-stone-950" />
              <span>Direct WhatsApp Orders</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href="#lookbook"
              className="w-full sm:w-auto text-center px-6 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm glass-card hover:bg-white/10 text-white transition-all"
            >
              <span>Explore Catalog</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-white/10 max-w-md">
            <div>
              <div className="flex items-center gap-1 text-amber-400 font-extrabold text-lg sm:text-xl">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{business.rating || 4.8}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-stone-400">Verified ({business.reviews_count || 184})</span>
            </div>
            <div>
              <div className="text-white font-extrabold text-lg sm:text-xl">100%</div>
              <span className="text-[10px] sm:text-[11px] text-stone-400">Fresh Guaranteed</span>
            </div>
            <div>
              <div className="text-emerald-400 font-extrabold text-lg sm:text-xl">Same-Day</div>
              <span className="text-[10px] sm:text-[11px] text-stone-400">Valley Delivery</span>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="glass-card-gold animate-float-slow overflow-hidden rounded-3xl p-2 shadow-2xl">
            <img
              src={heroImage}
              alt={business.name}
              className="w-full h-[260px] sm:h-[420px] lg:h-[480px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* About Story */}
      {copy.about_story && (
        <section className="py-16 px-6 max-w-5xl mx-auto border-t border-white/10">
          <div className="glass-card p-8 sm:p-12 rounded-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Heritage & Craft</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Rooted in {business.address || business.district}</h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {copy.about_story}
            </p>
          </div>
        </section>
      )}

      {/* Lookbook / Collections */}
      <section id="lookbook" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Curated Offerings</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Fresh Bouquets & Living Collections</h2>
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

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <PackageCheck className="w-3.5 h-3.5 text-emerald-400" /> In Stock & Fresh
                </span>

                <a
                  href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                    `Namaste ${business.name}! I would like to order: ${item.title} (${item.price_npr || 'as per catalog'}).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-amber-400 transition-colors hover:text-amber-300"
                >
                  <span>Order via WhatsApp</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Patron Praise / Reviews */}
      {copy.review_themes && copy.review_themes.length > 0 && (
        <section className="py-16 px-6 max-w-7xl mx-auto border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Patron Impressions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Kathmandu & Lalitpur Patrons Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {copy.review_themes.map((review, idx) => (
              <div key={idx} className="glass-card p-6 rounded-3xl space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-300 text-sm italic">"{review.original_testimonial_summary}"</p>
                <div className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
                  — {review.customer_archetype} · Verified Patron
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Location & Directions */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-white/10">
        <div className="glass-card p-8 rounded-3xl grid sm:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Visit Our Store</span>
            <h3 className="text-2xl font-bold text-white">{business.name}</h3>
            <p className="text-stone-400 text-sm flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
              <span>{business.address || `${business.district}, Kathmandu Valley`}</span>
            </p>
            <p className="text-stone-400 text-sm flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{business.phone || '+977-9867333080'}</span>
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={business.phone ? `tel:${business.phone}` : 'tel:+9779867333080'}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white transition-colors"
              >
                Call Store
              </a>
              <a
                href={whatsappCatalogUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-stone-950 hover:bg-amber-300 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <div className="h-56 rounded-2xl overflow-hidden border border-white/10 relative">
            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(business.address || 'Sankhamul Kathmandu')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
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
