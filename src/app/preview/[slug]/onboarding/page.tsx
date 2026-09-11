'use client';

import React, { useState, use } from 'react';
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
  Clock
} from 'lucide-react';

interface OnboardingPageProps {
  params: Promise<{ slug: string }>;
}

export default function ClientOnboardingPage({ params }: OnboardingPageProps) {
  const { slug } = use(params);
  const businessName = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [phone, setPhone] = useState('');
  const [domainType, setDomainType] = useState<'mercantile' | 'custom' | 'subdomain'>('mercantile');
  const [preferredDomain, setPreferredDomain] = useState(`${slug}.com.np`);
  const [paymentMethod, setPaymentMethod] = useState<'fonepay' | 'esewa' | 'khalti'>('fonepay');
  const [txnId, setTxnId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const founderWhatsApp = '9779800000000';

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
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400">Interest Confirmed · Client Onboarding</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Banner */}
        <div className="mb-10 text-center space-y-3">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/30 px-3 py-1 rounded-full inline-block">
            Phase 2 · Operational Setup
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-white">
            Claim & Launch {businessName}
          </h1>
          <p className="text-sm text-stone-400 max-w-xl mx-auto font-light leading-relaxed">
            Thank you for confirming your interest. Follow these 4 quick operations to connect your WhatsApp, register your official Nepal domain, and take your website live.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="grid grid-cols-4 gap-2 mb-10 text-center text-xs font-mono">
          {[
            { num: 1, label: 'Contact & WhatsApp' },
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

        {/* Step 1: Contact & WhatsApp */}
        {step === 1 && (
          <div className="bg-[#12100E] border border-stone-800 p-8 rounded-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-medium text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C5A059]" />
                Customer Lead Routing
              </h2>
              <p className="text-xs text-stone-400">
                Incoming orders, inquiries, and reservations from your new website will be routed directly to this phone number.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-2">
                  Official WhatsApp / Mobile Number
                </label>
                <input
                  type="text"
                  placeholder="+977 98XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0C0A09] border border-stone-700 rounded-sm px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="p-4 bg-stone-900/40 border border-stone-800 text-xs text-stone-400 space-y-1 font-mono">
                <div className="text-stone-300 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Instant 1-Click WhatsApp Ordering Button
                </div>
                <div>Patrons can message your business directly from mobile without saving contacts first.</div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#d4b068] transition-colors inline-flex items-center gap-2"
              >
                Continue to Domain Choice <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Domain Choice */}
        {step === 2 && (
          <div className="bg-[#12100E] border border-stone-800 p-8 rounded-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-medium text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#C5A059]" />
                Official Nepal Domain Setup
              </h2>
              <p className="text-xs text-stone-400">
                Choose how customers in Kathmandu Valley and globally will find your web address.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  id: 'mercantile',
                  title: 'Official .com.np',
                  desc: 'Free official domain via Mercantile Nepal. We handle full paperwork & DNS configuration.',
                  badge: 'Recommended in Nepal',
                },
                {
                  id: 'custom',
                  title: 'Global .com Domain',
                  desc: 'Register or connect your own brand.com address. Includes full SSL encryption.',
                  badge: 'Global Appeal',
                },
                {
                  id: 'subdomain',
                  title: 'Instant Fast Subdomain',
                  desc: 'Host instantly on sunyavisibility.com with zero paperwork needed today.',
                  badge: 'Instant Setup',
                },
              ].map((d) => (
                <div
                  key={d.id}
                  onClick={() => {
                    setDomainType(d.id as any);
                    if (d.id === 'mercantile') setPreferredDomain(`${slug}.com.np`);
                    if (d.id === 'custom') setPreferredDomain(`${slug}.com`);
                    if (d.id === 'subdomain') setPreferredDomain(`${slug}.preview.sunyavisibility.com`);
                  }}
                  className={`p-4 border rounded-sm cursor-pointer transition-all space-y-2 ${
                    domainType === d.id
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-white'
                      : 'border-stone-800 bg-[#0C0A09] text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{d.title}</span>
                    <span className="text-[9px] font-mono uppercase bg-stone-800 px-1.5 py-0.5 rounded text-stone-300">
                      {d.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>

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
            </div>

            <div className="pt-4 flex justify-between">
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
                Continue to Activation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Activation */}
        {step === 3 && (
          <div className="bg-[#12100E] border border-stone-800 p-8 rounded-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-medium text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#C5A059]" />
                Merchant QR Activation
              </h2>
              <p className="text-xs text-stone-400">
                Transparent local pricing. One-time setup covers tailored design, SEO, and domain connection.
              </p>
            </div>

            {/* Price Summary */}
            <div className="p-4 bg-[#0C0A09] border border-stone-800 rounded-sm space-y-2 font-mono text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Setup, Copywriting & Mobile Optimization:</span>
                <span className="text-white font-semibold">NPR 9,999 (One-time)</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Managed Cloud Hosting & Updates:</span>
                <span className="text-white font-semibold">NPR 1,500 / month</span>
              </div>
              <div className="pt-2 border-t border-stone-800 text-[10px] text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Includes free SSL certificate & Google Search indexing
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-300">
                Select Payment Channel
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['fonepay', 'esewa', 'khalti'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`py-2 px-3 border text-xs font-mono uppercase rounded-sm transition-colors ${
                      paymentMethod === m
                        ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]'
                        : 'border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* QR Code / Instructions */}
            <div className="p-6 bg-[#0C0A09] border border-stone-800 rounded-sm text-center space-y-4">
              <div className="inline-block p-3 bg-white rounded-md">
                {/* Visual QR representation */}
                <div className="w-40 h-40 bg-stone-900 border-2 border-stone-700 flex flex-col items-center justify-center p-3 text-center">
                  <QrCode className="w-16 h-16 text-[#C5A059] mb-2" />
                  <span className="text-[10px] font-mono text-white uppercase font-bold tracking-wider">
                    {paymentMethod.toUpperCase()} MERCHANT
                  </span>
                  <span className="text-[9px] font-mono text-stone-400">9800000000</span>
                </div>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                Scan using any Nepal mobile banking app (FonePay), eSewa, or Khalti.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-2">
                Transaction ID or Reference Code (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. FP-9283719"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                className="w-full bg-[#0C0A09] border border-stone-700 rounded-sm px-4 py-3 text-sm text-white font-mono placeholder-stone-600 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-stone-700 text-stone-300 text-xs font-mono rounded-sm hover:bg-stone-800"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(true);
                  setStep(4);
                }}
                className="px-6 py-2.5 bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-emerald-500 transition-colors inline-flex items-center gap-2"
              >
                Confirm & Launch Request <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Handover & Direct WhatsApp Confirmation */}
        {step === 4 && (
          <div className="bg-[#12100E] border border-emerald-500/40 p-8 rounded-sm space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400">
                Setup Request Received
              </span>
              <h2 className="text-2xl font-serif text-white">
                {businessName} is Moving to Production
              </h2>
              <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                Your domain preference (<strong>{preferredDomain}</strong>) and WhatsApp lead routing details have been recorded.
              </p>
            </div>

            <div className="p-5 bg-[#0C0A09] border border-stone-800 rounded-sm text-xs font-mono text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-stone-400">
                <span>Domain:</span>
                <span className="text-white font-semibold">{preferredDomain}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>WhatsApp Routing:</span>
                <span className="text-white font-semibold">{phone || 'Default Verified Phone'}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Status:</span>
                <span className="text-emerald-400 font-semibold">DNS Provisioning Queued</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <a
                href={`https://wa.me/${founderWhatsApp}?text=${encodeURIComponent(
                  `Namaste Basant, I confirmed interest for ${businessName} and completed the onboarding setup for ${preferredDomain}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] text-black font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#20bd5a] transition-colors inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Message Founder Directly on WhatsApp
              </a>
              <div>
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
