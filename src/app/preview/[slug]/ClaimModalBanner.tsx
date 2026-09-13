'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { QrCode, X, ArrowRight, ShieldCheck, Check, Mail, Send, Loader2, Sparkles } from 'lucide-react';

export function ClaimModalBanner({ businessName, district, slug }: { businessName: string; district: string; slug?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'claim' | 'direct_mail'>('claim');
  const [selectedMethod, setSelectedMethod] = useState<'fonepay' | 'esewa' | 'khalti'>('fonepay');

  // Direct Mail State
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [mailSentResult, setMailSentResult] = useState<{ success: boolean; simulated?: boolean; message?: string } | null>(null);

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
      <div className="sticky top-0 z-50 bg-[#12100E]/95 backdrop-blur-md text-[#F7F4EE] px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs font-mono border-b border-stone-800">
        <div className="flex items-center gap-3 truncate">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] shrink-0" />
          <span className="text-stone-300 font-medium truncate">
            Private Draft for {businessName}
          </span>
          <span className="hidden md:inline text-stone-500">
            · Ready for official .com.np domain handover
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setActiveTab('direct_mail');
              setIsOpen(true);
            }}
            className="px-3 py-1 rounded border border-stone-700 bg-stone-900/80 text-stone-300 hover:text-white hover:border-stone-500 font-medium transition-colors text-[11px] inline-flex items-center gap-1.5"
          >
            <Mail className="w-3 h-3 text-[#C5A059]" />
            <span className="hidden sm:inline">Send Direct Mail</span>
            <span className="sm:hidden">Mail</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('claim');
              setIsOpen(true);
            }}
            className="px-3.5 py-1 rounded border border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059] hover:bg-[#C5A059] hover:text-black font-semibold transition-colors uppercase tracking-wider text-[11px]"
          >
            Claim Site
          </button>
        </div>
      </div>

      {/* Action Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12100E] border border-stone-800 rounded-sm max-w-lg w-full p-6 sm:p-8 space-y-6 text-[#F7F4EE] relative shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Tab Switcher */}
            <div className="flex border-b border-stone-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab('claim')}
                className={`pb-3 pr-4 uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                  activeTab === 'claim'
                    ? 'border-[#C5A059] text-[#C5A059]'
                    : 'border-transparent text-stone-500 hover:text-stone-300'
                }`}
              >
                1. Claim & Launch
              </button>
              <button
                onClick={() => setActiveTab('direct_mail')}
                className={`pb-3 px-4 uppercase tracking-wider font-semibold border-b-2 transition-colors inline-flex items-center gap-1.5 ${
                  activeTab === 'direct_mail'
                    ? 'border-[#C5A059] text-[#C5A059]'
                    : 'border-transparent text-stone-500 hover:text-stone-300'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                2. Confidential Direct Mail
              </button>
            </div>

            {/* TAB 1: CLAIM & HANDOVER */}
            {activeTab === 'claim' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059]">
                    Bespoke Digital Handover
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                    Own the {businessName} Presence
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    Launch on your dedicated domain with high-speed hosting, direct WhatsApp reservations, and verified local Google indexing.
                  </p>
                </div>

                <div className="p-4 bg-[#0C0A09] border border-stone-800/80 rounded-sm space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-stone-300">
                    <span>Setup & Customization:</span>
                    <span className="text-white font-semibold">NPR 9,999 (One-time)</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span>Managed Cloud Hosting:</span>
                    <span className="text-white font-semibold">NPR 1,500 / month</span>
                  </div>
                  <div className="pt-2 border-t border-stone-800/80 text-[10px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Free SSL & Mercantile .com.np domain registration
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/preview/${cleanSlug}/onboarding`}
                    className="w-full py-3 rounded text-xs font-semibold uppercase tracking-widest bg-[#C5A059] text-black hover:bg-[#d4b068] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Confirm Interest & Begin Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`https://wa.me/${founderWhatsApp}?text=${encodeURIComponent(
                      `Namaste! I am the owner of ${businessName}. I reviewed the private website draft and wish to activate the handover!`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded text-xs font-mono text-stone-400 hover:text-white border border-stone-800 text-center block"
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
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 px-2 py-0.5 rounded">
                      Confidential Mode
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-white">
                    Send Direct Proposal to Decision Maker
                  </h3>
                  <p className="text-xs text-stone-400">
                    Sends a private, high-priority proposal email directly to the business client featuring this live preview URL and interactive 1-click interest confirmation.
                  </p>
                </div>

                <form onSubmit={handleSendDirectMail} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-2">
                      Client Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="owner@business.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full bg-[#0C0A09] border border-stone-700 rounded-sm px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="p-3 bg-[#0C0A09] border border-stone-800 text-[11px] font-mono text-stone-400 space-y-1">
                    <div className="text-stone-300">✓ Sensitivity: Company-Confidential</div>
                    <div>✓ Embedded 1-click &apos;Yes, I&apos;m Interested&apos; instant setup hook</div>
                    <div>✓ Fallback to Kathmandu Valley local phone concierge</div>
                  </div>

                  {mailSentResult && (
                    <div
                      className={`p-3 rounded text-xs font-mono ${
                        mailSentResult.success
                          ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                          : 'bg-red-950/40 border border-red-500/40 text-red-300'
                      }`}
                    >
                      {mailSentResult.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3 rounded text-xs font-semibold uppercase tracking-widest bg-[#C5A059] text-black hover:bg-[#d4b068] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Dispatching Mail...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
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
