'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
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

export function WellnessTemplate({ business, copy }: TemplateProps) {
  const [lang, setLang] = useState<'en' | 'np'>('en');
  const [selectedService, setSelectedService] = useState<string>('Personalized Consultation');

  const heroImage =
    business.photos?.[0] ||
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80';

  const cleanPhone = (business.phone || '').replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.length >= 7 ? `977${cleanPhone}` : '9779800000000';
  const whatsappBookingUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
    `Namaste ${business.name}! I would like to schedule an appointment for ${selectedService}.`,
  )}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050b07] font-sans text-stone-100 selection:bg-emerald-500 selection:text-black">
      {/* Ambient Emerald Radiance */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[850px] -translate-x-1/2 bg-gradient-to-b from-emerald-500/15 via-emerald-700/5 to-transparent blur-[130px]" />
      <div className="pointer-events-none absolute -left-48 top-[800px] -z-10 h-96 w-96 rounded-full bg-emerald-600/10 blur-[110px]" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-emerald-500/15 bg-[#07110a]/85 px-4 py-3.5 backdrop-blur-xl transition-all lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-700 p-[1px] shadow-lg shadow-emerald-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#050e08] text-emerald-400">
                <Heart className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  {business.name}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  <Sparkles className="h-2.5 w-2.5" /> 4+ ★
                </span>
              </div>
              <span className="block text-[11px] font-medium tracking-wider text-emerald-400/80">
                {business.address || `${business.district}, Kathmandu Valley`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              onClick={() => setLang((l) => (l === 'en' ? 'np' : 'en'))}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-400" />
              <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
            </button>

            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white/10 sm:inline-flex"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-400" />
                <span>{business.phone}</span>
              </a>
            )}

            <a
              href={whatsappBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2 text-xs font-bold text-stone-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.03] hover:from-emerald-300 hover:to-teal-400 sm:px-5 sm:text-sm"
            >
              <Calendar className="h-3.5 w-3.5 fill-stone-950" />
              <span>Book Visit</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-4 pb-20 pt-12 sm:pt-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 sm:space-y-8 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>{lang === 'en' ? copy.tagline : copy.nepali_content.tagline}</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {lang === 'en' ? (
                <>
                  Holistic Well-being & Care at{' '}
                  <span className="mt-1 block bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    {business.name}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-emerald-400">{business.name}</span> मा स्वास्थ्य र शान्तिको
                  नयाँ अनुभव
                </>
              )}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
              {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={whatsappBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 px-7 py-4 text-sm font-bold text-stone-950 shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.03] hover:from-emerald-300 hover:to-teal-400"
              >
                <MessageSquare className="h-4 w-4 fill-stone-950" />
                <span>Book Appointment on WhatsApp</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="#services"
                className="glass-card flex items-center gap-2 rounded-2xl border border-emerald-500/20 px-6 py-4 text-sm font-semibold text-stone-200 transition-all hover:bg-white/10"
              >
                <span>View Treatments</span>
                <ChevronRight className="h-4 w-4 text-emerald-400" />
              </a>
            </div>

            {/* Trust Metric Row */}
            <div className="grid max-w-xl grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
              <div>
                <div className="flex items-center gap-1.5 text-xl font-extrabold text-emerald-400">
                  <Star className="h-4 w-4 fill-emerald-400" />
                  <span>{business.rating || 4.7}</span>
                </div>
                <span className="mt-0.5 block text-[11px] text-stone-400">
                  {business.reviews_count || 85}+ Valley Patients
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xl font-extrabold text-white">
                  <Award className="h-4 w-4 text-emerald-400" />
                  <span>Certified</span>
                </div>
                <span className="mt-0.5 block text-[11px] text-stone-400">
                  Experienced Specialists
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xl font-extrabold text-white">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>7 Days</span>
                </div>
                <span className="mt-0.5 block text-[11px] text-stone-400">
                  Flexible Clinic Hours
                </span>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="glass-card animate-float-slow relative overflow-hidden rounded-3xl border border-emerald-500/30 p-2 shadow-2xl">
              <div className="relative h-[440px] overflow-hidden rounded-2xl sm:h-[480px]">
                <img
                  src={heroImage}
                  alt={business.name}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b07] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-[#09150d]/90 p-4 backdrop-blur-xl">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                      Sanctuary in {business.district}
                    </p>
                    <p className="max-w-[240px] truncate text-sm font-bold text-white">
                      {business.address}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="mx-auto max-w-7xl space-y-12 px-4 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" /> Personalized Care
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Signature Treatments & Services
          </h2>
          <p className="text-sm text-stone-400">
            Expertly tailored to restore balance, vigor, and peace.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.signature_offerings.map((item, idx) => (
            <div
              key={idx}
              className="glass-card group flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-emerald-300">
                    {item.title}
                  </h3>
                  {item.price_npr && (
                    <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-extrabold text-emerald-300">
                      {item.price_npr}
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-stone-400 sm:text-sm">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-6">
                <span className="flex items-center gap-1 text-[11px] text-emerald-400/80">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Specialist Consultation
                </span>
                <a
                  href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                    `Namaste ${business.name}! I am interested in: ${item.title}. Can you share slot availability?`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  <span>Book Slot</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="space-y-4 border-t border-white/[0.08] px-4 py-12 text-center text-xs text-stone-500">
        <p>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
        <p className="text-[11px] text-stone-600">
          Serving {business.district}, Kathmandu Valley with verified healthcare & wellness
          standards.
        </p>
      </footer>
    </div>
  );
}
