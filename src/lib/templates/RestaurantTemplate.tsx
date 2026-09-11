'use client';

import React, { useState } from 'react';
import { Phone, MapPin, Clock, Star, MessageSquare, Utensils, Award, CheckCircle2, ChevronRight, Globe } from 'lucide-react';

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

export function RestaurantTemplate({ business, copy, previewMode = false }: TemplateProps) {
  const [lang, setLang] = useState<'en' | 'np'>('en');
  const [activeTab, setActiveTab] = useState<'all' | 'specials'>('all');

  const heroImage = business.photos?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';
  const whatsappUrl = `https://wa.me/977${(business.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(business.name)},%20I%20would%20like%20to%20reserve%20a%20table!`;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Banner & Lang Switcher */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-950/80 border-b border-stone-800/80 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white">{business.name}</span>
              <span className="block text-[11px] text-stone-400 uppercase tracking-widest">{business.district} · Kathmandu Valley</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(l => l === 'en' ? 'np' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-stone-700 bg-stone-900 hover:bg-stone-800 transition-colors text-amber-300"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
            </button>

            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? copy.tagline : copy.nepali_content.tagline}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {lang === 'en' ? copy.hero_title : copy.nepali_content.hero_title}
            </h1>

            <p className="text-lg text-stone-300 max-w-xl leading-relaxed">
              {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Reserve on WhatsApp</span>
              </a>

              <a
                href="#menu"
                className="px-6 py-3.5 rounded-xl font-semibold border border-stone-700 bg-stone-900/60 hover:bg-stone-800 text-stone-200 transition-colors flex items-center gap-2"
              >
                <span>View Menu</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>
            </div>

            {/* Social Proof Bar */}
            <div className="flex items-center gap-6 pt-4 text-xs text-stone-400 border-t border-stone-800/60">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-white text-sm">{business.rating || 4.5}</span>
                <span className="text-stone-400 font-normal">({business.reviews_count || 50}+ Kathmandu Valley reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{business.district}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl group">
              <img
                src={heroImage}
                alt={business.name}
                className="w-full h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-700/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Authentic Neighborhood Spot</p>
                  <p className="text-sm font-bold text-white mt-0.5">{business.address}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Offerings Menu */}
      <section id="menu" className="py-16 px-4 lg:px-8 bg-stone-900/40 border-y border-stone-800">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Handcrafted Daily</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Signature Offerings</h2>
            <p className="text-sm text-stone-400">
              Prepared using handpicked spices and traditional cooking methods right here in {business.district}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {copy.signature_offerings.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-all group hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors text-lg">{item.title}</h3>
                  {item.price_npr && (
                    <span className="text-sm font-extrabold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {item.price_npr}
                    </span>
                  )}
                </div>
                <p className="text-stone-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Heritage */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Our Roots</span>
            <h2 className="text-3xl font-extrabold text-white leading-tight">Grounded in {business.district}</h2>
            <p className="text-xs text-stone-400 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Open Sunday — Friday</span>
            </p>
          </div>
          <div className="md:col-span-7 border-l border-stone-800 pl-6 md:pl-8">
            <p className="text-stone-300 text-base leading-relaxed whitespace-pre-line">
              {copy.about_story}
            </p>
          </div>
        </div>
      </section>

      {/* Google TOS-Compliant Patron Praise Summaries */}
      <section className="py-16 px-4 lg:px-8 bg-stone-900/30 border-t border-stone-800">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Patron Feedback</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">What the Valley Loves About Us</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {copy.review_themes.map((theme, i) => (
              <div key={i} className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {theme.sentiment}
                  </span>
                  <span className="text-stone-500">{theme.customer_archetype}</span>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed italic">
                  "{theme.original_testimonial_summary}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Call to Action Footer */}
      <footer className="py-16 px-4 lg:px-8 bg-stone-950 border-t border-stone-800 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Visit {business.name} Today</h2>
          <p className="text-stone-400 text-sm">{business.address}</p>
          
          <div className="flex justify-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="px-6 py-3 rounded-xl font-semibold border border-stone-700 bg-stone-900 text-white hover:bg-stone-800 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {business.phone}</span>
              </a>
            )}
          </div>

          <p className="text-[11px] text-stone-600 pt-8 border-t border-stone-900">
            © {new Date().getFullYear()} {business.name} · Proudly serving {business.district}, Kathmandu Valley
          </p>
        </div>
      </footer>
    </div>
  );
}
