'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Globe,
  HelpCircle,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
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
    faqs: Array<{ question: string; answer: string }>;
    nepali_content: { hero_title: string; tagline: string; about_snippet: string };
  };
}

export function ServicesTemplate({ business, copy }: TemplateProps) {
  const [lang, setLang] = useState<'en' | 'np'>('en');

  const isHotel =
    business.name.toLowerCase().includes('hotel') ||
    business.name.toLowerCase().includes('resort') ||
    business.name.toLowerCase().includes('lodge') ||
    business.name.toLowerCase().includes('guesthouse') ||
    business.name.toLowerCase().includes('stay') ||
    business.category.toLowerCase().includes('hotel') ||
    business.category.toLowerCase().includes('hospitality');

  const heroImage =
    business.photos?.[0] ||
    (isHotel
      ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
      : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80');

  const whatsappUrl = `https://wa.me/977${(business.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    isHotel
      ? `Hello Sir/Ma'am! I would like to check room availability and book a stay at ${business.name}.`
      : `Hello Sir/Ma'am! I would like to consult regarding services at ${business.name}.`,
  )}`;

  return (
    <div
      className={`min-h-screen ${isHotel ? 'bg-[#0b0f19] text-stone-100 selection:bg-amber-500 selection:text-black' : 'bg-slate-900 text-slate-100 selection:bg-blue-600 selection:text-white'} font-sans`}
    >
      {/* Top Navbar */}
      <header
        className={`sticky top-0 z-40 border-b ${isHotel ? 'border-amber-500/20 bg-[#0b0f19]/90' : 'border-slate-800 bg-slate-900/90'} px-6 py-4 backdrop-blur`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${isHotel ? 'bg-amber-500 font-black text-stone-950' : 'bg-blue-600 font-bold text-white'}`}
            >
              {isHotel ? '🏨' : <ShieldCheck className="h-5 w-5" />}
            </div>
            <div>
              <span className="text-lg font-extrabold text-white">{business.name}</span>
              <span
                className={`block text-[10px] font-semibold uppercase tracking-widest ${isHotel ? 'text-amber-400' : 'text-blue-400'}`}
              >
                {isHotel
                  ? 'Boutique Hotel & Hospitality'
                  : `${business.district} Verified Practice`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setLang((l) => (l === 'en' ? 'np' : 'en'))}
              className={`flex items-center gap-1.5 rounded-lg border ${isHotel ? 'border-stone-700 bg-stone-800/80 text-stone-300' : 'border-slate-700 bg-slate-800 text-slate-300'} px-3 py-1.5 hover:bg-slate-700`}
            >
              <Globe className={`h-3.5 w-3.5 ${isHotel ? 'text-amber-400' : 'text-blue-400'}`} />
              <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
            </button>
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className={`hidden items-center gap-1.5 rounded-lg ${isHotel ? 'bg-amber-500 font-bold text-stone-950 hover:bg-amber-400' : 'bg-blue-600 font-semibold text-white hover:bg-blue-500'} px-4 py-1.5 transition-colors sm:inline-flex`}
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{business.phone}</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div
            className={`inline-flex items-center gap-2 rounded-md border ${isHotel ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-blue-500/20 bg-blue-500/10 text-blue-400'} px-3 py-1 text-xs font-semibold`}
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span>{lang === 'en' ? copy.tagline : copy.nepali_content.tagline}</span>
          </div>

          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {lang === 'en' ? copy.hero_title : copy.nepali_content.hero_title}
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-300">
            {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 rounded-xl ${isHotel ? 'bg-gradient-to-r from-amber-400 to-amber-500 font-extrabold text-stone-950 shadow-amber-500/20 hover:scale-[1.02]' : 'bg-blue-600 font-bold text-white shadow-blue-600/20 hover:bg-blue-500'} px-6 py-3.5 shadow-lg transition-all`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{isHotel ? 'Book Room on WhatsApp' : 'Consult on WhatsApp'}</span>
            </a>
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 font-semibold text-slate-200 transition-colors hover:bg-slate-700"
              >
                <Phone className={`h-4 w-4 ${isHotel ? 'text-amber-400' : 'text-blue-400'}`} />
                <span>Call Directly</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-6 border-t border-slate-800 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <Star className="h-4 w-4 fill-amber-400" />
              <span className="text-sm text-white">{business.rating || 4.6}</span>
              <span className="font-normal text-slate-400">
                ({business.reviews_count || 40}+ Reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <MapPin className={`h-4 w-4 ${isHotel ? 'text-amber-400' : 'text-blue-400'}`} />
              <span>{business.address}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
            <img src={heroImage} alt={business.name} className="h-[420px] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="border-y border-slate-800 bg-slate-950/60 px-6 py-16">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="mx-auto max-w-xl space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Core Services
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Transparent & Dedicated Assistance
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {copy.signature_offerings.map((item, idx) => (
              <div
                key={idx}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-7 transition-all hover:border-blue-500/50"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  {item.price_npr && (
                    <span className="rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-xs font-bold text-blue-400">
                      {item.price_npr}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Trust */}
      <section className="mx-auto max-w-4xl space-y-6 px-6 py-20">
        <h2 className="text-3xl font-bold text-white">
          Serving {business.district} with High Standards
        </h2>
        <p className="whitespace-pre-line text-base leading-relaxed text-slate-300">
          {copy.about_story}
        </p>
      </section>

      {/* FAQs */}
      {copy.faqs && copy.faqs.length > 0 && (
        <section className="border-t border-slate-800 bg-slate-950/40 px-6 py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {copy.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="space-y-2 rounded-lg border border-slate-800 bg-slate-900 p-5"
                >
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <HelpCircle className="h-4 w-4 text-blue-400" />
                    <span>{faq.question}</span>
                  </p>
                  <p className="pl-6 text-sm leading-relaxed text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 text-center text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()} {business.name}. {business.address}.
        </p>
      </footer>
    </div>
  );
}
