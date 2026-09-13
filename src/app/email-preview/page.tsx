'use client';

import React, { useState } from 'react';
import { Smartphone, Monitor, ExternalLink, RefreshCw, ShieldCheck, Mail, Sparkles, UtensilsCrossed, Flower2 } from 'lucide-react';

export default function EmailPreviewPage() {
  const [business, setBusiness] = useState<'sandar' | 'parijat'>('sandar');
  const [device, setDevice] = useState<'iphone' | 'pixel' | 'desktop'>('iphone');
  const [confidential, setConfidential] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const presets = {
    sandar: {
      name: 'Sandar Momo (Sankhamul)',
      category: 'restaurant',
      slug: 'sandar-momo-sankhamul',
      district: 'Kathmandu',
      icon: UtensilsCrossed,
      tag: 'Culinary · 4.7★ · 420+ Reviews',
    },
    parijat: {
      name: 'Parijat Flower House & Nursery',
      category: 'flower shop',
      slug: 'parijat-flower-house-sankhamul',
      district: 'Kathmandu',
      icon: Flower2,
      tag: 'Florist · 4.8★ · 184+ Reviews',
    },
  };

  const activePreset = presets[business];
  const previewUrl = `/api/email-preview/raw?business=${encodeURIComponent(activePreset.name)}&category=${encodeURIComponent(activePreset.category)}&slug=${activePreset.slug}&district=${activePreset.district}&confidential=${confidential}`;

  const deviceWidths = {
    iphone: '390px',
    pixel: '412px',
    desktop: '720px',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center p-1">
              <img src="/sunya-mark-white.png" alt="Sunya" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className="text-base font-black text-white tracking-tight">Sunya · Cold Email Inspector</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Localhost Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Visualizing how outreach emails render across mobile mail apps & desktop clients
              </p>
            </div>
          </div>

          {/* Business Preset Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setBusiness('sandar'); setIframeKey(k => k + 1); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                business === 'sandar' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Sandar Momo</span>
            </button>
            <button
              onClick={() => { setBusiness('parijat'); setIframeKey(k => k + 1); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                business === 'parijat' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flower2 className="w-3.5 h-3.5" />
              <span>Parijat Flower House</span>
            </button>
          </div>

          {/* Device Frame Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setDevice('iphone')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                device === 'iphone' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="iPhone (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iPhone 14 (390px)</span>
            </button>
            <button
              onClick={() => setDevice('pixel')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                device === 'pixel' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Pixel (412px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android (412px)</span>
            </button>
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                device === 'desktop' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop (Full)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setConfidential(!confidential); setIframeKey(k => k + 1); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                confidential 
                  ? 'bg-blue-950/40 border-blue-500/40 text-blue-300' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DRM: {confidential ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setIframeKey(k => k + 1)}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-950 border border-slate-800"
              title="Reload Frame"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-md"
            >
              <span>Raw HTML Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 flex flex-col items-center justify-start overflow-y-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
        {/* Active Preset Info Bar */}
        <div className="mb-4 flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
          <span className="font-bold text-white">{activePreset.name}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">{activePreset.tag}</span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 font-mono">Viewport: {deviceWidths[device]}</span>
        </div>

        {/* Device Container Frame */}
        {device === 'desktop' ? (
          <div 
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
            style={{ maxWidth: deviceWidths.desktop, height: '88vh' }}
          >
            {/* Desktop Browser Top bar */}
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-3 py-1 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-400 flex items-center gap-2 border border-slate-800">
                <Mail className="w-3 h-3 text-blue-400" />
                <span>Gmail / Webmail Client · Desktop Viewport</span>
              </div>
              <div className="w-12" />
            </div>
            <iframe
              key={iframeKey}
              src={previewUrl}
              className="w-full flex-1 border-0 bg-[#0b0f19]"
              title="Desktop Email Preview"
            />
          </div>
        ) : (
          /* Mobile Phone Chassis */
          <div
            className="relative rounded-[48px] border-[10px] border-slate-800 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col transition-all duration-300"
            style={{ 
              width: deviceWidths[device], 
              height: '840px',
              boxShadow: '0 0 0 2px #334155, 0 30px 70px -10px rgba(0,0,0,0.95)'
            }}
          >
            {/* Smartphone Notch / Dynamic Island */}
            <div className="h-7 bg-slate-950 relative flex items-center justify-center shrink-0 z-20">
              <div className="w-24 h-4 bg-black rounded-full border border-slate-800/80 flex items-center justify-between px-3">
                <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-950" />
              </div>
            </div>

            {/* Mobile Header Status Bar */}
            <div className="px-6 py-1 bg-slate-950 flex items-center justify-between text-[10px] font-semibold text-slate-400 shrink-0 select-none">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span>5G</span>
                <span>📶</span>
                <span>100% 🔋</span>
              </div>
            </div>

            {/* Mail App Top Bar */}
            <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                  S
                </div>
                <div>
                  <div className="font-bold text-white text-[11px] leading-tight">Sunya &lt;iiambasant@gmail.com&gt;</div>
                  <div className="text-[10px] text-slate-400 leading-tight">to: owner@business.np</div>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Just now</span>
            </div>

            {/* Rendered Email Content via Iframe */}
            <iframe
              key={iframeKey}
              src={previewUrl}
              className="w-full flex-1 border-0 bg-[#0b0f19]"
              title="Mobile Email Preview"
            />

            {/* Mobile Home Bar Pill */}
            <div className="h-5 bg-slate-950 flex items-center justify-center shrink-0 z-20">
              <div className="w-32 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
