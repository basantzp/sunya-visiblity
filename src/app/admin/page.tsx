'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Send, 
  Globe, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  RefreshCw, 
  ExternalLink,
  ShieldAlert,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck
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
  const [selectedDistrict, setSelectedDistrict] = useState<'All' | 'Kathmandu' | 'Lalitpur' | 'Bhaktapur'>('All');

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

  // Infra Cost vs Revenue Monitor (Financial Health Guardrail — 100% Zero-API-Fee Architecture)
  const financialHealth = {
    monthlyInfraSpendUSD: 0.00, // 100% Free: OpenStreetMap + Personal Gmail SMTP + Local AI Engine
    monthlyRevenueUSD: 90.00, // Client setup / hosting converted to USD (NPR 12,000+)
    consecutiveLossMonths: 0,
    status: 'optimal',
  };

  const handleRunPipeline = async () => {
    setIsRunning(true);
    try {
      const res = await fetch('/api/leads/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          district: selectedDistrict,
          limit: 10,
        }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.leads) && data.leads.length > 0) {
        const formattedLeads: LeadItem[] = data.leads.map((l: any, idx: number) => ({
          id: l.id || `lead-${idx}`,
          name: l.name,
          category: l.category,
          district: l.district,
          rating: l.rating || 4.6,
          reviews: l.reviews || 30,
          status: 'preview_ready',
          previewUrl: l.previewUrl,
          slug: l.slug,
          template: `${l.category} (Warm Aesthetic)`,
        }));
        setLeads(formattedLeads);
        alert(`⚡ Zero-Fee Pipeline Success!\nDiscovered ${data.totalFound} qualified leads in ${selectedDistrict}.\nAPI Fees Incurred: NPR 0.00 / $0.00`);
      } else {
        alert('Discovery completed: 0 leads found matching criteria.');
      }
    } catch (err: any) {
      console.error('Pipeline run error:', err);
      alert('Pipeline execution notice: ' + (err.message || 'Error occurred'));
    } finally {
      setIsRunning(false);
    }
  };

  const approveOutreach = (id: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: 'approved_outreach' } : l));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center p-1">
              <img src="/sunya-mark-white.png" alt="Sunya" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className="text-2xl font-black text-white tracking-tight">Sunya · Founder Ops Console</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  Zero API Fees
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Autonomous local agency pipeline for Kathmandu, Lalitpur, and Bhaktapur — 100% Zero API Fees Architecture.
          </p>
        </div>

        {/* Phase Selector */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
          <span className="text-xs font-bold px-3 text-slate-400">Autonomy Phase:</span>
          {([1, 2, 3] as const).map(p => (
            <button
              key={p}
              onClick={() => setActivePhase(p)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
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

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Zero API Fees Architecture Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-white">100% Zero-API-Fee Stack Active</p>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Cost: NPR 0.00 / $0.00</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Discovery: OpenStreetMap Overpass · Copywriting: Local Deterministic AI · Outreach: Google SMTP · Orders: WhatsApp Direct
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30">
            <span>ZERO_API_FEES=true</span>
          </div>
        </div>

        {/* Financial Health North Star Alert Bar */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid sm:grid-cols-4 gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Monthly Revenue</p>
              <p className="text-lg font-bold text-white">${financialHealth.monthlyRevenueUSD.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Infra / API Spend</p>
              <p className="text-lg font-bold text-emerald-400">$0.00 (Zero Fees)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Paying Subscriptions</p>
              <p className="text-lg font-bold text-white">NPR 1,500/mo active</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Financial Guardrail</p>
              <p className="text-xs font-bold text-emerald-400">100% Margin Retention (Optimal)</p>
            </div>
          </div>
        </div>

        {/* Pipeline Controls */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-blue-400" />
                <span>Trigger Zero-Fee Autonomous Valley Run</span>
              </h2>
              <p className="text-xs text-slate-400">
                Discovers real businesses without websites via OpenStreetMap Overpass & Curated Local Registry with 0 API billing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white"
              >
                <option value="flower shop">Florists & Nurseries</option>
                <option value="restaurant">Restaurants & Momo</option>
                <option value="cafe">Cafes & Bakeries</option>
                <option value="spa">Spa & Ayurvedic Centers</option>
                <option value="clinic">Clinics & Doctors</option>
                <option value="boutique">Boutiques & Crafts</option>
                <option value="gym">Gyms & Fitness</option>
              </select>

              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white"
              >
                <option value="All">All Valley</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
              </select>

              <button
                onClick={handleRunPipeline}
                disabled={isRunning}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'Discovering...' : 'Run Pipeline'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lead Table & Human Approval Gate (Phase 1 & 2 Guardrail) */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Discovered Leads & Live Previews</span>
              </h2>
              <p className="text-xs text-slate-400">
                {activePhase === 1 
                  ? 'Phase 1 MVP Active: Manual review required before any outreach message is dispatched.' 
                  : 'Automatic generation and preview deployment active.'}
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {leads.length} Qualified Targets
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Business</th>
                  <th className="py-3 px-4">Category / District</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Assigned Template</th>
                  <th className="py-3 px-4">Live Preview</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{lead.name}</td>
                    <td className="py-3.5 px-4">{lead.category} · {lead.district}</td>
                    <td className="py-3.5 px-4 text-amber-400 font-bold">{lead.rating} ★ ({lead.reviews})</td>
                    <td className="py-3.5 px-4 text-slate-400">{lead.template}</td>
                    <td className="py-3.5 px-4">
                      <a
                        href={lead.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
                      >
                        <span>Inspect Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        lead.status === 'replied' || lead.status === 'paid_active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : lead.status === 'approved_outreach'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : lead.status === 'outreached'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {lead.status === 'replied' ? 'Interest Confirmed 🎉' : lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {lead.status === 'replied' ? (
                        <a
                          href={`/preview/${lead.slug}/onboarding`}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors inline-block"
                        >
                          Setup Operations →
                        </a>
                      ) : lead.status === 'preview_ready' ? (
                        <button
                          onClick={() => approveOutreach(lead.id)}
                          className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
                        >
                          Approve Outreach
                        </button>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Ready</span>
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
