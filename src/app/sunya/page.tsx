'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Cpu,
  Dumbbell,
  ExternalLink,
  Flame,
  Globe,
  HelpCircle,
  Laptop,
  Loader2,
  Mail,
  MapPin,
  Maximize2,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Send,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  UtensilsCrossed,
  Zap,
} from 'lucide-react';

interface BusinessLead {
  placeId: string;
  name: string;
  category: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  reviewsCount: number;
  slug: string;
}

interface EmailResult {
  subject: string;
  bodyText: string;
  html: string;
  rawHtml: string;
}

interface WebsiteResult {
  previewUrl: string;
  templateType: string;
  copy?: any;
}

interface WhatsAppResult {
  phone: string;
  message: string;
  directUrl: string;
}

export default function SunyaToolPage() {
  // Query & Generation State
  const [query, setQuery] = useState('gym of sankhamul');
  const [generateEmail, setGenerateEmail] = useState(true);
  const [generateWebsite, setGenerateWebsite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recipient Contact State (Editable)
  const [recipientEmail, setRecipientEmail] = useState('info@shankhamulfitness.com.np');
  const [recipientPhone, setRecipientPhone] = useState('+977 9867333080');

  // Generated Payload
  const [business, setBusiness] = useState<BusinessLead | null>(null);
  const [emailData, setEmailData] = useState<EmailResult | null>(null);
  const [websiteData, setWebsiteData] = useState<WebsiteResult | null>(null);
  const [whatsAppData, setWhatsApp] = useState<WhatsAppResult | null>(null);

  // Mobile View State
  const [mobileMode, setMobileMode] = useState<'email' | 'website'>('email');
  const [deviceModel, setDeviceModel] = useState<'iphone' | 'pixel'>('iphone');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Direct Send Email State
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [mailSendStatus, setMailSendStatus] = useState<{
    success: boolean;
    message: string;
    simulated?: boolean;
    timestamp?: string;
  } | null>(null);

  // Quick Preset Suggestions
  const quickPresets = [
    { label: '🏋️‍♂️ Gym of Sankhamul', query: 'gym of sankhamul', email: true, website: false },
    { label: '🥟 Momo in New Road', query: 'momo in new road', email: true, website: true },
    {
      label: '🌸 Flower Shop in Sankhamul',
      query: 'flower shop in sankhamul',
      email: true,
      website: false,
    },
    { label: '☕ Cafe in Boudha', query: 'cafe in boudha', email: true, website: true },
    { label: '💆 Spa in Jhamsikhel', query: 'spa in jhamsikhel', email: true, website: true },
  ];

  // Auto-run initial query on mount
  useEffect(() => {
    handleGenerate('gym of sankhamul', true, false);
  }, []);

  async function handleGenerate(
    searchQuery = query,
    genEmail = generateEmail,
    genWebsite = generateWebsite,
    customMail = recipientEmail,
    customNum = recipientPhone,
  ) {
    if (!genEmail && !genWebsite) {
      setError('Please select at least one format: Email Template or Website.');
      return;
    }

    setLoading(true);
    setError(null);
    setMailSendStatus(null);

    try {
      const res = await fetch('/api/sunya/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          generateEmail: genEmail,
          generateWebsite: genWebsite,
          customEmail: customMail,
          customPhone: customNum,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate materials');
      }

      setBusiness(data.business);
      setEmailData(data.email);
      setWebsiteData(data.website);
      setWhatsApp(data.whatsapp);

      // Update editable contact fields if default returned
      if (data.business) {
        setRecipientEmail(data.business.email || 'contact@business.com.np');
        setRecipientPhone(data.business.phone || '+977 9867333080');
      }

      // Automatically select appropriate mobile view tab
      if (genEmail && !genWebsite) {
        setMobileMode('email');
      } else if (!genEmail && genWebsite) {
        setMobileMode('website');
      } else {
        // Both enabled, default to email unless website only was previously active
        setMobileMode((prev) => (prev === 'website' ? 'website' : 'email'));
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  // Handle Direct Email Dispatch via SMTP
  async function handleSendDirectEmail() {
    if (!recipientEmail || !business) {
      setError('Please provide a valid recipient email address.');
      return;
    }

    setIsSendingMail(true);
    setMailSendStatus(null);

    try {
      const res = await fetch('/api/outreach/send-direct-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: recipientEmail,
          businessName: business.name,
          district: business.district,
          category: business.category,
          previewUrl: websiteData?.previewUrl || `/preview/${business.slug}`,
          slug: business.slug,
          specificDetail: business.category,
          isConfidential: true,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Dispatch failed');
      }

      setMailSendStatus({
        success: true,
        simulated: data.simulated,
        message: data.simulated
          ? `Simulated Dispatch: SMTP credentials not provided. Logged test to console.`
          : `Email sent via Gmail SMTP to ${recipientEmail}! Message ID: ${data.messageId || 'Delivered'}`,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (err: any) {
      setMailSendStatus({
        success: false,
        message: err.message || 'Error dispatching email.',
      });
    } finally {
      setIsSendingMail(false);
    }
  }

  // Handle WhatsApp Direct Send
  function handleOpenWhatsApp() {
    if (!whatsAppData || !whatsAppData.directUrl) return;

    // Recalculate direct URL with the current edited phone
    const cleanDigits = recipientPhone.replace(/[^0-9]/g, '');
    const nepPhone = cleanDigits.startsWith('977')
      ? cleanDigits
      : cleanDigits.length === 10
        ? `977${cleanDigits}`
        : cleanDigits;

    const url = `https://wa.me/${nepPhone}?text=${encodeURIComponent(whatsAppData.message)}`;
    window.open(url, '_blank');
  }

  function copyToClipboard(text: string, fieldName: string) {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 px-5 py-3.5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-md shadow-blue-500/10 transition-colors group-hover:border-blue-500/40">
                <img
                  src="/sunya-mark-white.png"
                  alt="Sunya"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-white">Sunya</span>
                  <span className="font-serif text-xs font-semibold text-blue-400">शून्य</span>
                  <span className="rounded-full border border-blue-500/20 bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                    Laptop Tool
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-400">
                  Kathmandu Valley Autonomous Outreach Engine
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-400 md:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-300">Backend: Antigravity (Port 3005)</span>
              <span className="text-slate-600">|</span>
              <span className="font-semibold text-emerald-400">Zero-Fee Engine</span>
            </div>

            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Cpu className="h-3.5 w-3.5 text-blue-400" />
              <span>Admin</span>
            </Link>

            <Link
              href="/email-preview"
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-amber-400" />
              <span>Email Studio</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left / Control Panel: Search, Toggles, Contact Details, Direct Send (5 cols) */}
          <div className="space-y-6 lg:col-span-6">
            {/* 1. Search Box Card */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
                    <Search className="h-4 w-4" />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                    Local Business Search
                  </h2>
                </div>
                <span className="text-xs font-medium text-slate-500">Kathmandu Valley</span>
              </div>

              {/* Search Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGenerate();
                }}
                className="space-y-3"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., gym of sankhamul, momo in new road, flower shop..."
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="absolute right-12 top-1/2 -translate-y-1/2 px-2 text-xs text-slate-500 hover:text-slate-300"
                    >
                      ✕
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Preset Suggestions */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400">Instant Presets:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setQuery(preset.query);
                          setGenerateEmail(preset.email);
                          setGenerateWebsite(preset.website);
                          handleGenerate(preset.query, preset.email, preset.website);
                        }}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] transition-all ${
                          query.toLowerCase() === preset.query.toLowerCase()
                            ? 'border-blue-500/50 bg-blue-600/20 font-bold text-blue-300'
                            : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Generation Mode Checkboxes */}
                <div className="border-t border-slate-800/80 pt-2">
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Generation Options (Choose format):
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Checkbox: Email Template */}
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all ${
                        generateEmail
                          ? 'border-amber-500/40 bg-amber-500/10 text-white'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={generateEmail}
                        onChange={(e) => setGenerateEmail(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500/20"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                          <Mail className="h-3.5 w-3.5" />
                          <span>Email Template</span>
                        </div>
                        <p className="text-[10px] leading-tight text-slate-400">
                          Confidential high-converting audit & pitch for the owner.
                        </p>
                      </div>
                    </label>

                    {/* Checkbox: Website Template */}
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all ${
                        generateWebsite
                          ? 'border-blue-500/40 bg-blue-500/10 text-white'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={generateWebsite}
                        onChange={(e) => setGenerateWebsite(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500/20"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
                          <Globe className="h-3.5 w-3.5" />
                          <span>Website Template</span>
                        </div>
                        <p className="text-[10px] leading-tight text-slate-400">
                          Live mobile-optimized website demo ready for customer.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading || (!generateEmail && !generateWebsite)}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Generating Lead & Artifacts...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-blue-200" />
                      <span>
                        Generate{' '}
                        {generateEmail && generateWebsite
                          ? 'Email & Website'
                          : generateEmail
                            ? 'Email Template'
                            : 'Website'}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-300">
                <ShieldAlert className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* 3. Discovered Business Details & Direct Outreach Configuration */}
            {business && (
              <div className="space-y-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                {/* Header info */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-400">
                        {business.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="h-3 w-3 text-slate-500" />
                        {business.district}
                      </span>
                    </div>
                    <h3 className="mt-1 text-base font-bold text-white">{business.name}</h3>
                    <p className="text-xs text-slate-400">{business.address}</p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-bold text-amber-400">
                      <Star className="h-4 w-4 fill-amber-400" />
                      <span>{business.rating}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {business.reviewsCount} verified reviews
                    </div>
                  </div>
                </div>

                {/* Direct Contact & Outreach Form */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                    <span>Direct Outreach Channels</span>
                    <span className="text-[10px] font-normal lowercase text-slate-400">
                      editable before sending
                    </span>
                  </div>

                  {/* Channel A: Email Input & Direct Send */}
                  <div className="space-y-2.5 rounded-xl border border-amber-500/20 bg-amber-950/10 p-3.5">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                        <Mail className="h-3.5 w-3.5" />
                        <span>Recipient Email</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setRecipientEmail('iiambasant@gmail.com')}
                        className="text-[10px] text-amber-400 underline hover:text-amber-300"
                      >
                        Use my email (test)
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="recipient@business.com.np"
                        className="flex-1 rounded-lg border border-slate-700/80 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSendDirectEmail}
                        disabled={isSendingMail || !emailData}
                        className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-amber-600/20 transition-all hover:bg-amber-500 disabled:opacity-50"
                      >
                        {isSendingMail ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5" />
                            <span>Send Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Email Dispatch Status Feedback */}
                    {mailSendStatus && (
                      <div
                        className={`rounded-lg border p-2.5 text-xs ${
                          mailSendStatus.success
                            ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300'
                            : 'border-red-500/30 bg-red-950/30 text-red-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold">
                          {mailSendStatus.success ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
                          )}
                          <span>{mailSendStatus.message}</span>
                        </div>
                        {mailSendStatus.timestamp && (
                          <div className="mt-0.5 text-[10px] text-slate-400">
                            Status logged at {mailSendStatus.timestamp}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Channel B: WhatsApp Input & Direct Message */}
                  <div className="space-y-2.5 rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-3.5">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Recipient WhatsApp / Phone</span>
                      </label>
                      <span className="text-[10px] text-emerald-400">Nepal (+977)</span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        placeholder="+977 9867333080"
                        className="flex-1 rounded-lg border border-slate-700/80 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleOpenWhatsApp}
                        disabled={!whatsAppData}
                        className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 disabled:opacity-50"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Direct WhatsApp</span>
                      </button>
                    </div>

                    {/* Pre-written WhatsApp Message Accordion Preview */}
                    {whatsAppData && (
                      <div className="pt-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-medium">Pre-composed pitch:</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(whatsAppData.message, 'whatsapp')}
                            className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300"
                          >
                            {copiedField === 'whatsapp' ? (
                              <Check className="h-3 w-3 text-emerald-400" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                            <span>{copiedField === 'whatsapp' ? 'Copied' : 'Copy Text'}</span>
                          </button>
                        </div>
                        <div className="mt-1 max-h-24 overflow-y-auto whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950/70 p-2 font-sans text-[11px] text-slate-300">
                          {whatsAppData.message}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Subject & Quick Copy Toolbar */}
                {emailData && (
                  <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-400">Email Subject:</span>
                      <button
                        onClick={() => copyToClipboard(emailData.subject, 'subject')}
                        className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300"
                      >
                        {copiedField === 'subject' ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span>{copiedField === 'subject' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-slate-200">
                      {emailData.subject}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => copyToClipboard(emailData.html, 'html')}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 py-1.5 text-[11px] font-semibold text-slate-300 transition-colors hover:bg-slate-800"
                      >
                        {copiedField === 'html' ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span>{copiedField === 'html' ? 'Copied HTML' : 'Copy Full HTML'}</span>
                      </button>

                      <button
                        onClick={() => copyToClipboard(emailData.bodyText, 'text')}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 py-1.5 text-[11px] font-semibold text-slate-300 transition-colors hover:bg-slate-800"
                      >
                        {copiedField === 'text' ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span>
                          {copiedField === 'text' ? 'Copied Plain Text' : 'Copy Plain Text'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right / Interactive Mobile Viewport: Authentic Smartphone Frame (6 cols) */}
          <div className="flex flex-col items-center lg:col-span-6">
            {/* Viewport Control Bar */}
            <div className="mb-3 flex w-full max-w-[420px] items-center justify-between">
              {/* Tab Switcher (if both Email & Website are available) */}
              <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1">
                <button
                  type="button"
                  onClick={() => setMobileMode('email')}
                  disabled={!emailData}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    mobileMode === 'email'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-200 disabled:opacity-40'
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email View</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMode('website')}
                  disabled={!websiteData}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    mobileMode === 'website'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-400 hover:text-slate-200 disabled:opacity-40'
                  }`}
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Website View</span>
                </button>
              </div>

              {/* External Link */}
              <div className="flex items-center gap-2">
                {mobileMode === 'email' && emailData && business && (
                  <a
                    href={`/api/email-preview/raw?business=${encodeURIComponent(business.name)}&category=${encodeURIComponent(business.category)}&slug=${business.slug}&district=${business.district}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
                    title="Open Raw Email in New Tab"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Raw Tab</span>
                  </a>
                )}
                {mobileMode === 'website' && websiteData && (
                  <a
                    href={websiteData.previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
                    title="Open Fullscreen Website"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Live Tab</span>
                  </a>
                )}
              </div>
            </div>

            {/* Smartphone Outer Chassis Mockup */}
            <div className="relative w-full max-w-[390px] rounded-[52px] border-4 border-slate-700 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-3 shadow-2xl shadow-black/80">
              {/* Hardware buttons on chassis */}
              <div className="absolute -left-4 top-24 h-12 w-1.5 rounded-l-md bg-slate-600 shadow-sm" />
              <div className="absolute -left-4 top-40 h-12 w-1.5 rounded-l-md bg-slate-600 shadow-sm" />
              <div className="absolute -right-4 top-32 h-16 w-1.5 rounded-r-md bg-slate-600 shadow-sm" />

              {/* Inner Screen Bezel */}
              <div className="relative flex h-[720px] w-full flex-col overflow-hidden rounded-[42px] border border-slate-900 bg-slate-950">
                {/* Phone Top Notch / Dynamic Island */}
                <div className="relative z-30 flex h-11 w-full shrink-0 select-none items-center justify-between bg-slate-950 px-6 pt-2 text-white">
                  <span className="text-[11px] font-bold tracking-tight">9:41</span>
                  {/* Dynamic Island pill */}
                  <div className="flex h-5 w-24 items-center justify-center gap-1.5 rounded-full border border-slate-800/60 bg-black">
                    <div className="h-2 w-2 rounded-full border border-slate-700 bg-slate-900" />
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500/40" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                    <span>5G</span>
                    <div className="flex h-2.5 w-4 items-center rounded-sm border border-slate-300 p-0.5">
                      <div className="h-full w-full rounded-[1px] bg-white" />
                    </div>
                  </div>
                </div>

                {/* Inside Screen Content */}
                <div className="relative flex w-full flex-1 flex-col overflow-hidden bg-slate-950">
                  {/* Active Mode A: Email View */}
                  {mobileMode === 'email' && (
                    <div className="flex h-full flex-1 flex-col overflow-hidden">
                      {/* Mobile Email App Header */}
                      <div className="border-b border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-semibold text-slate-200">Sunya Mail Client</span>
                          <span className="text-[10px]">Just now</span>
                        </div>
                        <div className="mt-1">
                          <div className="text-[10px] text-slate-400">
                            <span className="font-medium text-slate-500">From:</span> Sunya Agency
                            &lt;iiambasant@gmail.com&gt;
                          </div>
                          <div className="text-[10px] text-slate-400">
                            <span className="font-medium text-slate-500">To:</span>{' '}
                            {recipientEmail || 'business@owner.com'}
                          </div>
                          <div className="mt-0.5 truncate text-[11px] font-bold text-amber-300">
                            {emailData ? emailData.subject : 'Confidential Local Lead Proposal'}
                          </div>
                        </div>
                      </div>

                      {/* Iframe displaying formatted Email */}
                      <div className="h-full w-full flex-1 overflow-hidden bg-slate-950">
                        {emailData && business ? (
                          <iframe
                            key={`email-${business.placeId}`}
                            src={`/api/email-preview/raw?business=${encodeURIComponent(business.name)}&category=${encodeURIComponent(business.category)}&slug=${business.slug}&district=${business.district}&confidential=true`}
                            className="h-full w-full border-none bg-slate-950"
                            title="Sunya Mobile Email View"
                          />
                        ) : loading ? (
                          <div className="flex h-full flex-col items-center justify-center gap-2 text-xs text-slate-400">
                            <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
                            <span>Rendering cold email pitch...</span>
                          </div>
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-xs text-slate-500">
                            <Mail className="mb-2 h-8 w-8 text-slate-600" />
                            <span>
                              No email template generated yet. Check &quot;Email Template&quot; and
                              click Generate.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Active Mode B: Website View */}
                  {mobileMode === 'website' && (
                    <div className="flex h-full flex-1 flex-col overflow-hidden">
                      {/* Mobile Safari Browser Bar */}
                      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/90 px-3 py-2">
                        <div className="flex flex-1 items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-[11px] text-slate-300">
                          <span className="truncate text-slate-400">
                            sunya.np/preview/{business?.slug || 'lead'}
                          </span>
                          <span className="font-mono text-[10px] text-emerald-400">🔒</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const frame = document.getElementById(
                              'sunya-web-iframe',
                            ) as HTMLIFrameElement;
                            if (frame) frame.src = frame.src;
                          }}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Reload Mobile Page"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Iframe displaying Live Website Template */}
                      <div className="h-full w-full flex-1 overflow-hidden bg-slate-950">
                        {websiteData ? (
                          <iframe
                            id="sunya-web-iframe"
                            key={`website-${business?.placeId}`}
                            src={websiteData.previewUrl}
                            className="h-full w-full border-none bg-slate-950"
                            title="Sunya Mobile Website View"
                          />
                        ) : loading ? (
                          <div className="flex h-full flex-col items-center justify-center gap-2 text-xs text-slate-400">
                            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                            <span>Building responsive website demo...</span>
                          </div>
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-xs text-slate-500">
                            <Globe className="mb-2 h-8 w-8 text-slate-600" />
                            <span>
                              No website generated. Tick &quot;Website Template&quot; and click
                              Generate to view live website in phone.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="flex h-6 w-full shrink-0 items-center justify-center bg-slate-950">
                  <div className="h-1 w-32 rounded-full bg-slate-700" />
                </div>
              </div>
            </div>

            {/* Mobile View Caption */}
            <div className="mt-3 flex items-center gap-1.5 text-center text-xs text-slate-400">
              <Smartphone className="h-3.5 w-3.5 text-slate-500" />
              <span>Interactive Phone Preview (390 × 844 iPhone Frame)</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
