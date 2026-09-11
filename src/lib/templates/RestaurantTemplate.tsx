'use client';

import React, { useState, useRef } from 'react';
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
  Check,
  Navigation,
  Sparkles,
  ShieldCheck,
  UtensilsCrossed
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

// Apple / Linear Style Spotlight Card with mouse-following hairline illumination
function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#161617]/90 transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 -z-0"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function RestaurantTemplate({ business, copy, previewMode = false }: TemplateProps) {
  const [lang, setLang] = useState<'en' | 'np'>('en');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedTime, setSelectedTime] = useState<string>('19:00');

  const heroImage =
    business.photos?.[0] ||
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85';

  const cleanPhone = (business.phone || '').replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.length >= 7 ? `977${cleanPhone}` : '9779800000000';

  const baseWhatsAppUrl = `https://wa.me/${targetPhone}?text=`;
  const reservationUrl = `${baseWhatsAppUrl}${encodeURIComponent(
    `Hello ${business.name}! I would like to reserve a table for ${guestCount} guests at ${selectedTime}.`
  )}`;

  const mapQuery = encodeURIComponent(`${business.name} ${business.address} Kathmandu Nepal`);
  const googleMapEmbedUrl = `https://maps.google.com/maps?width=100%25&height=500&hl=en&q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=B&output=embed`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  const tabs = ['All', 'Chef Specials', 'Traditional Plates', 'Brews & Beverages'];

  return (
    <div className="min-h-screen bg-black text-[#F5F5F7] font-sans selection:bg-[#0071E3] selection:text-white relative">
      
      {/* Apple-style Frosted Nav */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 bg-black/70 backdrop-blur-2xl border-b border-white/[0.08] px-6 lg:px-12 py-3.5 transition-all"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg tracking-tight text-white">
              {business.name}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-[#86868B]">
              {business.district} · Kathmandu
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <button
              onClick={() => setLang(l => (l === 'en' ? 'np' : 'en'))}
              className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-stone-200 transition-colors"
            >
              {lang === 'en' ? 'नेपाली' : 'English'}
            </button>

            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#86868B] hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{business.phone}</span>
              </a>
            )}

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={reservationUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm bg-white text-black hover:bg-[#F5F5F7] transition-all shadow-md"
            >
              Book Table
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section — Apple Keynote Scale */}
      <section className="relative pt-16 sm:pt-24 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="space-y-6 max-w-4xl">
          
          {/* Dynamic Island Style Status Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161617] border border-white/10 text-xs text-[#86868B] shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-stone-300 font-medium">{business.district}</span>
            <span className="text-stone-600">|</span>
            <span>4+ ★ Google Verified</span>
          </motion.div>

          {/* Big Confident Apple Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.035em] text-white leading-[1.04]"
          >
            {lang === 'en' ? (
              <>
                Pure flavor. <br />
                <span className="apple-text-gradient">Handcrafted for Kathmandu.</span>
              </>
            ) : (
              <>
                विशिष्ट स्वाद। <br />
                <span className="apple-text-gradient">काठमाडौँको आत्मीय आतिथ्य।</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-lg sm:text-xl text-[#86868B] max-w-2xl font-normal leading-relaxed tracking-tight"
          >
            {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
          </motion.p>

          {/* Pill CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={reservationUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full font-medium text-sm bg-[#0071E3] hover:bg-[#0077ED] text-white flex items-center gap-2 shadow-lg shadow-[#0071E3]/25 transition-colors"
            >
              <span>Reserve Table on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#menu"
              className="px-6 py-3.5 rounded-full font-medium text-sm bg-[#161617] hover:bg-[#202022] border border-white/10 text-white transition-colors"
            >
              Explore Menu
            </motion.a>

            <a
              href="#location"
              className="px-4 py-3.5 text-xs text-[#86868B] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Map & Directions</span>
            </a>
          </motion.div>
        </div>

        {/* Hero Cinematic Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-14 rounded-[32px] overflow-hidden border border-white/[0.08] bg-[#161617] p-2 sm:p-3 shadow-2xl relative"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-[24px] overflow-hidden">
            <img
              src={heroImage}
              alt={business.name}
              className="w-full h-full object-cover contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#86868B]">Neighborhood Table</p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">{business.name}</h3>
                <p className="text-xs text-stone-300 mt-0.5">{business.address}</p>
              </div>

              <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-full text-xs text-white">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{business.rating || 4.5}</span>
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-300">{business.reviews_count || 120}+ Reviews</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Menu Showcase with Apple-style Fluid Tabs */}
      <section id="menu" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider">The Menu</p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              Signature Offerings.
            </h2>
            <p className="text-[#86868B] text-sm sm:text-base">
              Crafted fresh daily with authentic local spices and farm-fresh ingredients.
            </p>
          </div>

          {/* Fluid Sliding Tab Bar */}
          <div className="flex items-center bg-[#161617] p-1.5 rounded-full border border-white/[0.08] overflow-x-auto scrollbar-none self-start md:self-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                  activeTab === tab ? 'text-black' : 'text-[#86868B] hover:text-white'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-white rounded-full"
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid with Spotlight Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {copy.signature_offerings.map((item, idx) => (
            <SpotlightCard key={idx} className="p-8 flex flex-col justify-between h-full group">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-[#0071E3] transition-colors">
                    {item.title}
                  </h3>
                  {item.price_npr && (
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white shrink-0">
                      {item.price_npr}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#86868B] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-stone-500 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Chef Recipe
                </span>

                <motion.a
                  whileHover={{ x: 2 }}
                  href={`${baseWhatsAppUrl}${encodeURIComponent(
                    `Hello ${business.name}! I would like to order: ${item.title} (${item.price_npr || ''}).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-[#0071E3] hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Order on WhatsApp</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Interactive Google Maps & Directions */}
      <section id="location" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider">Location</p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              Directions & Map.
            </h2>
            <p className="text-[#86868B] text-sm">
              {business.address} · Open daily 10:00 — 22:00
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Compass className="w-4 h-4 text-[#0071E3]" />
            <span>Open Navigation</span>
          </motion.a>
        </div>

        <div className="rounded-[32px] overflow-hidden border border-white/[0.08] bg-[#161617] grid lg:grid-cols-12 shadow-2xl">
          {/* Map Frame */}
          <div className="lg:col-span-8 min-h-[460px] w-full">
            <iframe
              title={`Map - ${business.name}`}
              src={googleMapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '460px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between space-y-8 border-t lg:border-t-0 lg:border-l border-white/[0.08]">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] block">
                  Location
                </span>
                <p className="text-lg font-semibold text-white mt-1">{business.address}</p>
                <span className="text-xs text-[#86868B]">{business.district}, Kathmandu Valley</span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] block">
                  Service Hours
                </span>
                <p className="text-xs text-stone-200 mt-1">Sun — Fri: 10:00 — 22:00</p>
                <p className="text-xs text-stone-200">Saturday: 09:00 — 22:30</p>
              </div>

              {business.phone && (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] block">
                    Telephone
                  </span>
                  <a href={`tel:${business.phone}`} className="text-sm font-mono text-white hover:text-[#0071E3] transition-colors">
                    {business.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-6 border-t border-white/[0.08]">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full text-xs font-semibold bg-[#0071E3] hover:bg-[#0077ED] text-white flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Turn-by-Turn Directions</span>
              </motion.a>

              <a
                href={reservationUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-full text-xs font-medium border border-white/10 hover:border-white/20 text-[#86868B] hover:text-white flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with Staff</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Table Reservation Experience */}
      <section className="py-20 px-6 lg:px-12 max-w-4xl mx-auto">
        <SpotlightCard className="p-8 sm:p-12 space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider">Reservations</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Reserve Your Table.
            </h2>
            <p className="text-[#86868B] text-sm">
              Zero booking charges. Instant WhatsApp confirmation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs text-[#86868B] font-medium block">Party Size</label>
              <div className="flex items-center gap-3">
                {[1, 2, 4, 6, 8].map(count => (
                  <button
                    key={count}
                    onClick={() => setGuestCount(count)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                      guestCount === count
                        ? 'border-[#0071E3] bg-[#0071E3]/20 text-white'
                        : 'border-white/10 text-[#86868B] hover:border-white/20'
                    }`}
                  >
                    {count} {count === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#86868B] font-medium block">Preferred Time</label>
              <div className="grid grid-cols-2 gap-2">
                {['Lunch (13:00)', 'Evening (18:30)', 'Dinner (20:00)', 'Late Dining'].map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-all ${
                      selectedTime === time
                        ? 'border-[#0071E3] bg-[#0071E3]/20 text-white'
                        : 'border-white/10 text-[#86868B] hover:border-white/20'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={reservationUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 rounded-full font-medium text-sm bg-white text-black hover:bg-[#F5F5F7] flex items-center justify-center gap-2 transition-colors"
          >
            <span>Confirm Booking on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </SpotlightCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 px-6 lg:px-12 text-center text-xs text-[#86868B] space-y-2">
        <p className="text-white font-medium">{business.name}</p>
        <p>{business.address}</p>
        <p className="text-stone-600 text-[11px] pt-4">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
