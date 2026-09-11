'use client';

import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  ShoppingBag,
  Star,
  MessageSquare,
  ArrowUpRight,
  Globe,
  Shield,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  PackageCheck
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
    review_themes: Array<{ sentiment: string; original_testimonial_summary: string; customer_archetype: string }>;
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
    `Namaste ${business.name}! I would like to view your latest catalog and prices.`
  )}`;

  return (
    <div className="min-h-screen bg-[#0d0d11] text-stone-100 font-sans selection:bg-amber-400 selection:text-black relative overflow-x-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Editorial Luxury Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0d0d11]/85 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-widest uppercase text-white">{business.name}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Curated Boutique
            </span>
          </div>
          <span className="block text-[11px] font-medium tracking-wider text-stone-400 uppercase mt-0.5">
            {business.address || `${business.district}, Kathmandu Valley`}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setLang(l => (l === 'en' ? 'np' : 'en'))}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 rounded-xl text-stone-300 hover:text-white bg-white/5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
          </button>

          <a
            href={whatsappCatalogUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5 fill-stone-950" />
            <span>Inquire Catalog</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card-gold text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'en' ? copy.tagline : copy.nepali_content.tagline}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {lang === 'en' ? (
              <>
                Refined Craft & Contemporary Style at{' '}
                <span className="gold-gradient-text block">{business.name}</span>
              </>
            ) : (
              <>
                <span className="gold-gradient-text">{business.name}</span> मा विशिष्ट शैली र गुणस्तर
              </>
            )}
          </h1>

          <p className="text-stone-300 text-base leading-relaxed">
            {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={whatsappCatalogUrl}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 flex items-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-stone-950" />
              <span>Direct WhatsApp Orders</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#lookbook"
              className="px-6 py-4 rounded-2xl font-semibold text-sm glass-card hover:bg-white/10 text-white transition-all"
            >
              <span>Explore Lookbook</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md">
            <div>
              <div className="flex items-center gap-1 text-amber-400 font-extrabold text-xl">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{business.rating || 4.8}</span>
              </div>
              <span className="text-[11px] text-stone-400">Verified Rating</span>
            </div>
            <div>
              <div className="text-white font-extrabold text-xl">100%</div>
              <span className="text-[11px] text-stone-400">Authentic Pieces</span>
            </div>
            <div>
              <div className="text-emerald-400 font-extrabold text-xl">Instant</div>
              <span className="text-[11px] text-stone-400">Delivery in Valley</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="glass-card-gold p-2 rounded-3xl overflow-hidden shadow-2xl animate-float-slow">
            <img
              src={heroImage}
              alt={business.name}
              className="w-full h-[480px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Lookbook / Collections */}
      <section id="lookbook" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Curated Edit</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Signature Collection</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {copy.signature_offerings.map((item, idx) => (
            <div
              key={idx}
              className="glass-card hover:border-amber-500/40 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-white text-lg">{item.title}</h3>
                  {item.price_npr && (
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {item.price_npr}
                    </span>
                  )}
                </div>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <PackageCheck className="w-3.5 h-3.5 text-emerald-400" /> In Stock
                </span>

                <a
                  href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                    `Namaste ${business.name}! I want to purchase: ${item.title} (${item.price_npr || 'as per catalog'}).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>Order Piece</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 text-center text-xs text-stone-500">
        <p>© {new Date().getFullYear()} {business.name} · {business.district}, Kathmandu Valley.</p>
      </footer>
    </div>
  );
}
