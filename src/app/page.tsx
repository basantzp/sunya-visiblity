'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  Search, 
  Layers, 
  MessageSquare, 
  Zap, 
  CreditCard,
  Cpu
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Bar */}
      <nav className="border-b border-slate-800/80 px-6 py-4 backdrop-blur bg-slate-950/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-sm shadow-md shadow-blue-500/20">
              SV
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">Sunya Visibility</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Kathmandu Valley
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/20 flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Founder Console</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Autonomous Local-Business Website & Lead Agency</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
          Giving Kathmandu's Best Businesses The Digital Presence They Deserve.
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We identify top-rated local spots across Kathmandu, Lalitpur, and Bhaktapur that lack websites, auto-generate bespoke Next.js mobile experiences, and deploy them live before reaching out.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="#live-previews"
            className="px-7 py-3.5 rounded-2xl font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-2 shadow-xl"
          >
            <span>Explore Live Previews</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/admin"
            className="px-7 py-3.5 rounded-2xl font-bold border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-all flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>Open Pipeline Ops</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 text-left">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-2xl font-black text-white">100%</p>
            <p className="text-xs text-slate-400 mt-0.5">Autonomous Pipeline</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-2xl font-black text-white">4</p>
            <p className="text-xs text-slate-400 mt-0.5">Custom Visual Templates</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-2xl font-black text-white">NPR 12K</p>
            <p className="text-xs text-slate-400 mt-0.5">Transparent Setup Fee</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-2xl font-black text-white">NPR 1.5K</p>
            <p className="text-xs text-slate-400 mt-0.5">Monthly Cloud Hosting</p>
          </div>
        </div>
      </section>

      {/* Live Previews Showcase */}
      <section id="live-previews" className="py-20 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Live Demonstrations</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Real Kathmandu Valley Preview Sites</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Every site is automatically populated with synthesized patron themes, local neighborhood roots, and direct WhatsApp reservation tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePreviews.map((p, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400">{p.category}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      {p.district}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {p.name}
                  </h3>
                  <div className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${p.color}`}>
                    {p.tag}
                  </div>
                </div>

                <Link
                  href={`/preview/${p.slug}`}
                  target="_blank"
                  className="w-full py-2.5 rounded-xl font-bold bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center gap-2 text-xs transition-colors"
                >
                  <span>Open Interactive Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (The 6-Module Autonomous Pipeline) */}
      <section className="py-24 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Autonomous Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Built for High Signal & Zero Employees</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">1</div>
            <h3 className="text-lg font-bold text-white">Discovery Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Queries official Google Places API across Kathmandu, Lalitpur, and Bhaktapur. Filters for rating ≥ 4.0, reviews ≥ 15, and no existing website.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">2</div>
            <h3 className="text-lg font-bold text-white">Gemini Enrichment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Google TOS-compliant theme synthesizer. Never copies reviews verbatim; extracts core customer sentiment and crafts neighborhood-authentic copy.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">3</div>
            <h3 className="text-lg font-bold text-white">Multi-Template Generator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rotates across 4 distinct visual themes (Restaurant, Wellness, Retail, Services) with LocalBusiness Schema, SEO metadata, and bilingual toggle.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">4</div>
            <h3 className="text-lg font-bold text-white">Live Preview Provisioning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploys to unique subdomains immediately so the website is already live, fast, and testable on mobile before any message is sent.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">5</div>
            <h3 className="text-lg font-bold text-white">Rate-Limited Outreach</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gmail SMTP & WhatsApp Cloud dispatch with anti-double-send cache and strict 20–50 sends/day limit to protect deliverability and reputation.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">6</div>
            <h3 className="text-lg font-bold text-white">eSewa/Khalti Handoff</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seamless merchant QR payment verification. Automatic custom domain mapping or ZIP bundle export with recurring hosting metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Sunya Visibility · Kathmandu Valley Autonomous Agency</p>
      </footer>
    </div>
  );
}
