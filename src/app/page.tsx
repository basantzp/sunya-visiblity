'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  CreditCard,
  Globe,
  Layers,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function AgencyHomePage() {
  const samplePreviews = [
    {
      name: 'Himalayan Momo & Sekuwa Corner',
      category: 'Restaurant & Dining',
      district: 'Jhamsikhel, Lalitpur',
      slug: 'himalayan-momo-sekuwa-corner',
      tag: 'Warm Amber Theme · Menu & Reservations',
      color: 'border-amber-500/40 bg-amber-950/10 text-amber-400',
    },
    {
      name: 'Patan Heritage Herbal Spa & Ayurveda',
      category: 'Spa & Wellness',
      district: 'Patan Durbar Square, Lalitpur',
      slug: 'patan-heritage-herbal-spa-ayurveda',
      tag: 'Emerald Botanical Theme · Appointment Booking',
      color: 'border-emerald-500/40 bg-emerald-950/10 text-emerald-400',
    },
    {
      name: 'Boudha Organic Bakery & Artisan Coffee',
      category: 'Cafe & Roastery',
      district: 'Boudhanath Stupa, Kathmandu',
      slug: 'boudha-organic-bakery-artisan-coffee',
      tag: 'Warm Cafe Theme · Digital Menu & Reviews',
      color: 'border-amber-500/40 bg-amber-950/10 text-amber-400',
    },
    {
      name: 'Bhaktapur Traditional Pottery & Crafts',
      category: 'Boutique & Retail',
      district: 'Pottery Square, Bhaktapur',
      slug: 'bhaktapur-traditional-pottery-crafts',
      tag: 'Minimalist Editorial · WhatsApp Orders',
      color: 'border-stone-500/40 bg-stone-900/40 text-stone-300',
    },
    {
      name: 'Apex Physiotherapy & Wellness Clinic',
      category: 'Clinic & Health',
      district: 'New Baneshwor, Kathmandu',
      slug: 'apex-physiotherapy-wellness-clinic',
      tag: 'Trust Navy Theme · Patient Inquiries',
      color: 'border-blue-500/40 bg-blue-950/10 text-blue-400',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Top Bar */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1.5 shadow-md shadow-blue-500/10">
              <img src="/sunya-mark-white.png" alt="Sunya" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">Sunya</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Kathmandu Valley
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>Founder Console</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-5xl space-y-8 px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Autonomous Local-Business Website & Lead Agency</span>
        </div>

        <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Giving Kathmandu&apos;s Best Businesses The Digital Presence They Deserve.
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
          We identify top-rated local spots across Kathmandu, Lalitpur, and Bhaktapur that lack
          websites, auto-generate bespoke Next.js mobile experiences, and deploy them live before
          reaching out.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="#live-previews"
            className="flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-bold text-slate-950 shadow-xl transition-all hover:bg-slate-100"
          >
            <span>Explore Live Previews</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-7 py-3.5 font-bold text-slate-200 transition-all hover:bg-slate-800"
          >
            <Cpu className="h-4 w-4 text-blue-400" />
            <span>Open Pipeline Ops</span>
          </Link>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 pt-10 text-left md:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-2xl font-black text-white">100%</p>
            <p className="mt-0.5 text-xs text-slate-400">Autonomous Pipeline</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-2xl font-black text-white">4</p>
            <p className="mt-0.5 text-xs text-slate-400">Custom Visual Templates</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-2xl font-black text-white">NPR 12K</p>
            <p className="mt-0.5 text-xs text-slate-400">Transparent Setup Fee</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-2xl font-black text-white">NPR 1.5K</p>
            <p className="mt-0.5 text-xs text-slate-400">Monthly Cloud Hosting</p>
          </div>
        </div>
      </section>

      {/* Live Previews Showcase */}
      <section id="live-previews" className="border-y border-slate-800 bg-slate-900/50 px-6 py-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Live Demonstrations
            </span>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Real Kathmandu Valley Preview Sites
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-400">
              Every site is automatically populated with synthesized patron themes, local
              neighborhood roots, and direct WhatsApp reservation tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {samplePreviews.map((p, i) => (
              <div
                key={i}
                className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-blue-500/50"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400">{p.category}</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="h-3 w-3 text-blue-400" />
                      {p.district}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                    {p.name}
                  </h3>
                  <div className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${p.color}`}>
                    {p.tag}
                  </div>
                </div>

                <Link
                  href={`/preview/${p.slug}`}
                  target="_blank"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-600"
                >
                  <span>Open Interactive Preview</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (The 6-Module Autonomous Pipeline) */}
      <section className="mx-auto max-w-6xl space-y-16 px-6 py-24">
        <div className="space-y-3 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Autonomous Architecture
          </span>
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Built for High Signal & Zero Employees
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 font-bold text-blue-400">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Discovery Engine</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Queries official Google Places API across Kathmandu, Lalitpur, and Bhaktapur. Filters
              for rating ≥ 4.0, reviews ≥ 15, and no existing website.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 font-bold text-indigo-400">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Gemini Enrichment</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Google TOS-compliant theme synthesizer. Never copies reviews verbatim; extracts core
              customer sentiment and crafts neighborhood-authentic copy.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 font-bold text-purple-400">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Template Generator</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Rotates across 4 distinct visual themes (Restaurant, Wellness, Retail, Services) with
              LocalBusiness Schema, SEO metadata, and bilingual toggle.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 font-bold text-emerald-400">
              4
            </div>
            <h3 className="text-lg font-bold text-white">Live Preview Provisioning</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Deploys to unique subdomains immediately so the website is already live, fast, and
              testable on mobile before any message is sent.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 font-bold text-amber-400">
              5
            </div>
            <h3 className="text-lg font-bold text-white">Rate-Limited Outreach</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Gmail SMTP & WhatsApp Cloud dispatch with anti-double-send cache and strict 20–50
              sends/day limit to protect deliverability and reputation.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 font-bold text-rose-400">
              6
            </div>
            <h3 className="text-lg font-bold text-white">eSewa/Khalti Handoff</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Seamless merchant QR payment verification. Automatic custom domain mapping or ZIP
              bundle export with recurring hosting metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Sunya · Kathmandu Valley Autonomous Agency</p>
      </footer>
    </div>
  );
}
