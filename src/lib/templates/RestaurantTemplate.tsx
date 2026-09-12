'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Compass,
  Globe,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  UtensilsCrossed,
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
    review_themes: Array<{
      sentiment: string;
      original_testimonial_summary: string;
      customer_archetype: string;
    }>;
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
        className="pointer-events-none absolute -inset-px -z-0 opacity-0 transition-opacity duration-300"
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
    `Hello ${business.name}! I would like to reserve a table for ${guestCount} guests at ${selectedTime}.`,
  )}`;

  const mapQuery = encodeURIComponent(`${business.name} ${business.address} Kathmandu Nepal`);
  const googleMapEmbedUrl = `https://maps.google.com/maps?width=100%25&height=500&hl=en&q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=B&output=embed`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  const tabs = ['All', 'Chef Specials', 'Traditional Plates', 'Brews & Beverages'];

  return (
    <div className="relative min-h-screen bg-black font-sans text-[#F5F5F7] selection:bg-[#0071E3] selection:text-white">
      {/* Apple-style Frosted Nav */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 border-b border-white/[0.08] bg-black/70 px-6 py-3.5 backdrop-blur-2xl transition-all lg:px-12"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-tight text-white">{business.name}</span>
            <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-[#86868B] sm:inline-flex">
              {business.district} · Kathmandu
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:gap-4">
            <button
              onClick={() => setLang((l) => (l === 'en' ? 'np' : 'en'))}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-stone-200 transition-colors hover:bg-white/10"
            >
              {lang === 'en' ? 'नेपाली' : 'English'}
            </button>

            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="hidden items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[#86868B] transition-colors hover:text-white md:inline-flex"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{business.phone}</span>
              </a>
            )}

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={reservationUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black shadow-md transition-all hover:bg-[#F5F5F7] sm:px-5 sm:text-sm"
            >
              Book Table
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section — Apple Keynote Scale */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pt-24 lg:px-12">
        <div className="max-w-4xl space-y-6">
          {/* Dynamic Island Style Status Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#161617] px-3.5 py-1.5 text-xs text-[#86868B] shadow-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-medium text-stone-300">{business.district}</span>
            <span className="text-stone-600">|</span>
            <span>4+ ★ Google Verified</span>
          </motion.div>

          {/* Big Confident Apple Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-7xl lg:text-8xl"
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
            className="max-w-2xl text-lg font-normal leading-relaxed tracking-tight text-[#86868B] sm:text-xl"
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
              className="flex items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#0071E3]/25 transition-colors hover:bg-[#0077ED]"
            >
              <span>Reserve Table on WhatsApp</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#menu"
              className="rounded-full border border-white/10 bg-[#161617] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#202022]"
            >
              Explore Menu
            </motion.a>

            <a
              href="#location"
              className="flex items-center gap-1.5 px-4 py-3.5 text-xs text-[#86868B] transition-colors hover:text-white"
            >
              <Navigation className="h-3.5 w-3.5 text-[#0071E3]" />
              <span>Map & Directions</span>
            </a>
          </motion.div>
        </div>

        {/* Hero Cinematic Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="relative mt-14 overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#161617] p-2 shadow-2xl sm:p-3"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] sm:aspect-[21/9]">
            <img
              src={heroImage}
              alt={business.name}
              className="h-full w-full object-cover contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#86868B]">
                  Neighborhood Table
                </p>
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {business.name}
                </h3>
                <p className="mt-0.5 text-xs text-stone-300">{business.address}</p>
              </div>

              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white backdrop-blur-xl">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
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
      <section id="menu" className="mx-auto max-w-7xl space-y-12 px-6 py-24 lg:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0071E3]">
              The Menu
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Signature Offerings.
            </h2>
            <p className="text-sm text-[#86868B] sm:text-base">
              Crafted fresh daily with authentic local spices and farm-fresh ingredients.
            </p>
          </div>

          {/* Fluid Sliding Tab Bar */}
          <div className="scrollbar-none flex items-center self-start overflow-x-auto rounded-full border border-white/[0.08] bg-[#161617] p-1.5 md:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  activeTab === tab ? 'text-black' : 'text-[#86868B] hover:text-white'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-white"
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid with Spotlight Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.signature_offerings.map((item, idx) => (
            <SpotlightCard key={idx} className="group flex h-full flex-col justify-between p-8">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#0071E3]">
                    {item.title}
                  </h3>
                  {item.price_npr && (
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-bold text-white">
                      {item.price_npr}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-[#86868B]">{item.description}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-6">
                <span className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> Chef Recipe
                </span>

                <motion.a
                  whileHover={{ x: 2 }}
                  href={`${baseWhatsAppUrl}${encodeURIComponent(
                    `Hello ${business.name}! I would like to order: ${item.title} (${item.price_npr || ''}).`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-medium text-[#0071E3] transition-colors hover:text-white"
                >
                  <span>Order on WhatsApp</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </motion.a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Interactive Google Maps & Directions */}
      <section id="location" className="mx-auto max-w-7xl space-y-12 px-6 py-24 lg:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0071E3]">
              Location
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Directions & Map.
            </h2>
            <p className="text-sm text-[#86868B]">{business.address} · Open daily 10:00 — 22:00</p>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-white/20 md:self-auto"
          >
            <Compass className="h-4 w-4 text-[#0071E3]" />
            <span>Open Navigation</span>
          </motion.a>
        </div>

        <div className="grid overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#161617] shadow-2xl lg:grid-cols-12">
          {/* Map Frame */}
          <div className="min-h-[460px] w-full lg:col-span-8">
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
          <div className="flex flex-col justify-between space-y-8 border-t border-white/[0.08] p-8 sm:p-10 lg:col-span-4 lg:border-l lg:border-t-0">
            <div className="space-y-6">
              <div>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-[#86868B]">
                  Location
                </span>
                <p className="mt-1 text-lg font-semibold text-white">{business.address}</p>
                <span className="text-xs text-[#86868B]">
                  {business.district}, Kathmandu Valley
                </span>
              </div>

              <div>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-[#86868B]">
                  Service Hours
                </span>
                <p className="mt-1 text-xs text-stone-200">Sun — Fri: 10:00 — 22:00</p>
                <p className="text-xs text-stone-200">Saturday: 09:00 — 22:30</p>
              </div>

              {business.phone && (
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#86868B]">
                    Telephone
                  </span>
                  <a
                    href={`tel:${business.phone}`}
                    className="font-mono text-sm text-white transition-colors hover:text-[#0071E3]"
                  >
                    {business.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-white/[0.08] pt-6">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] py-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#0077ED]"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Turn-by-Turn Directions</span>
              </motion.a>

              <a
                href={reservationUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-xs font-medium text-[#86868B] transition-colors hover:border-white/20 hover:text-white"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Chat with Staff</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Table Reservation Experience */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-12">
        <SpotlightCard className="space-y-8 p-8 sm:p-12">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0071E3]">
              Reservations
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Reserve Your Table.
            </h2>
            <p className="text-sm text-[#86868B]">
              Zero booking charges. Instant WhatsApp confirmation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#86868B]">Party Size</label>
              <div className="flex items-center gap-3">
                {[1, 2, 4, 6, 8].map((count) => (
                  <button
                    key={count}
                    onClick={() => setGuestCount(count)}
                    className={`flex-1 rounded-xl border py-2.5 text-xs font-medium transition-all ${
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
              <label className="block text-xs font-medium text-[#86868B]">Preferred Time</label>
              <div className="grid grid-cols-2 gap-2">
                {['Lunch (13:00)', 'Evening (18:30)', 'Dinner (20:00)', 'Late Dining'].map(
                  (time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-xl border px-3 py-2 text-left text-xs font-medium transition-all ${
                        selectedTime === time
                          ? 'border-[#0071E3] bg-[#0071E3]/20 text-white'
                          : 'border-white/10 text-[#86868B] hover:border-white/20'
                      }`}
                    >
                      {time}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={reservationUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-medium text-black transition-colors hover:bg-[#F5F5F7]"
          >
            <span>Confirm Booking on WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </SpotlightCard>
      </section>

      {/* Footer */}
      <footer className="space-y-2 border-t border-white/[0.08] px-6 py-12 text-center text-xs text-[#86868B] lg:px-12">
        <p className="font-medium text-white">{business.name}</p>
        <p>{business.address}</p>
        <p className="pt-4 text-[11px] text-stone-600">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
