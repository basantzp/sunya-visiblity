'use client';

import React, { useState } from 'react';
import { Phone, MapPin, Clock, Star, MessageSquare, Sparkles, Heart, ShieldCheck, ChevronRight, Globe, Calendar } from 'lucide-react';

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
    primary_color: string;
    accent_color: string;
    signature_offerings: Array<{ title: string; description: string; price_npr?: string }>;
    review_themes: Array<{ sentiment: string; original_testimonial_summary: string; customer_archetype: string }>;
    faqs: Array<{ question: string; answer: string }>;
    nepali_content: { hero_title: string; tagline: string; about_snippet: string };
  };
  previewMode?: boolean;
}

export function WellnessTemplate({ business, copy }: TemplateProps) {
  const [lang, setLang] = useState<'en' | 'np'>('en');
  const heroImage = business.photos?.[0] || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80';
  const whatsappUrl = `https://wa.me/977${(business.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(business.name)},%20I%20would%20like%20to%20book%20an%20appointment!`;

  return (
    <div className="min-h-screen bg-emerald-950/20 text-slate-800 font-sans selection:bg-emerald-600 selection:text-white bg-gradient-to-b from-stone-50 via-emerald-50/30 to-stone-100">
      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-emerald-900/10 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900">{business.name}</span>
              <span className="block text-[11px] text-emerald-700 font-medium uppercase tracking-wider">{business.district} Sanctuary</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(l => l === 'en' ? 'np' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-800 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
            </button>

            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Center</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'en' ? copy.tagline : copy.nepali_content.tagline}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.15]">
              {lang === 'en' ? copy.hero_title : copy.nepali_content.hero_title}
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-2 shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </a>

              <a
                href="#treatments"
                className="px-6 py-3.5 rounded-xl font-semibold border border-emerald-200 bg-white hover:bg-emerald-50 text-slate-800 transition-colors flex items-center gap-2"
              >
                <span>View Treatments</span>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-slate-500 border-t border-emerald-900/10">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-slate-900 text-sm">{business.rating || 4.8}</span>
                <span className="text-slate-500 font-normal">({business.reviews_count || 45}+ Verified Reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>{business.district}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={heroImage}
                alt={business.name}
                className="w-full h-[460px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section id="treatments" className="py-20 px-4 lg:px-8 bg-white/70 border-y border-emerald-900/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Signature Rituals</span>
            <h2 className="text-3xl font-bold text-slate-900">Curated Care & Therapies</h2>
            <p className="text-sm text-slate-500">
              Each session utilizes authentic, natural formulations designed for long-lasting rejuvenation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {copy.signature_offerings.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-base">{item.title}</h3>
                  {item.price_npr && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.price_npr}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Story */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto bg-emerald-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Dedicated Practice</span>
            <h2 className="text-3xl font-bold">Mindful Care in {business.district}</h2>
          </div>
          <p className="text-emerald-100 text-base leading-relaxed relative z-10">
            {copy.about_story}
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-200 relative z-10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Certified Therapists & Hygienic Standards Guaranteed</span>
          </div>
        </div>
      </section>

      {/* Review Summaries */}
      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900">What Valley Visitors Appreciate</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {copy.review_themes.map((theme, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {theme.sentiment}
                  </span>
                  <span className="text-slate-400">{theme.customer_archetype}</span>
                </div>
                <p className="text-slate-700 text-sm italic">"{theme.original_testimonial_summary}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-emerald-100 text-center text-sm text-slate-500 bg-white">
        <div className="max-w-xl mx-auto space-y-4">
          <p className="font-bold text-slate-800">{business.name}</p>
          <p>{business.address}</p>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
