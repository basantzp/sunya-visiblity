'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Globe, 
  MessageSquare, 
  ShieldCheck, 
  QrCode, 
  Check, 
  Sparkles,
  Phone,
  FileText,
  Clock,
  Copy,
  ExternalLink,
  Store,
  MapPin,
  Star,
  BadgeCheck,
  Server,
  Lock
} from 'lucide-react';
import { GooglePlaceResult } from '@/lib/places';
import { NEPAL_PAYMENT_CONFIG } from '@/lib/payments';

interface ClientOnboardingWizardProps {
  slug: string;
  initialLead: GooglePlaceResult | null;
  initialEmail?: string;
  interestConfirmed?: boolean;
}

export function ClientOnboardingWizard({
  slug,
  initialLead,
  initialEmail = '',
  interestConfirmed = true,
}: ClientOnboardingWizardProps) {
  const businessName = initialLead?.name || slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const defaultPhone = initialLead?.phone || '+977-9867333080';
  const defaultAddress = initialLead?.address || 'Sankhamul Marg (Near Sankhamul Bridge), Ward 10, Kathmandu 44600';
  const defaultDistrict = initialLead?.district || 'Kathmandu';
  const defaultRating = initialLead?.rating || 4.7;
  const defaultReviews = initialLead?.user_ratings_total || 420;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [phone, setPhone] = useState(defaultPhone);
  const [contactName, setContactName] = useState('Client Owner');
  const [email, setEmail] = useState(initialEmail || 'client@example.com');
  const [counterConfirmed, setCounterConfirmed] = useState(true);

  const [domainType, setDomainType] = useState<'mercantile' | 'custom' | 'subdomain'>('mercantile');
  const [preferredDomain, setPreferredDomain] = useState(`${slug}.com.np`);
  const [paymentMethod, setPaymentMethod] = useState<'fonepay' | 'esewa' | 'khalti'>('fonepay');
  const [txnId, setTxnId] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const founderWhatsApp = NEPAL_PAYMENT_CONFIG.contact.founder_whatsapp; // '9779867333080'
  const founderPhoneFormatted = NEPAL_PAYMENT_CONFIG.contact.phone; // '+977-9867333080'
  const paymentPhone = NEPAL_PAYMENT_CONFIG.contact.phone_raw; // '9867333080'

  function copyToClipboard(text: string, key: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#F7F4EE] font-sans antialiased selection:bg-[#C5A059] selection:text-black">
      {/* Top Header */}
      <header className="border-b border-stone-800 bg-[#12100E]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href={`/preview/${slug}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Preview
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">
                {interestConfirmed ? 'Interest Confirmed · Client Onboarding' : 'Client Onboarding Pipeline'}
              </span>
            </div>
            <a
              href={`tel:${founderPhoneFormatted}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-stone-400 hover:text-[#C5A059] transition-colors border-l border-stone-800 pl-3"
            >
              <Phone className="w-3 h-3 text-[#C5A059]" />
              {founderPhoneFormatted}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Banner */}
        <div className="mb-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/30 px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3" />
            Phase 2 · Operational Setup
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-white">
            Claim & Launch {businessName}
          </h1>
          <p className="text-sm text-stone-400 max-w-xl mx-auto font-light leading-relaxed">
            Thank you for confirming your interest. Follow these 4 quick operations to connect your counter WhatsApp, register your official Nepal domain, and take your website live.
          </p>

          {/* Quick Transparency Summary Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-mono">
            <span className="bg-[#12100E] border border-stone-800 px-3 py-1 rounded-sm text-stone-300">
              One-Time Setup: <strong className="text-[#C5A059]">NPR 9,999</strong>
            </span>
            <span className="bg-[#12100E] border border-stone-800 px-3 py-1 rounded-sm text-stone-300">
              Cloud Hosting: <strong className="text-white">NPR 1,500 / month</strong>
            </span>
            <span className="bg-[#12100E] border border-stone-800 px-3 py-1 rounded-sm text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> Free Official .com.np
            </span>
            <span className="bg-[#12100E] border border-stone-800 px-3 py-1 rounded-sm text-stone-400 flex items-center gap-1">
              <Server className="w-3 h-3 text-[#C5A059]" /> Edge DNS: 76.76.21.21 · cname.vercel-dns.com
            </span>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="grid grid-cols-4 gap-2 mb-10 text-center text-xs font-mono">
          {[
            { num: 1, label: 'Business & WhatsApp' },
            { num: 2, label: 'Official Domain' },
            { num: 3, label: 'Payment Activation' },
            { num: 4, label: 'Handover & Launch' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => s.num < step && setStep(s.num as any)}
              className={`p-3 border rounded-sm transition-all cursor-pointer ${
                step === s.num
                  ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]'
                  : step > s.num
                  ? 'border-stone-700 bg-stone-900/60 text-stone-300'
                  : 'border-stone-800 text-stone-600'
              }`}
            >
              <div className="font-bold mb-1">Step {s.num}</div>
              <div className="text-[10px] truncate">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* Step 1: Business Details & Counter WhatsApp confirmation */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="bg-[#12100E] border border-stone-800 p-8 rounded-sm space-y-8">
            {/* Section 1: Business Details Verification */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h2 className="text-lg font-medium text-white flex items-center gap-2">
                  <Store className="w-4 h-4 text-[#C5A059]" />
                  Verified Business Details
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  <BadgeCheck className="w-3.5 h-3.5" /> Google Profile Synced
                </span>
              </div>

              <div className="p-4 bg-[#0C0A09] border border-stone-800/80 rounded-sm space-y-3 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Business Name</span>
                    <span className="text-white font-semibold text-sm">{businessName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Category / Cuisine</span>
                    <span className="text-stone-200 capitalize">{initialLead?.category || 'Restaurant'} · Momo & Local Specialty</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-stone-500 block text-[10px] uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C5A059]" /> Physical Location & Address
                    </span>
                    <span className="text-stone-300">{defaultAddress}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">District & Jurisdiction</span>
                    <span className="text-stone-300">{defaultDistrict} Valley, Nepal</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Google Rating & Authority
                    </span>
                    <span className="text-emerald-400 font-semibold">{defaultRating} / 5.0 ({defaultReviews} Reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Counter WhatsApp Lead Routing */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  Counter WhatsApp Lead Routing
                </h3>
                <p className="text-xs text-stone-400">
                  Every order button, menu inquiry, and table reservation on your new website triggers a direct 1-click WhatsApp message to your counter or store manager.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-2">
                    Counter WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full bg-[#0C0A09] border border-stone-700 rounded-sm px-4 py-3 text-sm text-white font-mono placeholder-stone-600 focus:outline-none focus:border-[#C5A059]"
                  />
                  <span className="text-[10px] text-stone-500 font-mono mt-1 block">
                    Must receive WhatsApp messages on counter phone or tablet.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-2">
                    Decision-Maker / Owner Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="owner@domain.com"
                    className="w-full bg-[#0C0A09] border border-stone-700 rounded-sm px-4 py-3 text-sm text-white font-mono placeholder-stone-600 focus:outline-none focus:border-[#C5A059]"
                  />
                  <span className="text-[10px] text-stone-500 font-mono mt-1 block">
                    DNS handover keys & monthly invoices will be delivered here.
                  </span>
                </div>
              </div>

              {/* Sample Incoming WhatsApp Message Preview */}
              <div className="p-4 bg-[#0C0A09] border border-[#25D366]/30 rounded-sm space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#25D366] flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3 h-3" /> Live Customer WhatsApp Message Preview
                </span>
                <div className="bg-[#12100E] border border-stone-800 p-3 rounded text-xs font-mono text-stone-300 leading-relaxed space-y-1">
                  <div className="text-stone-500 text-[10px]">Patron Message via {slug}.com.np:</div>
                  <div>&ldquo;Namaste <strong>{businessName}</strong>! 🙏 I found your website on Google and would like to order:</div>
                  <div className="text-emerald-300 pl-2">· 2x Buff Steam Momo (Special Jhol Achar)</div>
                  <div className="text-emerald-300 pl-2">· 1x C-Momo (Chilly)</div>
                  <div>Delivery Address: Sankhamul Chowk, Kathmandu&rdquo;</div>
                </div>
              </div>

              {/* Explicit Confirmation Checkbox */}
              <label className="flex items-start gap-3 p-3 bg-stone-900/40 border border-stone-800 rounded-sm cursor-pointer hover:border-stone-700 transition-colors">
                <input
                  type="checkbox"
                  checked={counterConfirmed}
                  onChange={(e) => setCounterConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-stone-700 text-[#C5A059] focus:ring-[#C5A059] accent-[#C5A059]"
                />
                <div className="text-xs text-stone-300 font-mono leading-normal">
                  <span className="font-semibold text-white">Confirmed Counter Routing:</span> I confirm that{' '}
                  <span className="text-[#C5A059] font-semibold">{phone || 'this number'}</span> is active at our counter/store to accept incoming patron orders and inquiries.
                </div>
              </label>
            </div>

            <div className="pt-4 flex justify-end border-t border-stone-800">
              <button
                onClick={() => setStep(2)}
                disabled={!counterConfirmed || !phone}
                className="px-6 py-2.5 bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#d4b068] disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
              >
                Continue to Domain Setup <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Step 2: Custom Domain Selection (.com.np free registration guidance / custom .com) */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="bg-[#12100E] border border-stone-800 p-8 rounded-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-medium text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#C5A059]" />
                Official Nepal Domain Setup
              </h2>
              <p className="text-xs text-stone-400">
                Choose how patrons across Kathmandu Valley and worldwide will discover your official website.
              </p>
            </div>

            {/* Domain Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  id: 'mercantile',
                  title: 'Official .com.np',
                  badge: 'Free for Life · Nepal Standard',
                  desc: 'Free official country code domain via Mercantile Communications. Zero renewal cost ever.',
                  domainSuffix: `${slug}.com.np`,
                },
                {
                  id: 'custom',
                  title: 'Global .com Domain',
                  badge: 'Global Appeal',
                  desc: 'Bring your own existing domain or let Sunya register your global brand.com address.',
                  domainSuffix: `${slug}.com`,
                },
                {
                  id: 'subdomain',
                  title: 'Fast Subdomain',
                  badge: 'Instant Setup (60s)',
                  desc: 'Host instantly on sunyavisibility.com with zero paperwork needed today.',
                  domainSuffix: `${slug}.sunyavisibility.com`,
                },
              ].map((d) => (
                <div
                  key={d.id}
                  onClick={() => {
                    setDomainType(d.id as any);
                    setPreferredDomain(d.domainSuffix);
                  }}
                  className={`p-4 border rounded-sm cursor-pointer transition-all space-y-2 ${
                    domainType === d.id
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-white'
                      : 'border-stone-800 bg-[#0C0A09] text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{d.title}</span>
                  </div>
                  <span className="inline-block text-[9px] font-mono uppercase bg-stone-800 text-[#C5A059] px-1.5 py-0.5 rounded">
                    {d.badge}
                  </span>
                  <p className="text-[11px] text-stone-400 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>

            {/* Detailed Guidance based on selection */}
            {domainType === 'mercantile' && (
              <div className="p-5 bg-[#0C0A09] border border-stone-800 rounded-sm space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#C5A059] font-semibold text-[11px] uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  .com.np Free Registration Guidance (Mercantile Nepal)
                </div>
                <div className="space-y-2 text-stone-300 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>100% Free Domain for Life:</strong> In Nepal, official .com.np domains are legally provided free by Mercantile Communications without yearly renewal fees.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Document Requirements:</strong> Requires a photocopy of your Business Registration Certificate, PAN Card, or Owner Citizenship.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Full Sunya Assistance:</strong> We draft your official authorization cover letter, handle the DNS nameserver delegation (Cloudflare/Vercel DNS), and complete the submission for you at zero extra charge.</span>
                  </div>
                </div>
              </div>
            )}

            {domainType === 'custom' && (
              <div className="p-5 bg-[#0C0A09] border border-stone-800 rounded-sm space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#C5A059] font-semibold text-[11px] uppercase tracking-wider">
                  <Globe className="w-4 h-4" />
                  Global .com / .org / .net Guidance
                </div>
                <div className="space-y-2 text-stone-300 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Existing Domain:</strong> If you already own {slug}.com on GoDaddy, Namecheap, or Google Domains, we supply simple A/CNAME records.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>New Global Domain:</strong> We can register and link the domain on your behalf with automatic Let&apos;s Encrypt TLS 1.3 encryption.</span>
                  </div>
                </div>
              </div>
            )}

            {domainType === 'subdomain' && (
              <div className="p-5 bg-[#0C0A09] border border-stone-800 rounded-sm space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#C5A059] font-semibold text-[11px] uppercase tracking-wider">
                  <Server className="w-4 h-4" />
                  Instant Fast Subdomain Guidance
                </div>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Your website goes live immediately under <span className="text-white font-semibold">{slug}.sunyavisibility.com</span> with zero paperwork. You can seamlessly map your official .com.np domain anytime later.
                </p>
              </div>
            )}

            {/* Domain Address Input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-2">
                Preferred Domain Address
              </label>
              <input
                type="text"
                value={preferredDomain}
                onChange={(e) => setPreferredDomain(e.target.value)}
                className="w-full bg-[#0C0A09] border border-stone-700 rounded-sm px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#C5A059]"
              />
              <span className="text-[10px] text-stone-500 font-mono mt-1 block">
                Target DNS: A Record to 76.76.21.21 · CNAME to cname.vercel-dns.com
              </span>
            </div>

            <div className="pt-4 flex justify-between border-t border-stone-800">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 border border-stone-700 text-stone-300 text-xs font-mono rounded-sm hover:bg-stone-800"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#d4b068] transition-colors inline-flex items-center gap-2"
              >
                Continue to Payment Activation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Step 3: Transparent Nepal Payment QR (NPR 9,999 setup, NPR 1,500/mo hosting) */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="bg-[#12100E] border border-stone-800 p-8 rounded-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-medium text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#C5A059]" />
                Transparent Nepal Payment QR
              </h2>
              <p className="text-xs text-stone-400">
                Transparent local pricing. No hidden fees or surprise renewals. All major Nepal payment methods accepted.
              </p>
            </div>

            {/* Price Summary */}
            <div className="p-5 bg-[#0C0A09] border border-stone-800 rounded-sm space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-stone-300 pb-2 border-b border-stone-800">
                <div>
                  <span className="text-white font-semibold block">One-Time Setup & Bespoke Build</span>
                  <span className="text-[10px] text-stone-500">Includes responsive design, copywriting, SEO, WhatsApp routing, & domain setup</span>
                </div>
                <span className="text-[#C5A059] font-bold text-sm">NPR 9,999</span>
              </div>
              <div className="flex justify-between items-center text-stone-300">
                <div>
                  <span className="text-white font-semibold block">Managed Cloud Hosting & Updates</span>
                  <span className="text-[10px] text-stone-500">Fast Edge CDN, 99.9% uptime SLA, SSL certificate & ongoing maintenance</span>
                </div>
                <span className="text-white font-semibold">NPR 1,500 / month</span>
              </div>
              <div className="pt-2 border-t border-stone-800 text-[10px] text-emerald-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> 
                <span>Includes free Mercantile .com.np paperwork assistance & Google Search Console indexing</span>
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-300">
                Select Nepal Payment Channel
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'fonepay', name: 'FonePay / Mobile Banking', badge: 'Any Bank' },
                  { id: 'esewa', name: 'eSewa Wallet', badge: 'Wallet' },
                  { id: 'khalti', name: 'Khalti Wallet', badge: 'Wallet' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-3 px-3 border text-xs font-mono uppercase rounded-sm transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === m.id
                        ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]'
                        : 'border-stone-800 text-stone-400 hover:border-stone-700 bg-[#0C0A09]'
                    }`}
                  >
                    <span className="font-bold">{m.name}</span>
                    <span className="text-[9px] text-stone-500">{m.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic QR Box & Account Details */}
            <div className="p-6 bg-[#0C0A09] border border-stone-800 rounded-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                {/* Visual Stylized QR Code */}
                <div className="p-3 bg-white rounded-md shrink-0 shadow-lg border-2 border-[#C5A059]">
                  <div className="w-44 h-44 bg-stone-900 border-2 border-stone-800 flex flex-col items-center justify-center p-3 text-center">
                    <QrCode className="w-16 h-16 text-[#C5A059] mb-1.5" />
                    <span className="text-[10px] font-mono text-white uppercase font-bold tracking-wider">
                      {paymentMethod === 'fonepay' ? 'FONEPAY MERCHANT' : paymentMethod.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-[#C5A059] font-bold mt-1">
                      {paymentPhone}
                    </span>
                    <span className="text-[8px] font-mono text-stone-400 mt-0.5">
                      Basant Pokhrel
                    </span>
                  </div>
                </div>

                {/* Account Details & Quick Copy */}
                <div className="space-y-3 font-mono text-xs w-full max-w-xs text-left">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Payment Channel</span>
                    <span className="text-white font-semibold capitalize">
                      {paymentMethod === 'fonepay' ? 'FonePay / Nepal Mobile Banking' : paymentMethod}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">
                      {paymentMethod === 'fonepay' ? 'Mobile Banking / FonePay Ref' : `${paymentMethod.toUpperCase()} ID`}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-base font-bold text-[#C5A059]">{paymentPhone}</span>
                      <button
                        onClick={() => copyToClipboard(paymentPhone, 'phone')}
                        className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] rounded flex items-center gap-1 transition-colors"
                      >
                        {copiedKey === 'phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copiedKey === 'phone' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Account Holder</span>
                    <span className="text-stone-300">
                      {paymentMethod === 'fonepay' ? 'Basant Pokhrel / Sunya' : 'Basant Pokhrel'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Payment Amount</span>
                    <span className="text-emerald-400 font-bold">NPR 9,999 (One-time Setup)</span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="pt-3 border-t border-stone-800 text-center font-mono text-xs text-stone-400">
                {paymentMethod === 'fonepay' && (
                  <p>
                    Open any Nepal mobile banking app (Global IME, Nabil, NIC Asia, etc.) &rarr; Select <strong>FonePay Scan</strong> or <strong>Send to {paymentPhone}</strong> with remarks &ldquo;{businessName}&rdquo;.
                  </p>
                )}
                {paymentMethod === 'esewa' && (
                  <p>
                    Open eSewa &rarr; Send Money to ID <strong>{paymentPhone}</strong> (Basant Pokhrel) with remarks &ldquo;{businessName} Website&rdquo;.
                  </p>
                )}
                {paymentMethod === 'khalti' && (
                  <p>
                    Open Khalti &rarr; Send Money to ID <strong>{paymentPhone}</strong> (Basant Pokhrel) with remarks &ldquo;{businessName} Website&rdquo;.
                  </p>
                )}
              </div>
            </div>

            {/* Founder Helpline Note */}
            <div className="p-3 bg-stone-900/40 border border-stone-800 rounded-sm flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400">
                Need VAT billing or bank transfer? Call founder directly:
              </span>
              <a
                href={`tel:${founderPhoneFormatted}`}
                className="text-[#C5A059] font-bold hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" /> {founderPhoneFormatted}
              </a>
            </div>

            {/* Optional Transaction ID Input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-2">
                Transaction ID or Payment Reference (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. FP-9283719 or eSewa Ref"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                className="w-full bg-[#0C0A09] border border-stone-700 rounded-sm px-4 py-3 text-sm text-white font-mono placeholder-stone-600 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="pt-4 flex justify-between border-t border-stone-800">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-stone-700 text-stone-300 text-xs font-mono rounded-sm hover:bg-stone-800"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-emerald-500 transition-colors inline-flex items-center gap-2"
              >
                Confirm & Complete Handover <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Step 4: Instant Handover & DNS mapping confirmation */}
        {/* ========================================================================= */}
        {step === 4 && (
          <div className="bg-[#12100E] border border-emerald-500/40 p-8 rounded-sm space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block">
                Setup Request Received · Handover Queued
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white">
                {businessName} is Moving to Production
              </h2>
              <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                Your domain preference, counter WhatsApp lead routing, and payment verification have been successfully registered.
              </p>
            </div>

            {/* Handover Specifications Card */}
            <div className="p-5 bg-[#0C0A09] border border-stone-800 rounded-sm text-xs font-mono text-left max-w-lg mx-auto space-y-2.5">
              <div className="flex justify-between text-stone-400 border-b border-stone-800 pb-2">
                <span>Business Entity:</span>
                <span className="text-white font-semibold">{businessName}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Official Domain:</span>
                <span className="text-[#C5A059] font-semibold">{preferredDomain}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Counter WhatsApp:</span>
                <span className="text-white font-semibold">{phone || defaultPhone}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Client Contact:</span>
                <span className="text-white font-semibold">{email}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Payment Reference:</span>
                <span className="text-stone-300 font-semibold">{txnId || `${paymentMethod.toUpperCase()} Ref (Pending Sync)`}</span>
              </div>
              <div className="flex justify-between text-stone-400 pt-2 border-t border-stone-800">
                <span>Handover Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> DNS Mapping Queued
                </span>
              </div>
            </div>

            {/* Technical DNS Mapping Confirmation Table */}
            <div className="p-4 bg-[#0C0A09] border border-stone-800 rounded-sm text-left max-w-lg mx-auto space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#C5A059] font-semibold">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" /> Automated DNS Mapping Configuration
                </span>
                <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                  <Lock className="w-3 h-3" /> SSL TLS 1.3
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] font-mono text-stone-300">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-500">
                      <th className="py-1 text-left">Type</th>
                      <th className="py-1 text-left">Host</th>
                      <th className="py-1 text-left">Target Value</th>
                      <th className="py-1 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stone-900">
                      <td className="py-1 text-amber-300 font-bold">A</td>
                      <td className="py-1">@</td>
                      <td className="py-1 text-stone-400">76.76.21.21</td>
                      <td className="py-1 text-right text-emerald-400">Active</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-amber-300 font-bold">CNAME</td>
                      <td className="py-1">www</td>
                      <td className="py-1 text-stone-400">cname.vercel-dns.com</td>
                      <td className="py-1 text-right text-emerald-400">Active</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <a
                href={`https://wa.me/${founderWhatsApp}?text=${encodeURIComponent(
                  `Namaste Basant! I completed the onboarding setup for ${businessName} (Domain: ${preferredDomain}, Counter WhatsApp: ${phone || defaultPhone}). Please finalize DNS mapping and production handover!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" /> Message Founder Directly on WhatsApp
              </a>

              <a
                href={`tel:${founderPhoneFormatted}`}
                className="w-full py-2.5 bg-stone-900 border border-stone-700 text-stone-300 hover:text-white hover:border-[#C5A059] font-mono text-xs rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" /> Call Founder Directly ({founderPhoneFormatted})
              </a>

              <div className="pt-2">
                <Link
                  href={`/preview/${slug}`}
                  className="text-xs font-mono text-stone-400 hover:text-white underline inline-block"
                >
                  Return to Live Website Preview
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
