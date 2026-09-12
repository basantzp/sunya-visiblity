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
  const targetPhone = cleanPhone.length >= 7 ? `977${cleanPhone}` : '9779800000000';
  const whatsappCatalogUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
    `Namaste ${business.name}! I would like to view your latest catalog and prices.`,
  )}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d0d11] font-sans text-stone-100 selection:bg-amber-400 selection:text-black">
      {/* Background Accent */}
      <div className="pointer-events-none absolute right-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />

      {/* Editorial Luxury Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#0d0d11]/85 px-6 py-4 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black uppercase tracking-widest text-white">
              {business.name}
            </span>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              Curated Boutique
            </span>
          </div>
          <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-wider text-stone-400">
            {business.address || `${business.district}, Kathmandu Valley`}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setLang((l) => (l === 'en' ? 'np' : 'en'))}
            className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-stone-300 transition-colors hover:text-white"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
          </button>

          <a
            href={whatsappCatalogUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] sm:px-5"
          >
            <ShoppingBag className="h-3.5 w-3.5 fill-stone-950" />
            <span>Inquire Catalog</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-6">
          <div className="glass-card-gold inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold text-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{lang === 'en' ? copy.tagline : copy.nepali_content.tagline}</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
            {lang === 'en' ? (
              <>
                Refined Craft & Contemporary Style at{' '}
                <span className="gold-gradient-text block">{business.name}</span>
              </>
            ) : (
              <>
                <span className="gold-gradient-text">{business.name}</span> मा विशिष्ट शैली र
                गुणस्तर
              </>
            )}
          </h1>

          <p className="text-base leading-relaxed text-stone-300">
            {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={whatsappCatalogUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-7 py-4 text-sm font-bold text-stone-950 shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
            >
              <MessageSquare className="h-4 w-4 fill-stone-950" />
              <span>Direct WhatsApp Orders</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href="#lookbook"
              className="glass-card rounded-2xl px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <span>Explore Lookbook</span>
            </a>
          </div>

          <div className="grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <div className="flex items-center gap-1 text-xl font-extrabold text-amber-400">
                <Star className="h-4 w-4 fill-amber-400" />
                <span>{business.rating || 4.8}</span>
              </div>
              <span className="text-[11px] text-stone-400">Verified Rating</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">100%</div>
              <span className="text-[11px] text-stone-400">Authentic Pieces</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-emerald-400">Instant</div>
              <span className="text-[11px] text-stone-400">Delivery in Valley</span>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="glass-card-gold animate-float-slow overflow-hidden rounded-3xl p-2 shadow-2xl">
            <img
              src={heroImage}
              alt={business.name}
              className="h-[480px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Lookbook / Collections */}
      <section id="lookbook" className="mx-auto max-w-7xl space-y-12 px-6 py-20">
        <div className="mx-auto max-w-2xl space-y-2 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Curated Edit
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Signature Collection</h2>
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
                  <PackageCheck className="h-3.5 w-3.5 text-emerald-400" /> In Stock
                </span>

                <a
                  href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                    `Namaste ${business.name}! I want to purchase: ${item.title} (${item.price_npr || 'as per catalog'}).`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-amber-400 transition-colors hover:text-amber-300"
                >
                  <span>Order Piece</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
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
