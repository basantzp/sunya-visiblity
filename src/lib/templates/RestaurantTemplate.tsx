'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  MessageSquare,
  Globe,
  ArrowUpRight,
  ChevronRight,
  Compass,
  Calendar,
  Users,
  Check
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
    location?: { lat: number; lng: number };
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
  const [partySize, setPartySize] = useState<string>('2 Guests');
  const [seatingTime, setSeatingTime] = useState<string>('Dinner (19:00)');

  const heroImage =
    business.photos?.[0] ||
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85';

  const cleanPhone = (business.phone || '').replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.length >= 7 ? `977${cleanPhone}` : '9779800000000';

  const baseWhatsAppUrl = `https://wa.me/${targetPhone}?text=`;
  const reservationUrl = `${baseWhatsAppUrl}${encodeURIComponent(
    `Namaste ${business.name}! I would like to inquire about reserving a table for ${partySize} for ${seatingTime}.`
  )}`;

  const mapQuery = encodeURIComponent(`${business.name} ${business.address} Kathmandu`);
  const googleMapEmbedUrl = `https://maps.google.com/maps?width=100%25&height=480&hl=en&q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=B&output=embed`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#F7F4EE] font-sans antialiased selection:bg-[#C5A059] selection:text-black">
      
      {/* Editorial Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0C0A09]/90 backdrop-blur-md hairline-b px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-2xl tracking-tight text-white font-normal">
              {business.name}
            </span>
            <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase font-mono text-[#A8A29E]">
              {business.district} · Kathmandu Valley
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-6 text-xs tracking-wider uppercase text-stone-400 font-medium">
              <a href="#about" className="hover:text-white transition-colors">Heritage</a>
              <a href="#menu" className="hover:text-white transition-colors">Menu</a>
              <a href="#location" className="hover:text-white transition-colors">Location</a>
            </div>

            <button
              onClick={() => setLang(l => (l === 'en' ? 'np' : 'en'))}
              className="text-xs px-2.5 py-1 border border-stone-800 rounded text-stone-300 hover:border-stone-600 transition-colors font-mono"
            >
              {lang === 'en' ? 'नेपाली' : 'English'}
            </button>

            <a
              href={reservationUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase bg-[#F7F4EE] text-[#0C0A09] hover:bg-[#C5A059] transition-colors"
            >
              Reserve Table
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-16 lg:pt-24 pb-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <p className="text-[11px] tracking-[0.25em] uppercase font-mono text-[#C5A059]">
                EST. IN {business.district.toUpperCase()} · 4+ STAR RATED
              </p>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.05]">
                {lang === 'en' ? (
                  <>
                    Refined dining & timeless hospitality at{' '}
                    <span className="italic block mt-1 font-normal text-[#F7F4EE]">{business.name}</span>
                  </>
                ) : (
                  <>
                    <span className="italic">{business.name}</span>
                    <span className="block mt-1 font-light">मौलिक स्वाद र आत्मीय सत्कार</span>
                  </>
                )}
              </h1>
            </div>

            <p className="text-stone-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={reservationUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded text-xs font-semibold tracking-widest uppercase bg-[#F7F4EE] text-[#0C0A09] hover:bg-[#C5A059] transition-all inline-flex items-center gap-2"
              >
                <span>Reserve a Table</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#menu"
                className="px-6 py-3.5 rounded text-xs font-semibold tracking-widest uppercase border border-stone-800 text-stone-300 hover:border-stone-600 hover:text-white transition-all"
              >
                View Menu
              </a>

              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="px-5 py-3.5 text-xs font-mono text-stone-400 hover:text-white transition-colors"
                >
                  {business.phone}
                </a>
              )}
            </div>

            {/* Subtle Editorial Metrics */}
            <div className="pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="flex items-center gap-1.5 font-serif text-2xl font-light text-white">
                  <span>{business.rating || 4.5}</span>
                  <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                </div>
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mt-0.5">
                  Google Verified
                </span>
              </div>

              <div>
                <div className="font-serif text-2xl font-light text-white">
                  {business.reviews_count || 120}+
                </div>
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mt-0.5">
                  Valley Patrons
                </span>
              </div>

              <div>
                <div className="font-serif text-2xl font-light text-emerald-400">
                  Daily
                </div>
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mt-0.5">
                  10:00 — 22:00
                </span>
              </div>
            </div>
          </div>

          {/* Right Editorial Image Frame */}
          <div className="lg:col-span-5">
            <div className="relative border border-stone-800/80 rounded-sm overflow-hidden bg-[#141210] p-3 shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <img
                  src={heroImage}
                  alt={business.name}
                  className="w-full h-full object-cover grayscale-[15%] contrast-[1.05] hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/90 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0C0A09]/95 backdrop-blur border border-stone-800 rounded-sm">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#C5A059] block">
                    Neighborhood Destination
                  </span>
                  <p className="font-serif text-base text-white mt-1">
                    {business.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Culinary Heritage & Philosophy */}
      <section id="about" className="hairline-t hairline-b py-24 px-6 lg:px-12 bg-[#100E0C]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059]">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Rooted in the flavors of the Valley.
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6 text-stone-300 text-base leading-relaxed font-light">
            <p>
              {copy.about_story}
            </p>
            <div className="pt-4 border-t border-stone-800/60 flex items-center justify-between text-xs font-mono text-stone-400">
              <span>{business.district}, Kathmandu</span>
              <span>Fresh Local Sourcing Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Menu — Minimalist Fine Dining Presentation */}
      <section id="menu" className="py-24 px-6 lg:px-12 max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059]">
            The Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            Curated Signature Plates
          </h2>
          <p className="text-stone-400 text-sm font-light">
            Prepared to order using traditional methods and fresh local spices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {copy.signature_offerings.map((item, idx) => (
            <div key={idx} className="space-y-2 pb-6 border-b border-stone-900 group">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-xl font-normal text-white group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h3>
                <div className="menu-leader hidden sm:block" />
                {item.price_npr && (
                  <span className="font-mono text-sm text-[#C5A059] font-medium shrink-0 ml-2">
                    {item.price_npr}
                  </span>
                )}
              </div>
              <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <a
            href={reservationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A059] hover:text-white transition-colors"
          >
            <span>Inquire for full daily seasonal menu & specials</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Location & Embedded Google Map */}
      <section id="location" className="hairline-t py-24 px-6 lg:px-12 bg-[#100E0C]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059]">
                Neighborhood Map
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                Find {business.name}
              </h2>
              <p className="text-stone-400 text-sm font-light">
                {business.address}
              </p>
            </div>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded text-xs font-semibold tracking-wider uppercase border border-stone-700 hover:border-[#C5A059] text-stone-200 hover:text-white transition-all inline-flex items-center gap-2 self-start md:self-auto"
            >
              <Compass className="w-4 h-4 text-[#C5A059]" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="grid lg:grid-cols-12 border border-stone-800 bg-[#0C0A09] rounded-sm overflow-hidden">
            {/* Embedded Google Map Frame */}
            <div className="lg:col-span-8 min-h-[420px] w-full">
              <iframe
                title={`Location - ${business.name}`}
                src={googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '420px', filter: 'grayscale(30%) contrast(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Side Coordinates Panel */}
            <div className="lg:col-span-4 p-8 flex flex-col justify-between space-y-8 border-t lg:border-t-0 lg:border-l border-stone-800">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#C5A059] block">
                    Address
                  </span>
                  <p className="font-serif text-lg text-white mt-1">{business.address}</p>
                  <span className="text-xs text-stone-400 block mt-0.5">{business.district}, Kathmandu Valley</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#C5A059] block">
                    Hours of Service
                  </span>
                  <p className="text-xs text-stone-300 mt-1">Sunday — Friday: 10:00 — 22:00</p>
                  <p className="text-xs text-stone-300">Saturday: 09:00 — 22:30</p>
                </div>

                {business.phone && (
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#C5A059] block">
                      Direct Contact
                    </span>
                    <a href={`tel:${business.phone}`} className="font-mono text-sm text-stone-200 hover:text-white transition-colors">
                      {business.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-stone-800/80 space-y-3">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded text-xs font-semibold tracking-wider uppercase bg-[#F7F4EE] text-[#0C0A09] hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>

                <a
                  href={reservationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded text-xs font-mono uppercase border border-stone-800 hover:border-stone-600 text-stone-300 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reserve on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Table Reservation Experience */}
      <section className="hairline-t py-24 px-6 lg:px-12 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059]">
            Private Bookings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
            Table & Gathering Reservations
          </h2>
          <p className="text-stone-400 text-sm font-light">
            Direct coordination with our team for gatherings, dinners, or family celebrations.
          </p>
        </div>

        <div className="border border-stone-800 bg-[#12100E] p-8 sm:p-10 rounded-sm space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                Party Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['2 Guests', '4 Guests', '6+ Guests'].map(size => (
                  <button
                    key={size}
                    onClick={() => setPartySize(size)}
                    className={`py-2 px-3 text-xs font-mono rounded border transition-colors ${
                      partySize === size
                        ? 'border-[#C5A059] bg-[#C5A059]/10 text-white font-medium'
                        : 'border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                Preferred Seating
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Lunch (13:00)', 'Evening (18:30)', 'Dinner (20:00)', 'Late Dinner'].map(time => (
                  <button
                    key={time}
                    onClick={() => setSeatingTime(time)}
                    className={`py-2 px-3 text-xs font-mono rounded border transition-colors text-left ${
                      seatingTime === time
                        ? 'border-[#C5A059] bg-[#C5A059]/10 text-white font-medium'
                        : 'border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <a
            href={reservationUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 rounded text-xs font-semibold tracking-widest uppercase bg-[#F7F4EE] text-[#0C0A09] hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 mt-4"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Confirm Reservation via WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Patron Acclaim */}
      <section className="hairline-t py-20 px-6 lg:px-12 bg-[#100E0C]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059]">
              Patron Reviews
            </span>
            <h2 className="font-serif text-3xl font-light text-white">
              Acclaim from the Valley
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {copy.review_themes.map((theme, i) => (
              <div key={i} className="border border-stone-800/80 bg-[#0C0A09] p-8 space-y-4 rounded-sm">
                <div className="flex items-center gap-1 text-[#C5A059]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#C5A059]" />
                  ))}
                </div>
                <p className="font-serif text-base sm:text-lg text-stone-200 italic font-light leading-relaxed">
                  "{theme.original_testimonial_summary}"
                </p>
                <div className="pt-3 border-t border-stone-900 flex items-center justify-between text-xs font-mono text-stone-500">
                  <span>Verified Guest</span>
                  <span>{theme.customer_archetype}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="hairline-t py-12 px-6 lg:px-12 text-center text-xs font-mono text-stone-500 space-y-4 bg-[#0C0A09]">
        <div className="font-serif text-lg text-white font-normal">{business.name}</div>
        <p className="text-[11px] text-stone-400">{business.address}</p>
        <p className="text-[10px] tracking-wider uppercase text-stone-600">
          © {new Date().getFullYear()} {business.name} · All rights reserved.
        </p>
      </footer>

    </div>
  );
}
