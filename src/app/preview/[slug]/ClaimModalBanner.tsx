'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Loader2,
  Mail,
  QrCode,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

export function ClaimModalBanner({
  businessName,
  district,
  slug,
}: {
  businessName: string;
  district: string;
  slug?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'claim' | 'direct_mail'>('claim');
  const [selectedMethod, setSelectedMethod] = useState<'fonepay' | 'esewa' | 'khalti'>('fonepay');

  // Direct Mail State
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [mailSentResult, setMailSentResult] = useState<{
    success: boolean;
    simulated?: boolean;
    message?: string;
  } | null>(null);

  const founderWhatsApp = '9779867333080';
  const cleanSlug = slug || businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  async function handleSendDirectMail(e: React.FormEvent) {
    e.preventDefault();
    if (!recipientEmail || !recipientEmail.includes('@')) return;

    setIsSending(true);
    setMailSentResult(null);

    try {
      const res = await fetch('/api/outreach/send-direct-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: recipientEmail,
          businessName,
          district,
          slug: cleanSlug,
          previewUrl: `/preview/${cleanSlug}`,
          isConfidential: true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMailSentResult({
          success: true,
          simulated: data.simulated,
          message: data.simulated
            ? `Confidential proposal dispatched (Simulated Mode) to ${recipientEmail} with 1-click interest confirmation link.`
            : `Confidential proposal delivered to ${recipientEmail} via direct SMTP.`,
        });
      } else {
        setMailSentResult({
          success: false,
          message: data.error || 'Failed to dispatch email.',
        });
      }
    } catch (err: any) {
      setMailSentResult({
        success: false,
        message: err.message || 'Network error while dispatching email.',
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      {/* Restrained Luxury Top Banner */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-stone-800 bg-[#12100E]/95 px-4 py-2.5 font-mono text-xs text-[#F7F4EE] backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3 truncate">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C5A059]" />
          <span className="truncate font-medium text-stone-300">
            Private Draft for {businessName}
          </span>
          <span className="hidden text-stone-500 md:inline">
            · Ready for official .com.np domain handover
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('direct_mail');
              setIsOpen(true);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-stone-700 bg-stone-900/80 px-3 py-1 text-[11px] font-medium text-stone-300 transition-colors hover:border-stone-500 hover:text-white"
          >
            <Mail className="h-3 w-3 text-[#C5A059]" />
            <span className="hidden sm:inline">Send Direct Mail</span>
            <span className="sm:hidden">Mail</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('claim');
              setIsOpen(true);
            }}
            className="rounded border border-[#C5A059] bg-[#C5A059]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#C5A059] transition-colors hover:bg-[#C5A059] hover:text-black"
          >
            Claim Site
          </button>
        </div>
      </div>

      {/* Action Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg space-y-6 rounded-sm border border-stone-800 bg-[#12100E] p-6 text-[#F7F4EE] shadow-2xl sm:p-8">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 p-1 text-stone-400 transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Tab Switcher */}
            <div className="flex border-b border-stone-800 font-mono text-xs">
              <button
                onClick={() => setActiveTab('claim')}
                className={`border-b-2 pb-3 pr-4 font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'claim'
                    ? 'border-[#C5A059] text-[#C5A059]'
                    : 'border-transparent text-stone-500 hover:text-stone-300'
                }`}
              >
                1. Claim & Launch
              </button>
              <button
                onClick={() => setActiveTab('direct_mail')}
                className={`inline-flex items-center gap-1.5 border-b-2 px-4 pb-3 font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'direct_mail'
                    ? 'border-[#C5A059] text-[#C5A059]'
                    : 'border-transparent text-stone-500 hover:text-stone-300'
                }`}
              >
                <Mail className="h-3.5 w-3.5" />
                2. Confidential Direct Mail
              </button>
            </div>

            {/* TAB 1: CLAIM & HANDOVER */}
            {activeTab === 'claim' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C5A059]">
                    Bespoke Digital Handover
                  </span>
                  <h3 className="font-serif text-2xl font-light text-white sm:text-3xl">
                    Own the {businessName} Presence
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-stone-400">
                    Launch on your dedicated domain with high-speed hosting, direct WhatsApp
                    reservations, and verified local Google indexing.
                  </p>
                </div>

                <div className="space-y-2 rounded-sm border border-stone-800/80 bg-[#0C0A09] p-4 font-mono text-xs">
                  <div className="flex items-center justify-between text-stone-300">
                    <span>Setup & Customization:</span>
                    <span className="font-semibold text-white">NPR 9,999 (One-time)</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-300">
                    <span>Managed Cloud Hosting:</span>
                    <span className="font-semibold text-white">NPR 1,500 / month</span>
                  </div>
                  <div className="flex items-center gap-1 border-t border-stone-800/80 pt-2 text-[10px] text-emerald-400">
                    <Check className="h-3.5 w-3.5" /> Free SSL & Mercantile .com.np domain
                    registration
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/preview/${cleanSlug}/onboarding`}
                    className="flex w-full items-center justify-center gap-2 rounded bg-[#C5A059] py-3 text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-[#d4b068]"
                  >
                    <span>Confirm Interest & Begin Setup</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <a
                    href={`https://wa.me/${founderWhatsApp}?text=${encodeURIComponent(
                      `Namaste! I am the owner of ${businessName}. I reviewed the private website draft and wish to activate the handover!`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full rounded border border-stone-800 py-2.5 text-center font-mono text-xs text-stone-400 hover:text-white"
                  >
                    Or Message Founder on WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* TAB 2: CONFIDENTIAL DIRECT MAIL */}
            {activeTab === 'direct_mail' && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded border border-[#C5A059]/30 bg-[#C5A059]/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#C5A059]">
                      Confidential Mode
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-white">
                    Send Direct Proposal to Decision Maker
                  </h3>
                  <p className="text-xs text-stone-400">
                    Sends a private, high-priority proposal email directly to the business client
                    featuring this live preview URL and interactive 1-click interest confirmation.
                  </p>
                </div>

                <form onSubmit={handleSendDirectMail} className="space-y-4">
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-stone-300">
                      Client Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="owner@business.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full rounded-sm border border-stone-700 bg-[#0C0A09] px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 border border-stone-800 bg-[#0C0A09] p-3 font-mono text-[11px] text-stone-400">
                    <div className="text-stone-300">✓ Sensitivity: Company-Confidential</div>
                    <div>
                      ✓ Embedded 1-click &apos;Yes, I&apos;m Interested&apos; instant setup hook
                    </div>
                    <div>✓ Fallback to Kathmandu Valley local phone concierge</div>
                  </div>

                  {mailSentResult && (
                    <div
                      className={`rounded p-3 font-mono text-xs ${
                        mailSentResult.success
                          ? 'border border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                          : 'border border-red-500/40 bg-red-950/40 text-red-300'
                      }`}
                    >
                      {mailSentResult.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="flex w-full items-center justify-center gap-2 rounded bg-[#C5A059] py-3 text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-[#d4b068] disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Dispatching Mail...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Confidential Direct Mail</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
