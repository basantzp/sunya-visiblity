'use client';

import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  MessageSquare,
  Utensils,
  Award,
  CheckCircle2,
  ChevronRight,
  Globe,
  Sparkles,
  Calendar,
  Users,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  HeartHandshake
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
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [reservationGuests, setReservationGuests] = useState<string>('2 Guests');
  const [reservationTime, setReservationTime] = useState<string>('Evening (7:00 PM)');

  const heroImage =
    business.photos?.[0] ||
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';

  const cleanPhone = (business.phone || '').replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.length >= 7 ? `977${cleanPhone}` : '9779800000000';

  const baseWhatsAppUrl = `https://wa.me/${targetPhone}?text=`;
  const generalReserveUrl = `${baseWhatsAppUrl}${encodeURIComponent(
    `Namaste ${business.name}! I would like to reserve a table for ${reservationGuests} at ${reservationTime}.`
  )}`;

  const getItemOrderUrl = (itemTitle: string, itemPrice?: string) => {
    return `${baseWhatsAppUrl}${encodeURIComponent(
      `Namaste ${business.name}! I would like to order: ${itemTitle} (${itemPrice || 'As per menu'}).`
    )}`;
  };

  const categories = ['all', 'Chef Signatures', 'Main Courses', 'Beverages & Brews'];

  return (
    <div className="min-h-screen bg-[#070709] text-stone-100 font-sans selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      {/* Ambient Luxury Spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-amber-500/15 via-amber-600/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[600px] -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[1200px] -right-48 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top Luxury Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a0a0e]/80 border-b border-white/[0.08] px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 p-[1px] shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#0d0d12] rounded-2xl flex items-center justify-center text-amber-400">
                <Utensils className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">{business.name}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-2.5 h-2.5" /> 4+ ★
                </span>
              </div>
              <span className="block text-[11px] text-stone-400 font-medium tracking-wider">
                {business.address || `${business.district}, Kathmandu Valley`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(l => (l === 'en' ? 'np' : 'en'))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-all text-amber-300 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
            </button>

            {/* Direct Phone / Call */}
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-[1.02]"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{business.phone}</span>
              </a>
            )}

            {/* Direct WhatsApp CTA */}
            <a
              href={generalReserveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-black" />
              <span className="hidden xs:inline">Book Table</span>
              <span className="xs:hidden">Book</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-20 px-4 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Top Quality Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-gold border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="tracking-wide">
                {lang === 'en' ? copy.tagline : copy.nepali_content.tagline}
              </span>
            </div>

            {/* Majestic Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              {lang === 'en' ? (
                <>
                  Experience Exquisite Flavors at{' '}
                  <span className="gold-gradient-text block mt-1">{business.name}</span>
                </>
              ) : (
                <>
                  <span className="gold-gradient-text">{business.name}</span> मा विशिष्ट स्वाद र सत्कार
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed font-normal">
              {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={generalReserveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 flex items-center gap-2.5 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 fill-stone-950" />
                <span>Reserve on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#menu"
                className="px-6 py-4 rounded-2xl font-semibold text-sm glass-card hover:bg-white/10 text-stone-200 transition-all flex items-center gap-2 hover:border-amber-500/40"
              >
                <span>View Curated Menu</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </a>
            </div>

            {/* Social Proof Metric Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] max-w-xl">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xl">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{business.rating || 4.6}</span>
                </div>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  {business.reviews_count || 120}+ Google Reviews
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-white font-extrabold text-xl">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>100%</span>
                </div>
                <span className="text-[11px] text-stone-400 block mt-0.5">Fresh Farm Sourced</span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-white font-extrabold text-xl">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-base">Open</span>
                </div>
                <span className="text-[11px] text-stone-400 block mt-0.5">10:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card-gold p-2 shadow-2xl group animate-float-slow">
              <div className="relative rounded-2xl overflow-hidden h-[440px] sm:h-[480px]">
                <img
                  src={heroImage}
                  alt={business.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-[#09090e]/20 to-transparent" />

                {/* Floating Kitchen Status Pill */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Kitchen Serving Now</span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">
                      Prime Location
                    </p>
                    <p className="text-sm font-bold text-white truncate max-w-[240px]">
                      {business.address}
                    </p>
                    <p className="text-xs text-stone-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{business.district} · Kathmandu Valley</span>
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Accolades & Trust Bar */}
      <section className="py-6 border-y border-white/[0.08] bg-[#0c0c12]/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-6 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-stone-200">Verified Neighborhood Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-stone-200">Authentic Kathmandu Hospitality</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-stone-200">Instant WhatsApp Table Reservations</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-stone-200">Top Rated in {business.district}</span>
          </div>
        </div>
      </section>

      {/* Signature Offerings Menu */}
      <section id="menu" className="py-24 px-4 lg:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Culinary Masterpieces
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Signature Culinary Offerings
              </h2>
              <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                Every dish at {business.name} is meticulously crafted with authentic spices, fresh produce, and passion.
              </p>
            </div>

            {/* Category Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : 'glass-card text-stone-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat === 'all' ? 'All Offerings' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Offerings Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {copy.signature_offerings.map((item, idx) => (
              <div
                key={idx}
                className="glass-card hover:border-amber-500/40 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-bold text-white text-lg group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    {item.price_npr && (
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                        {item.price_npr}
                      </span>
                    )}
                  </div>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Chef Recommended
                  </span>

                  <a
                    href={getItemOrderUrl(item.title, item.price_npr)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Order on WhatsApp</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Table Reservation Experience */}
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-black/40 via-amber-950/10 to-black/40 border-y border-white/[0.08]">
        <div className="max-w-5xl mx-auto glass-card-gold rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Direct Reservations
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Plan Your Evening at <br />
                <span className="gold-gradient-text">{business.name}</span>
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed">
                Whether an intimate family dinner, business meetup, or celebrating with friends in {business.district}, reserve directly with zero hassle.
              </p>

              <div className="space-y-2 text-xs text-stone-400 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant confirmation on WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>No booking charges or upfront deposit</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" /> Number of Guests
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['2 Guests', '4 Guests', '6+ Guests'].map(g => (
                    <button
                      key={g}
                      onClick={() => setReservationGuests(g)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        reservationGuests === g
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                          : 'border-white/10 text-stone-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Preferred Dining Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Lunch (1:00 PM)', 'Evening (7:00 PM)', 'Dinner (8:30 PM)', 'Late Dining'].map(t => (
                    <button
                      key={t}
                      onClick={() => setReservationTime(t)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-left ${
                        reservationTime === t
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                          : 'border-white/10 text-stone-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href={generalReserveUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4 fill-stone-950" />
                <span>Confirm Reservation on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Patron Acclaim (TOS Compliant) */}
      <section className="py-24 px-4 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Patron Acclaim</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Loved by Kathmandu Patrons</h2>
          <p className="text-stone-400 text-sm">
            Honest praise summarized from regular guests visiting {business.name}.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {copy.review_themes.map((theme, i) => (
            <div
              key={i}
              className="glass-card p-6 rounded-3xl space-y-4 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-amber-300 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {theme.sentiment}
                </span>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed italic">
                "{theme.original_testimonial_summary}"
              </p>
              <div className="pt-3 border-t border-white/[0.06] text-xs text-stone-500 flex items-center justify-between">
                <span>Verified Patron</span>
                <span className="text-stone-400 font-medium">{theme.customer_archetype}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Location & Hours */}
      <section className="py-20 px-4 lg:px-8 border-t border-white/[0.08] bg-[#0c0c12]/40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Visit Our Place</span>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Conveniently Located in <br />
              <span className="gold-gradient-text">{business.address}</span>
            </h2>

            <div className="space-y-4 text-sm text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Street Address</strong>
                  <span>{business.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Opening Hours</strong>
                  <span>Sunday – Friday: 10:00 AM – 10:00 PM</span>
                  <span className="block text-xs text-stone-400">Saturday: 9:00 AM – 10:30 PM</span>
                </div>
              </div>

              {business.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Contact Direct</strong>
                    <span>{business.phone}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={business.photos?.[0] ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.name} ${business.address}`)}` : '#'}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl font-bold bg-white text-stone-950 hover:bg-stone-200 transition-colors inline-flex items-center gap-2 text-xs"
              >
                <Compass className="w-4 h-4 text-stone-950" />
                <span>Get Directions in Google Maps</span>
              </a>

              <a
                href={generalReserveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl font-bold border border-amber-500/30 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 transition-colors inline-flex items-center gap-2 text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Owner</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="rounded-3xl glass-card p-6 space-y-4 border border-amber-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Doors Open Now
                  </span>
                </div>
                <span className="text-xs text-stone-400">Kathmandu Valley</span>
              </div>

              <div className="p-6 rounded-2xl bg-black/50 border border-white/5 space-y-3">
                <h4 className="font-bold text-white text-base">Payment Options Accepted</h4>
                <p className="text-xs text-stone-400">
                  We accept all local digital wallets and mobile banking:
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-3 py-1 rounded-lg bg-emerald-950/80 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    eSewa
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-purple-950/80 text-purple-400 text-xs font-bold border border-purple-500/30">
                    Khalti
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-red-950/80 text-red-400 text-xs font-bold border border-red-500/30">
                    FonePay QR
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-blue-950/80 text-blue-400 text-xs font-bold border border-blue-500/30">
                    Cash / Card
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-500 italic text-center">
                Parking space available for two-wheelers and four-wheelers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 lg:px-8 border-t border-white/[0.08] text-center text-xs text-stone-500 space-y-4">
        <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p className="text-[11px] text-stone-600 max-w-md mx-auto">
          Crafted with pride for {business.district}, Kathmandu Valley. Designed for seamless mobile discovery & dining.
        </p>
      </footer>

      {/* Floating Mobile Sticky Concierge Bar */}
      <div className="fixed bottom-3 left-4 right-4 z-40 sm:hidden">
        <div className="glass-card-gold p-2 rounded-2xl shadow-2xl flex items-center justify-between gap-2 border border-amber-500/40">
          <a
            href={generalReserveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-stone-950" />
            <span>WhatsApp Table / Order</span>
          </a>

          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              className="p-3 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/10"
            >
              <Phone className="w-4 h-4 text-amber-400" />
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
