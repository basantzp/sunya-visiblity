'use client';

import React, { useState } from 'react';
import { Phone, MapPin, ShoppingBag, Star, MessageSquare, ArrowUpRight, Globe, Shield, Sparkles } from 'lucide-react';

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
  const heroImage = business.photos?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80';
  const whatsappUrl = `https://wa.me/977${(business.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(business.name)},%20I%20am%20interested%20in%20your%20collection!`;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-serif selection:bg-neutral-900 selection:text-white">
      {/* Editorial Header */}
      <header className="border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold tracking-widest uppercase">{business.name}</span>
          <span className="block text-[10px] font-sans tracking-widest text-neutral-500 uppercase mt-0.5">{business.district} · Kathmandu Valley</span>
        </div>

        <div className="flex items-center gap-3 font-sans text-xs">
          <button
            onClick={() => setLang(l => l === 'en' ? 'np' : 'en')}
            className="flex items-center gap-1 px-3 py-1 border border-neutral-300 rounded hover:bg-neutral-100"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-neutral-900 text-white rounded font-medium hover:bg-neutral-800"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Inquire Catalog</span>
          </a>
        </div>
      </header>

      {/* Hero Exhibition */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-neutral-500">
            {lang === 'en' ? copy.tagline : copy.nepali_content.tagline}
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-neutral-950 leading-tight">
            {lang === 'en' ? copy.hero_title : copy.nepali_content.hero_title}
          </h1>
          <p className="font-sans text-neutral-600 text-base leading-relaxed">
            {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 font-sans text-sm">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-neutral-900 text-white rounded font-medium inline-flex items-center gap-2 hover:bg-neutral-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Order</span>
            </a>
            <a
              href="#catalog"
              className="px-6 py-3 border border-neutral-300 rounded font-medium inline-flex items-center gap-2 hover:bg-neutral-100"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-4 flex items-center gap-6 font-sans text-xs text-neutral-500 border-t border-neutral-200">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-neutral-900">{business.rating || 4.7} Rating</span>
              <span>({business.reviews_count || 30}+ reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-neutral-800" />
              <span>{business.address}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="relative border border-neutral-300 p-3 bg-white shadow-xl">
            <img
              src={heroImage}
              alt={business.name}
              className="w-full h-[460px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Curated Collection */}
      <section id="catalog" className="py-16 px-6 bg-white border-y border-neutral-200">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-normal">Featured Works</h2>
            <p className="font-sans text-sm text-neutral-500">Handcrafted selections available for immediate purchase in store or delivery.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {copy.signature_offerings.map((item, idx) => (
              <div key={idx} className="border border-neutral-200 p-6 space-y-3 bg-[#FDFBF7]">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  {item.price_npr && <span className="font-sans text-sm font-bold text-neutral-900">{item.price_npr}</span>}
                </div>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed">{item.description}</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 text-neutral-900 hover:text-amber-800 pt-2"
                >
                  <span>Order via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center space-y-6">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-500">Craft & Philosophy</span>
        <h2 className="text-3xl font-normal text-neutral-900">Rooted in {business.district}</h2>
        <p className="font-sans text-neutral-700 text-base leading-relaxed max-w-2xl mx-auto">
          {copy.about_story}
        </p>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200 font-sans text-center text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} {business.name}. {business.address}.</p>
      </footer>
    </div>
  );
}
