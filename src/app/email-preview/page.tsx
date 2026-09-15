'use client';

import React, { useState } from 'react';
import {
  Archive,
  Clock,
  CornerUpLeft,
  Dumbbell,
  ExternalLink,
  FileText,
  Flower2,
  Grid,
  HelpCircle,
  Inbox,
  Mail,
  Menu,
  Monitor,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Star,
  Tag,
  Trash2,
  UtensilsCrossed,
} from 'lucide-react';

export default function EmailPreviewPage() {
  const [business, setBusiness] = useState<'gym' | 'sandar' | 'parijat'>('gym');
  const [device, setDevice] = useState<'gmail' | 'iphone' | 'pixel' | 'desktop'>('gmail');
  const [confidential, setConfidential] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const presets = {
    gym: {
      name: 'Shankhamul Health Club & Fitness Centre',
      category: 'gym',
      slug: 'shankhamul-health-club-fitness',
      district: 'Kathmandu',
      icon: Dumbbell,
      tag: 'Fitness · 4.6★ · 140+ Reviews · Sankhamul',
      toEmail: 'info@shankhamulfitness.com.np',
    },
    sandar: {
      name: 'Sandar Momo (Sankhamul)',
      category: 'restaurant',
      slug: 'sandar-momo-sankhamul',
      district: 'Kathmandu',
      icon: UtensilsCrossed,
      tag: 'Culinary · 4.7★ · 420+ Reviews',
      toEmail: 'owner@sandarmomo.com.np',
    },
    parijat: {
      name: 'Parijat Flower House & Nursery',
      category: 'flower shop',
      slug: 'parijat-flower-house-sankhamul',
      district: 'Kathmandu',
      icon: Flower2,
      tag: 'Florist · 4.8★ · 184+ Reviews',
      toEmail: 'contact@parijatflower.com.np',
    },
  };

  const activePreset = presets[business];
  const previewUrl = `/api/email-preview/raw?business=${encodeURIComponent(activePreset.name)}&category=${encodeURIComponent(activePreset.category)}&slug=${activePreset.slug}&district=${activePreset.district}&confidential=${confidential}`;

  const deviceWidths = {
    gmail: '1180px',
    iphone: '390px',
    pixel: '412px',
    desktop: '760px',
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 font-sans text-slate-100">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 p-1">
              <img
                src="/sunya-mark-white.png"
                alt="Sunya"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <h1 className="text-sm font-black tracking-tight text-white">
                  Sunya · Cold Email Inspector
                </h1>
                <span className="rounded border border-blue-500/30 bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-300">
                  Localhost Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Visualizing how outreach emails render across Gmail Webmail &amp; mobile clients
              </p>
            </div>
          </div>

          {/* Business Preset Switcher */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 p-1">
            <button
              onClick={() => {
                setBusiness('gym');
                setIframeKey((k) => k + 1);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                business === 'gym'
                  ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Dumbbell className="h-3.5 w-3.5" />
              <span>Shankhamul Gym</span>
            </button>
            <button
              onClick={() => {
                setBusiness('sandar');
                setIframeKey((k) => k + 1);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                business === 'sandar'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UtensilsCrossed className="h-3.5 w-3.5" />
              <span>Sandar Momo</span>
            </button>
            <button
              onClick={() => {
                setBusiness('parijat');
                setIframeKey((k) => k + 1);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                business === 'parijat'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flower2 className="h-3.5 w-3.5" />
              <span>Parijat Flower House</span>
            </button>
          </div>

          {/* Device Frame Switcher */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 p-1">
            {/* Gmail Desktop */}
            <button
              onClick={() => setDevice('gmail')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                device === 'gmail'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Gmail Webmail View"
            >
              <svg className="h-3 w-3.5" viewBox="0 0 24 18" fill="none">
                <path
                  d="M1.5 3C1.5 2.17 2.17 1.5 3 1.5H5.25L12 7.5L18.75 1.5H21C21.83 1.5 22.5 2.17 22.5 3V4.5L12 13.5L1.5 4.5V3Z"
                  fill="#EA4335"
                />
                <path d="M1.5 4.5V15C1.5 15.83 2.17 16.5 3 16.5H6V8.25L1.5 4.5Z" fill="#4285F4" />
                <path
                  d="M22.5 4.5V15C22.5 15.83 21.83 16.5 21 16.5H18V8.25L22.5 4.5Z"
                  fill="#34A853"
                />
                <path d="M6 16.5H18V10.5L12 15L6 10.5V16.5Z" fill="#FBBC05" />
              </svg>
              <span>Gmail Desktop</span>
            </button>

            {/* iPhone */}
            <button
              onClick={() => setDevice('iphone')}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                device === 'iphone'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="iPhone 14 (390px)"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>iPhone (390px)</span>
            </button>

            {/* Android */}
            <button
              onClick={() => setDevice('pixel')}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                device === 'pixel'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Pixel (412px)"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Android (412px)</span>
            </button>

            {/* Plain Desktop */}
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                device === 'desktop'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop (760px)"
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>Card View</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setConfidential(!confidential);
                setIframeKey((k) => k + 1);
              }}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                confidential
                  ? 'border-blue-500/40 bg-blue-950/40 text-blue-300'
                  : 'border-slate-700 bg-slate-800 text-slate-400'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>DRM: {confidential ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setIframeKey((k) => k + 1)}
              className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white"
              title="Reload Frame"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>

            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-slate-950 shadow-md transition-all hover:bg-slate-200"
            >
              <span>Raw HTML Tab</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex flex-1 flex-col items-center justify-start overflow-y-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] p-4 [background-size:16px_16px] md:p-6">
        {/* Active Preset Info Bar */}
        <div className="mb-4 flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-1.5 text-xs text-slate-300">
          <span className="font-bold text-white">{activePreset.name}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">{activePreset.tag}</span>
          <span className="text-slate-600">·</span>
          <span className="font-mono text-emerald-400">Viewport: {deviceWidths[device]}</span>
        </div>

        {/* 1. Authentic Gmail Desktop Interface View */}
        {device === 'gmail' && (
          <div
            className="flex w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#1e1f20] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-300"
            style={{ maxWidth: deviceWidths.gmail, height: '88vh' }}
          >
            {/* Gmail Top Navigation Bar */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#2e2f30] bg-[#1e1f20] px-4 py-2.5">
              {/* Left: Logo & Menu */}
              <div className="flex min-w-[180px] items-center gap-3">
                <button className="rounded-full p-2 text-slate-400 hover:bg-[#2e2f30]">
                  <Menu className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-6" viewBox="0 0 24 18" fill="none">
                    <path
                      d="M1.5 3C1.5 2.17 2.17 1.5 3 1.5H5.25L12 7.5L18.75 1.5H21C21.83 1.5 22.5 2.17 22.5 3V4.5L12 13.5L1.5 4.5V3Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M1.5 4.5V15C1.5 15.83 2.17 16.5 3 16.5H6V8.25L1.5 4.5Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M22.5 4.5V15C22.5 15.83 21.83 16.5 21 16.5H18V8.25L22.5 4.5Z"
                      fill="#34A853"
                    />
                    <path d="M6 16.5H18V10.5L12 15L6 10.5V16.5Z" fill="#FBBC05" />
                  </svg>
                  <span className="text-lg font-semibold tracking-tight text-slate-200">Gmail</span>
                </div>
              </div>

              {/* Center: Search Bar */}
              <div className="max-w-xl flex-1">
                <div className="flex items-center gap-3 rounded-full border border-transparent bg-[#2d2e30] px-4 py-2 shadow-inner transition-all focus-within:border-slate-600">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    readOnly
                    value={`from:iiambasant@gmail.com ${activePreset.name}`}
                    className="w-full select-none border-none bg-transparent font-mono text-xs text-slate-200 outline-none"
                  />
                  <SlidersHorizontal className="h-4 w-4 cursor-pointer text-slate-400 hover:text-white" />
                </div>
              </div>

              {/* Right: Settings & Account */}
              <div className="flex items-center gap-1.5">
                <button className="rounded-full p-2 text-slate-400 hover:bg-[#2e2f30]">
                  <HelpCircle className="h-4 w-4" />
                </button>
                <button className="rounded-full p-2 text-slate-400 hover:bg-[#2e2f30]">
                  <Settings className="h-4 w-4" />
                </button>
                <button className="rounded-full p-2 text-slate-400 hover:bg-[#2e2f30]">
                  <Grid className="h-4 w-4" />
                </button>
                <div className="ml-1 flex h-7 w-7 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-600 text-xs font-bold text-white">
                  B
                </div>
              </div>
            </div>

            {/* Gmail Body: Sidebar + Reading Pane */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Sidebar */}
              <div className="flex hidden w-48 shrink-0 flex-col justify-between border-r border-[#2e2f30] bg-[#1e1f20] p-3 md:flex">
                <div className="space-y-1">
                  {/* Compose Pill */}
                  <div className="mb-3">
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-[#c2e7ff] px-4 py-2.5 text-xs font-semibold text-[#001d35] shadow-sm transition-all">
                      <Plus className="h-4 w-4" />
                      <span>Compose</span>
                    </div>
                  </div>

                  {/* Nav links */}
                  <div className="flex items-center justify-between rounded-full bg-[#37383a] px-3 py-1.5 text-xs font-semibold text-white">
                    <div className="flex items-center gap-2.5">
                      <Inbox className="h-3.5 w-3.5 text-[#a8c7fa]" />
                      <span>Inbox</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-400">1</span>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-full px-3 py-1.5 text-xs text-slate-400 hover:bg-[#2e2f30]">
                    <Star className="h-3.5 w-3.5" />
                    <span>Starred</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-full px-3 py-1.5 text-xs text-slate-400 hover:bg-[#2e2f30]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Snoozed</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-full px-3 py-1.5 text-xs text-slate-400 hover:bg-[#2e2f30]">
                    <Send className="h-3.5 w-3.5" />
                    <span>Sent</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-full px-3 py-1.5 text-xs text-slate-400 hover:bg-[#2e2f30]">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Drafts</span>
                  </div>
                </div>

                <div className="px-2 font-mono text-[10px] text-slate-500">
                  Gmail Webmail · Sunya
                </div>
              </div>

              {/* Reading Pane */}
              <div className="flex flex-1 flex-col overflow-hidden bg-[#111214]">
                {/* Action Bar */}
                <div className="flex shrink-0 items-center justify-between border-b border-[#2e2f30] bg-[#1a1b1d] px-5 py-2">
                  <div className="flex items-center gap-3.5 text-slate-400">
                    <CornerUpLeft className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                    <div className="h-3.5 w-[1px] bg-slate-700" />
                    <Archive className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                    <Trash2 className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                    <Mail className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                    <Clock className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                    <Tag className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                    <MoreVertical className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                  </div>

                  {/* Quick Section Glide Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        const iframe = document.querySelector('iframe');
                        if (iframe?.contentWindow) {
                          iframe.contentWindow.location.hash = '#preview-mockup';
                        }
                      }}
                      className="flex items-center gap-1 rounded border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10.5px] font-semibold text-blue-300 transition hover:bg-blue-500/20"
                      title="Smooth glide to phone preview mockup"
                    >
                      <span>📱 Phone Mockup</span>
                    </button>
                    <button
                      onClick={() => {
                        const iframe = document.querySelector('iframe');
                        if (iframe?.contentWindow) {
                          iframe.contentWindow.location.hash = '#social-proof';
                        }
                      }}
                      className="flex items-center gap-1 rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10.5px] font-semibold text-amber-300 transition hover:bg-amber-500/20"
                      title="Smooth glide to Reddit/Facebook community proof"
                    >
                      <span>💬 Social Proof</span>
                    </button>
                    <button
                      onClick={() => {
                        const iframe = document.querySelector('iframe');
                        if (iframe?.contentWindow) {
                          iframe.contentWindow.location.hash = '#call-basant';
                        }
                      }}
                      className="flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
                      title="Smooth glide to founder contact"
                    >
                      <span>📞 Contact</span>
                    </button>
                    <div className="mx-1 h-3.5 w-[1px] bg-slate-700" />
                    <div className="font-mono text-[10px] text-slate-400">1 of 1 · Outreach</div>
                  </div>
                </div>

                {/* Email Header */}
                <div className="shrink-0 border-b border-[#222428] bg-[#111214] px-6 py-3.5">
                  <div className="mb-2.5 flex items-start justify-between gap-4">
                    <h2 className="text-sm font-bold leading-snug text-slate-100 md:text-base">
                      [CONFIDENTIAL PROPOSAL] Private Website &amp; Digital Ordering Draft for{' '}
                      {activePreset.name}
                    </h2>
                    <span className="shrink-0 rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                      Inbox
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-xs font-black text-slate-950 shadow">
                        S
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">Sunya | Basant</span>
                          <span className="font-mono text-[11px] text-slate-400">
                            &lt;iiambasant@gmail.com&gt;
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <span>to: {activePreset.toEmail}</span>
                          <span className="text-slate-600">·</span>
                          <span className="font-mono text-emerald-400">
                            🔒 Standard TLS Encryption
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs text-slate-400">
                      <span className="font-mono text-[10px] text-slate-500">
                        9:41 AM (just now)
                      </span>
                      <Star className="h-3.5 w-3.5 cursor-pointer hover:text-amber-400" />
                      <CornerUpLeft className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                      <MoreVertical className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                    </div>
                  </div>
                </div>

                {/* Email HTML Body (Iframe) */}
                <div className="flex-1 overflow-hidden bg-[#070b13]">
                  <iframe
                    key={iframeKey}
                    src={previewUrl}
                    className="h-full w-full border-0"
                    title="Gmail Desktop Email Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Plain Desktop Frame */}
        {device === 'desktop' && (
          <div
            className="flex w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl transition-all duration-300"
            style={{ maxWidth: deviceWidths.desktop, height: '88vh' }}
          >
            {/* Desktop Browser Top bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 font-mono text-[11px] text-slate-400">
                <Mail className="h-3 w-3 text-blue-400" />
                <span>Webmail Client · Clean Desktop Viewport</span>
              </div>
              <div className="w-12" />
            </div>
            <iframe
              key={iframeKey}
              src={previewUrl}
              className="w-full flex-1 border-0 bg-[#070b13]"
              title="Desktop Email Preview"
            />
          </div>
        )}

        {/* 3. Mobile Phone Chassis (iPhone & Android) */}
        {(device === 'iphone' || device === 'pixel') && (
          <div
            className="relative flex flex-col overflow-hidden rounded-[48px] border-[10px] border-slate-800 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-300"
            style={{
              width: deviceWidths[device],
              height: '840px',
              boxShadow: '0 0 0 2px #334155, 0 30px 70px -10px rgba(0,0,0,0.95)',
            }}
          >
            {/* Smartphone Notch / Dynamic Island */}
            <div className="relative z-20 flex h-7 shrink-0 items-center justify-center bg-slate-950">
              <div className="flex h-4 w-24 items-center justify-between rounded-full border border-slate-800/80 bg-black px-3">
                <span className="h-2 w-2 rounded-full border border-slate-800 bg-slate-900" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-950" />
              </div>
            </div>

            {/* Mobile Header Status Bar */}
            <div className="flex shrink-0 select-none items-center justify-between bg-slate-950 px-6 py-1 text-[10px] font-semibold text-slate-400">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span>5G</span>
                <span>📶</span>
                <span>100% 🔋</span>
              </div>
            </div>

            {/* Mail App Top Bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/20 text-[10px] font-bold text-blue-400">
                  S
                </div>
                <div>
                  <div className="text-[11px] font-bold leading-tight text-white">
                    Sunya &lt;iiambasant@gmail.com&gt;
                  </div>
                  <div className="text-[10px] leading-tight text-slate-400">
                    to: {activePreset.toEmail}
                  </div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-slate-500">Just now</span>
            </div>

            {/* Rendered Email Content via Iframe */}
            <iframe
              key={iframeKey}
              src={previewUrl}
              className="w-full flex-1 border-0 bg-[#070b13]"
              title="Mobile Email Preview"
            />

            {/* Mobile Home Bar Pill */}
            <div className="z-20 flex h-5 shrink-0 items-center justify-center bg-slate-950">
              <div className="h-1 w-32 rounded-full bg-slate-700" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
