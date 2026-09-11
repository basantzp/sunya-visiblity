'use client';

import React, { useState } from 'react';
import { Phone, MapPin, CheckCircle, Star, MessageSquare, ShieldCheck, ArrowRight, Globe, HelpCircle } from 'lucide-react';

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
    faqs: Array<{ question: string; answer: string }>;
    nepali_content: { hero_title: string; tagline: string; about_snippet: string };
  };
}

export function ServicesTemplate({ business, copy }: TemplateProps) {
  const [lang, setLang] = useState<'en' | 'np'>('en');
  const heroImage = business.photos?.[0] || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80';
  const whatsappUrl = `https://wa.me/977${(business.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(business.name)},%20I%20would%20like%20to%20consult%20regarding%20your%20services!`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white">{business.name}</span>
              <span className="block text-[10px] text-blue-400 uppercase tracking-widest font-semibold">{business.district} Verified Practice</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setLang(l => l === 'en' ? 'np' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
            </button>
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{business.phone}</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? copy.tagline : copy.nepali_content.tagline}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            {lang === 'en' ? copy.hero_title : copy.nepali_content.hero_title}
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
            {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consult on WhatsApp</span>
            </a>
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="px-6 py-3.5 rounded-xl font-semibold border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call Directly</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-white text-sm">{business.rating || 4.6}</span>
              <span className="text-slate-400 font-normal">({business.reviews_count || 40}+ Reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>{business.address}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <img
              src={heroImage}
              alt={business.name}
              className="w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 bg-slate-950/60 border-y border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Core Services</span>
            <h2 className="text-3xl font-extrabold text-white">Transparent & Dedicated Assistance</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {copy.signature_offerings.map((item, idx) => (
              <div key={idx} className="p-7 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-base">{item.title}</h3>
                  {item.price_npr && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {item.price_npr}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Trust */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-white">Serving {business.district} with High Standards</h2>
        <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
          {copy.about_story}
        </p>
      </section>

      {/* FAQs */}
      {copy.faqs && copy.faqs.length > 0 && (
        <section className="py-16 px-6 bg-slate-950/40 border-t border-slate-800">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {copy.faqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <p className="font-semibold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-400" />
                    <span>{faq.question}</span>
                  </p>
                  <p className="text-sm text-slate-400 pl-6 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {business.name}. {business.address}.</p>
      </footer>
    </div>
  );
}
