'use client';

import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  MessageSquare,
  Sparkles,
  Heart,
  ShieldCheck,
  ChevronRight,
  Globe,
  Calendar,
  Award,
  ArrowUpRight,
  CheckCircle2,
  Users
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

export function WellnessTemplate({ business, copy }: TemplateProps) {
  const [lang, setLang] = useState<'en' | 'np'>('en');
  const [selectedService, setSelectedService] = useState<string>('Personalized Consultation');

  const heroImage =
    business.photos?.[0] ||
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80';

  const cleanPhone = (business.phone || '').replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.length >= 7 ? `977${cleanPhone}` : '9779867333080';
  const whatsappBookingUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
    `Namaste ${business.name}! I would like to schedule an appointment for ${selectedService}.`
  )}`;

  return (
    <div className="min-h-screen bg-[#050b07] text-stone-100 font-sans selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
      {/* Ambient Emerald Radiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-emerald-700/5 to-transparent blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] -left-48 w-96 h-96 bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#07110a]/85 border-b border-emerald-500/15 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-700 p-[1px] shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-[#050e08] rounded-2xl flex items-center justify-center text-emerald-400">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">{business.name}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-2.5 h-2.5" /> 4+ ★
                </span>
              </div>
              <span className="block text-[11px] text-emerald-400/80 font-medium tracking-wider">
                {business.address || `${business.district}, Kathmandu Valley`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              onClick={() => setLang(l => (l === 'en' ? 'np' : 'en'))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all text-emerald-300"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? 'नेपाली' : 'English'}</span>
            </button>

            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{business.phone}</span>
              </a>
            )}

            <a
              href={whatsappBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-stone-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-300 hover:to-teal-400 transition-all hover:scale-[1.03]"
            >
              <Calendar className="w-3.5 h-3.5 fill-stone-950" />
              <span>Book Visit</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 sm:pt-16 pb-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? copy.tagline : copy.nepali_content.tagline}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              {lang === 'en' ? (
                <>
                  Holistic Well-being & Care at{' '}
                  <span className="bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-300 bg-clip-text text-transparent block mt-1">
                    {business.name}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-emerald-400">{business.name}</span> मा स्वास्थ्य र शान्तिको नयाँ अनुभव
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
              {lang === 'en' ? copy.hero_subtitle : copy.nepali_content.about_snippet}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={whatsappBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-stone-950 flex items-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.03]"
              >
                <MessageSquare className="w-4 h-4 fill-stone-950" />
                <span>Book Appointment on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="px-6 py-4 rounded-2xl font-semibold text-sm glass-card hover:bg-white/10 text-stone-200 transition-all flex items-center gap-2 border border-emerald-500/20"
              >
                <span>View Treatments</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </a>
            </div>

            {/* Trust Metric Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] max-w-xl">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-xl">
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <span>{business.rating || 4.7}</span>
                </div>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  {business.reviews_count || 85}+ Valley Patients
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-white font-extrabold text-xl">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Certified</span>
                </div>
                <span className="text-[11px] text-stone-400 block mt-0.5">Experienced Specialists</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-white font-extrabold text-xl">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>7 Days</span>
                </div>
                <span className="text-[11px] text-stone-400 block mt-0.5">Flexible Clinic Hours</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card p-2 border border-emerald-500/30 shadow-2xl animate-float-slow">
              <div className="relative rounded-2xl overflow-hidden h-[440px] sm:h-[480px]">
                <img
                  src={heroImage}
                  alt={business.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b07] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#09150d]/90 backdrop-blur-xl border border-emerald-500/30 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">
                      Sanctuary in {business.district}
                    </p>
                    <p className="text-sm font-bold text-white truncate max-w-[240px]">
                      {business.address}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-4 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Personalized Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Signature Treatments & Services</h2>
          <p className="text-stone-400 text-sm">
            Expertly tailored to restore balance, vigor, and peace.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {copy.signature_offerings.map((item, idx) => (
            <div
              key={idx}
              className="glass-card hover:border-emerald-500/40 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-white text-lg group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  {item.price_npr && (
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                      {item.price_npr}
                    </span>
                  )}
                </div>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-emerald-400/80 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Specialist Consultation
                </span>
                <a
                  href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                    `Namaste ${business.name}! I am interested in: ${item.title}. Can you share slot availability?`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  <span>Book Slot</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/[0.08] text-center text-xs text-stone-500 space-y-4">
        <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p className="text-[11px] text-stone-600">
          Serving {business.district}, Kathmandu Valley with verified healthcare & wellness standards.
        </p>
      </footer>
    </div>
  );
}
