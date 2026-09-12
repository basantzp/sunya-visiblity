'use client';

import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  Globe,
  Layers,
  Play,
  RefreshCw,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface LeadItem {
  id: string;
  name: string;
  category: string;
  district: string;
  rating: number;
  reviews: number;
  status: string;
  previewUrl: string;
  slug: string;
  template: string;
}

export default function AdminDashboard() {
  const [activePhase, setActivePhase] = useState<1 | 2 | 3>(1);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('restaurant');
  const [selectedDistrict, setSelectedDistrict] = useState<
    'All' | 'Kathmandu' | 'Lalitpur' | 'Bhaktapur'
  >('All');

  // Realistic mock state reflecting active pipeline
  const [leads, setLeads] = useState<LeadItem[]>([
    {
      id: '1',
      name: 'Himalayan Momo & Sekuwa Corner',
      category: 'Restaurant',
      district: 'Lalitpur',
      rating: 4.6,
      reviews: 142,
      status: 'preview_ready',
      previewUrl: '/preview/himalayan-momo-sekuwa-corner',
      slug: 'himalayan-momo-sekuwa-corner',
      template: 'Restaurant (Warm Amber)',
    },
    {
      id: '2',
      name: 'Patan Heritage Herbal Spa & Ayurveda',
      category: 'Spa & Wellness',
      district: 'Lalitpur',
      rating: 4.8,
      reviews: 88,
      status: 'preview_ready',
      previewUrl: '/preview/patan-heritage-herbal-spa-ayurveda',
      slug: 'patan-heritage-herbal-spa-ayurveda',
      template: 'Wellness (Emerald Serene)',
    },
    {
      id: '3',
      name: 'Boudha Organic Bakery & Artisan Coffee',
      category: 'Cafe & Bakery',
      district: 'Kathmandu',
      rating: 4.5,
      reviews: 215,
      status: 'approved_outreach',
      previewUrl: '/preview/boudha-organic-bakery-artisan-coffee',
      slug: 'boudha-organic-bakery-artisan-coffee',
      template: 'Restaurant (Warm Amber)',
    },
    {
      id: '4',
      name: 'Bhaktapur Traditional Pottery & Crafts',
      category: 'Boutique',
      district: 'Bhaktapur',
      rating: 4.7,
      reviews: 96,
      status: 'outreached',
      previewUrl: '/preview/bhaktapur-traditional-pottery-crafts',
      slug: 'bhaktapur-traditional-pottery-crafts',
      template: 'Retail (Editorial Minimalist)',
    },
    {
      id: '5',
      name: 'Apex Physiotherapy & Wellness Clinic',
      category: 'Clinic',
      district: 'Kathmandu',
      rating: 4.4,
      reviews: 54,
      status: 'replied',
      previewUrl: '/preview/apex-physiotherapy-wellness-clinic',
      slug: 'apex-physiotherapy-wellness-clinic',
      template: 'Services (Navy Trust)',
    },
  ]);

  // Infra Cost vs Revenue Monitor (Financial Health Guardrail)
  const financialHealth = {
    monthlyInfraSpendUSD: 4.5, // Google Places API + Vercel + Gemini
    monthlyRevenueUSD: 90.0, // Client setup / hosting converted to USD
    consecutiveLossMonths: 0,
    status: 'healthy',
  };

  const handleRunPipeline = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      alert(
        'Pipeline execution complete! 5 new businesses discovered in Kathmandu Valley, 5 preview sites generated.',
      );
    }, 1500);
  };

  const approveOutreach = (id: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'approved_outreach' } : l)));
  };

  return (
    <div className="min-h-screen space-y-8 bg-slate-950 p-6 font-sans text-slate-100 lg:p-10">
      {/* Header */}
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
            <h1 className="text-2xl font-black tracking-tight text-white">
              Sunya Visibility · Founder Ops Console
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Autonomous local agency pipeline for Kathmandu, Lalitpur, and Bhaktapur.
          </p>
        </div>

        {/* Phase Selector */}
        <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 p-1.5">
          <span className="px-3 text-xs font-bold text-slate-400">Autonomy Phase:</span>
          {([1, 2, 3] as const).map((p) => (
            <button
              key={p}
              onClick={() => setActivePhase(p)}
              className={`rounded-xl px-3 py-1 text-xs font-bold transition-all ${
                activePhase === p
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Phase {p} {p === 1 ? '(MVP)' : p === 2 ? '(Semi-Auto)' : '(Full Auto)'}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8">
        {/* Financial Health North Star Alert Bar */}
        <div className="grid items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Monthly Revenue</p>
              <p className="text-lg font-bold text-white">
                ${financialHealth.monthlyRevenueUSD.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Infra Spend (API + Host)</p>
              <p className="text-lg font-bold text-white">
                ${financialHealth.monthlyInfraSpendUSD.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Paying Subscriptions</p>
              <p className="text-lg font-bold text-white">NPR 1,500/mo active</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Financial Guardrail</p>
              <p className="text-xs font-bold text-emerald-400">Revenue Covers Costs (Healthy)</p>
            </div>
          </div>
        </div>

        {/* Pipeline Controls */}
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <Play className="h-4 w-4 text-blue-400" />
                <span>Trigger Autonomous Valley Run</span>
              </h2>
              <p className="text-xs text-slate-400">
                Queries Google Places for businesses without websites, synthesizes copy with Gemini,
                and provisions previews.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              >
                <option value="restaurant">Restaurants & Momo</option>
                <option value="cafe">Cafes & Bakeries</option>
                <option value="spa">Spa & Ayurvedic Centers</option>
                <option value="clinic">Clinics & Doctors</option>
                <option value="boutique">Boutiques & Crafts</option>
                <option value="gym">Gyms & Fitness</option>
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value as any)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              >
                <option value="All">All Valley</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
              </select>

              <button
                onClick={handleRunPipeline}
                disabled={isRunning}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'Running...' : 'Run Pipeline'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lead Table & Human Approval Gate (Phase 1 & 2 Guardrail) */}
        <div className="space-y-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <Layers className="h-4 w-4 text-purple-400" />
                <span>Discovered Leads & Live Previews</span>
              </h2>
              <p className="text-xs text-slate-400">
                {activePhase === 1
                  ? 'Phase 1 MVP Active: Manual review required before any outreach message is dispatched.'
                  : 'Automatic generation and preview deployment active.'}
              </p>
            </div>
            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
              {leads.length} Qualified Targets
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-slate-800 bg-slate-950 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-4 py-3">Business</th>
                  <th className="px-4 py-3">Category / District</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Assigned Template</th>
                  <th className="px-4 py-3">Live Preview</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {leads.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-slate-800/40">
                    <td className="px-4 py-3.5 font-bold text-white">{lead.name}</td>
                    <td className="px-4 py-3.5">
                      {lead.category} · {lead.district}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-amber-400">
                      {lead.rating} ★ ({lead.reviews})
                    </td>
                    <td className="px-4 py-3.5 text-slate-400">{lead.template}</td>
                    <td className="px-4 py-3.5">
                      <a
                        href={lead.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-blue-400 hover:text-blue-300"
                      >
                        <span>Inspect Site</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                          lead.status === 'replied' || lead.status === 'paid_active'
                            ? 'border border-emerald-500/30 bg-emerald-500/20 text-emerald-400'
                            : lead.status === 'approved_outreach'
                              ? 'border border-blue-500/30 bg-blue-500/20 text-blue-400'
                              : lead.status === 'outreached'
                                ? 'border border-purple-500/30 bg-purple-500/20 text-purple-400'
                                : 'border border-amber-500/30 bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {lead.status === 'replied' ? 'Interest Confirmed 🎉' : lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {lead.status === 'replied' ? (
                        <a
                          href={`/preview/${lead.slug}/onboarding`}
                          className="inline-block rounded-lg bg-emerald-600 px-3 py-1 font-bold text-white transition-colors hover:bg-emerald-500"
                        >
                          Setup Operations →
                        </a>
                      ) : lead.status === 'preview_ready' ? (
                        <button
                          onClick={() => approveOutreach(lead.id)}
                          className="rounded-lg bg-blue-600 px-3 py-1 font-bold text-white transition-colors hover:bg-blue-500"
                        >
                          Approve Outreach
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500">Ready</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
