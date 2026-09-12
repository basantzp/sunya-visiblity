'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  MessageSquare,
  Phone,
  QrCode,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface OnboardingPageProps {
  params: Promise<{ slug: string }>;
}

export default function ClientOnboardingPage({ params }: OnboardingPageProps) {
  const { slug } = use(params);
  const businessName = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
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
    <div className="min-h-screen bg-[#0C0A09] font-sans text-[#F7F4EE] antialiased selection:bg-[#C5A059] selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-stone-800 bg-[#12100E]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href={`/preview/${slug}`}
            className="inline-flex items-center gap-2 font-mono text-xs text-stone-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Preview
          </Link>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-mono text-xs text-emerald-400">
              Interest Confirmed · Client Onboarding
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Banner */}
        <div className="mb-10 space-y-3 text-center">
          <span className="inline-block rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C5A059]">
            Phase 2 · Operational Setup
          </span>
          <h1 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl">
            Claim & Launch {businessName}
          </h1>
          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-stone-400">
            Thank you for confirming your interest. Follow these 4 quick operations to connect your
            WhatsApp, register your official Nepal domain, and take your website live.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="mb-10 grid grid-cols-4 gap-2 text-center font-mono text-xs">
          {[
            { num: 1, label: 'Contact & WhatsApp' },
            { num: 2, label: 'Official Domain' },
            { num: 3, label: 'Payment Activation' },
            { num: 4, label: 'Handover & Launch' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => s.num < step && setStep(s.num as any)}
              className={`cursor-pointer rounded-sm border p-3 transition-all ${
                step === s.num
                  ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]'
                  : step > s.num
                    ? 'border-stone-700 bg-stone-900/60 text-stone-300'
                    : 'border-stone-800 text-stone-600'
              }`}
            >
              <div className="mb-1 font-bold">Step {s.num}</div>
              <div className="truncate text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Step 1: Contact & WhatsApp */}
        {step === 1 && (
          <div className="space-y-6 rounded-sm border border-stone-800 bg-[#12100E] p-8">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-xl font-medium text-white">
                <MessageSquare className="h-5 w-5 text-[#C5A059]" />
                Customer Lead Routing
              </h2>
              <p className="text-xs text-stone-400">
                Incoming orders, inquiries, and reservations from your new website will be routed
                directly to this phone number.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-stone-300">
                  Official WhatsApp / Mobile Number
                </label>
                <input
                  type="text"
                  placeholder="+977 98XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-sm border border-stone-700 bg-[#0C0A09] px-4 py-3 text-sm text-white placeholder-stone-600 focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-1 border border-stone-800 bg-stone-900/40 p-4 font-mono text-xs text-stone-400">
                <div className="flex items-center gap-2 text-stone-300">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Instant 1-Click WhatsApp Ordering Button
                </div>
                <div>
                  Patrons can message your business directly from mobile without saving contacts
                  first.
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-sm bg-[#C5A059] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:bg-[#d4b068]"
              >
                Continue to Domain Choice <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Domain Choice */}
        {step === 2 && (
          <div className="space-y-6 rounded-sm border border-stone-800 bg-[#12100E] p-8">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-xl font-medium text-white">
                <Globe className="h-5 w-5 text-[#C5A059]" />
                Official Nepal Domain Setup
              </h2>
              <p className="text-xs text-stone-400">
                Choose how customers in Kathmandu Valley and globally will find your web address.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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
                    if (d.id === 'subdomain')
                      setPreferredDomain(`${slug}.preview.sunyavisibility.com`);
                  }}
                  className={`cursor-pointer space-y-2 rounded-sm border p-4 transition-all ${
                    domainType === d.id
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-white'
                      : 'border-stone-800 bg-[#0C0A09] text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{d.title}</span>
                    <span className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-[9px] uppercase text-stone-300">
                      {d.badge}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-stone-400">{d.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-stone-300">
                Preferred Domain Address
              </label>
              <input
                type="text"
                value={preferredDomain}
                onChange={(e) => setPreferredDomain(e.target.value)}
                className="w-full rounded-sm border border-stone-700 bg-[#0C0A09] px-4 py-3 font-mono text-sm text-white focus:border-[#C5A059] focus:outline-none"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="rounded-sm border border-stone-700 px-5 py-2.5 font-mono text-xs text-stone-300 hover:bg-stone-800"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 rounded-sm bg-[#C5A059] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:bg-[#d4b068]"
              >
                Continue to Activation <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Activation */}
        {step === 3 && (
          <div className="space-y-6 rounded-sm border border-stone-800 bg-[#12100E] p-8">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-xl font-medium text-white">
                <QrCode className="h-5 w-5 text-[#C5A059]" />
                Merchant QR Activation
              </h2>
              <p className="text-xs text-stone-400">
                Transparent local pricing. One-time setup covers tailored design, SEO, and domain
                connection.
              </p>
            </div>

            {/* Price Summary */}
            <div className="space-y-2 rounded-sm border border-stone-800 bg-[#0C0A09] p-4 font-mono text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Setup, Copywriting & Mobile Optimization:</span>
                <span className="font-semibold text-white">NPR 9,999 (One-time)</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Managed Cloud Hosting & Updates:</span>
                <span className="font-semibold text-white">NPR 1,500 / month</span>
              </div>
              <div className="flex items-center gap-1 border-t border-stone-800 pt-2 text-[10px] text-emerald-400">
                <Check className="h-3.5 w-3.5" /> Includes free SSL certificate & Google Search
                indexing
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-300">
                Select Payment Channel
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['fonepay', 'esewa', 'khalti'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`rounded-sm border px-3 py-2 font-mono text-xs uppercase transition-colors ${
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
            <div className="space-y-4 rounded-sm border border-stone-800 bg-[#0C0A09] p-6 text-center">
              <div className="inline-block rounded-md bg-white p-3">
                {/* Visual QR representation */}
                <div className="flex h-40 w-40 flex-col items-center justify-center border-2 border-stone-700 bg-stone-900 p-3 text-center">
                  <QrCode className="mb-2 h-16 w-16 text-[#C5A059]" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                    {paymentMethod.toUpperCase()} MERCHANT
                  </span>
                  <span className="font-mono text-[9px] text-stone-400">9800000000</span>
                </div>
              </div>
              <p className="font-mono text-xs text-stone-400">
                Scan using any Nepal mobile banking app (FonePay), eSewa, or Khalti.
              </p>
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-stone-300">
                Transaction ID or Reference Code (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. FP-9283719"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                className="w-full rounded-sm border border-stone-700 bg-[#0C0A09] px-4 py-3 font-mono text-sm text-white placeholder-stone-600 focus:border-[#C5A059] focus:outline-none"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="rounded-sm border border-stone-700 px-5 py-2.5 font-mono text-xs text-stone-300 hover:bg-stone-800"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(true);
                  setStep(4);
                }}
                className="inline-flex items-center gap-2 rounded-sm bg-emerald-600 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-emerald-500"
              >
                Confirm & Launch Request <CheckCircle2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Handover & Direct WhatsApp Confirmation */}
        {step === 4 && (
          <div className="space-y-6 rounded-sm border border-emerald-500/40 bg-[#12100E] p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-400">
                Setup Request Received
              </span>
              <h2 className="font-serif text-2xl text-white">
                {businessName} is Moving to Production
              </h2>
              <p className="mx-auto max-w-md text-xs leading-relaxed text-stone-400">
                Your domain preference (<strong>{preferredDomain}</strong>) and WhatsApp lead
                routing details have been recorded.
              </p>
            </div>

            <div className="mx-auto max-w-md space-y-2 rounded-sm border border-stone-800 bg-[#0C0A09] p-5 text-left font-mono text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Domain:</span>
                <span className="font-semibold text-white">{preferredDomain}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>WhatsApp Routing:</span>
                <span className="font-semibold text-white">
                  {phone || 'Default Verified Phone'}
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Status:</span>
                <span className="font-semibold text-emerald-400">DNS Provisioning Queued</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <a
                href={`https://wa.me/${founderWhatsApp}?text=${encodeURIComponent(
                  `Namaste Basant, I confirmed interest for ${businessName} and completed the onboarding setup for ${preferredDomain}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:bg-[#20bd5a]"
              >
                <MessageSquare className="h-4 w-4" /> Message Founder Directly on WhatsApp
              </a>
              <div>
                <Link
                  href={`/preview/${slug}`}
                  className="inline-block font-mono text-xs text-stone-400 underline hover:text-white"
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
