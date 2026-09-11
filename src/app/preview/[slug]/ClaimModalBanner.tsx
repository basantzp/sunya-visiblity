'use client';

import React, { useState } from 'react';
import { QrCode, X, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export function ClaimModalBanner({ businessName, district }: { businessName: string; district: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'fonepay' | 'esewa' | 'khalti'>('fonepay');

  const founderWhatsApp = '9779800000000'; // Set in production .env

  return (
    <>
      {/* Restrained Luxury Top Banner */}
      <div className="sticky top-0 z-50 bg-[#12100E]/95 backdrop-blur-md text-[#F7F4EE] px-6 py-2.5 flex items-center justify-between text-xs font-mono border-b border-stone-800">
        <div className="flex items-center gap-3 truncate">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] shrink-0" />
          <span className="text-stone-300 font-medium truncate">
            Private Draft for {businessName}
          </span>
          <span className="hidden md:inline text-stone-500">
            · Ready for official .com.np domain handover
          </span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="ml-4 px-3.5 py-1 rounded border border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059] hover:bg-[#C5A059] hover:text-black font-semibold transition-colors uppercase tracking-wider text-[11px] shrink-0"
        >
          Claim Site (NPR 9,999)
        </button>
      </div>

      {/* Claim Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12100E] border border-stone-800 rounded-sm max-w-lg w-full p-8 space-y-6 text-[#F7F4EE] relative shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

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

            <div className="p-5 bg-[#0C0A09] border border-stone-800/80 rounded-sm space-y-3 text-xs font-mono">
              <div className="flex justify-between items-center text-stone-300">
                <span>Setup & Customization:</span>
                <span className="text-white font-semibold">NPR 9,999 (One-time)</span>
              </div>
              <div className="flex justify-between items-center text-stone-300">
                <span>Managed Cloud Hosting:</span>
                <span className="text-white font-semibold">NPR 1,500 / month</span>
              </div>
              <div className="pt-2 border-t border-stone-800/80 text-[10px] text-stone-400 space-y-1">
                <div>✓ Free SSL Certificate & Mercantile .com.np registration</div>
                <div>✓ Unlimited menu updates & seasonal promotions</div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                Payment Channel
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['fonepay', 'esewa', 'khalti'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMethod(m)}
                    className={`py-2 px-3 border text-xs font-mono uppercase transition-colors ${
                      selectedMethod === m
                        ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]'
                        : 'border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#0C0A09] border border-stone-800 text-xs space-y-1 font-mono">
              <div className="flex items-center gap-2 text-[#C5A059] text-[11px] uppercase tracking-wider">
                <QrCode className="w-3.5 h-3.5" />
                <span>Instant QR Transfer</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                Scan FonePay/eSewa/Khalti merchant QR on phone or confirm directly with our founder on WhatsApp.
              </p>
            </div>

            <a
              href={`https://wa.me/${founderWhatsApp}?text=${encodeURIComponent(
                `Namaste! I am the owner of ${businessName}. I reviewed the private website draft and wish to activate the handover via ${selectedMethod.toUpperCase()}!`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded text-xs font-semibold uppercase tracking-widest bg-[#F7F4EE] text-[#0C0A09] hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2"
            >
              <span>Initiate Handover on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
