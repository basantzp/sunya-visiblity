'use client';

import React, { useState } from 'react';
import { Sparkles, Check, QrCode, X, ArrowRight, ShieldCheck, Crown, PhoneCall } from 'lucide-react';

export function ClaimModalBanner({ businessName, district }: { businessName: string; district: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'fonepay' | 'esewa' | 'khalti'>('fonepay');

  const founderWhatsApp = '9779800000000'; // Replace with founder real number in .env

  return (
    <>
      {/* Luxury Golden Top Bar */}
      <div className="sticky top-0 z-50 bg-[#0c0c12]/95 backdrop-blur-xl text-white px-4 py-2.5 shadow-2xl flex items-center justify-between text-xs sm:text-sm font-sans border-b border-amber-500/20">
        <div className="flex items-center gap-2.5 truncate">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <div className="truncate flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-bold text-white truncate">Exclusive Live Preview: {businessName}</span>
            <span className="hidden md:inline text-stone-400">· Ready for your official .com.np domain</span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="ml-3 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-stone-950 font-extrabold hover:from-amber-300 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5 shrink-0 text-xs hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
          <span>Claim Site (NPR 9,999)</span>
        </button>
      </div>

      {/* Claim Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0f16] border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-stone-100 relative shadow-2xl gold-border-glow">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Sunya Visibility Founder Guarantee</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">Own the {businessName} Website</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Connect your official domain, receive direct customer orders on WhatsApp, and rank #1 on Google for {district} searches.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2.5 text-xs text-stone-300">
              <div className="flex justify-between font-medium">
                <span>Setup & Customization Fee:</span>
                <span className="font-bold text-amber-400">NPR 9,999 (Special Pilot Rate)</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Managed Cloud Hosting & Maintenance:</span>
                <span className="font-bold text-white">NPR 1,500 / month</span>
              </div>
              <p className="text-[11px] text-stone-500 pt-1 border-t border-white/5">
                ✓ Free SSL certificate &bull; ✓ Unlimited menu edits &bull; ✓ Free Mercantile .com.np registration guidance.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Accepted Payment Channels</span>
              <div className="grid grid-cols-3 gap-2">
                {(['fonepay', 'esewa', 'khalti'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMethod(m)}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold uppercase transition-all ${
                      selectedMethod === m
                        ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-md'
                        : 'border-white/10 bg-black/40 text-stone-400 hover:border-white/20'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Instant QR Transfer Available</span>
              </div>
              <p className="text-stone-300">
                Scan FonePay/eSewa/Khalti merchant QR on phone or confirm directly with our founder on WhatsApp.
              </p>
            </div>

            <a
              href={`https://wa.me/${founderWhatsApp}?text=${encodeURIComponent(
                `Namaste! I am the owner of ${businessName}. I saw the preview website you built and I want to activate it via ${selectedMethod.toUpperCase()}!`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 transition-all text-sm hover:scale-[1.02]"
            >
              <span>Activate Website on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
