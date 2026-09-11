'use client';

import React, { useState } from 'react';
import { Sparkles, Check, QrCode, X, ArrowRight, ShieldCheck } from 'lucide-react';

export function ClaimModalBanner({ businessName, district }: { businessName: string; district: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'esewa' | 'khalti' | 'fonepay'>('fonepay');

  return (
    <>
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white px-4 py-2.5 shadow-xl flex items-center justify-between text-xs sm:text-sm font-sans border-b border-white/10">
        <div className="flex items-center gap-2 truncate">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold truncate">Live Preview for {businessName}</span>
          <span className="hidden md:inline text-blue-200">· Ready to launch on your custom domain</span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="ml-3 px-3.5 py-1.5 rounded-lg bg-white text-blue-900 font-bold hover:bg-blue-50 transition-all shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Claim Site (NPR 12,000)</span>
        </button>
      </div>

      {/* Claim Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-slate-100 relative shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Official Sunya Visibility Handoff</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Own {businessName} Website</h3>
              <p className="text-sm text-slate-400">
                Instantly connect your custom .com or .com.np domain and start taking customer orders directly on WhatsApp.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between font-medium">
                <span>Setup & Customization Fee:</span>
                <span className="font-bold text-white">NPR 12,000 (One-time)</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Monthly Managed Cloud Hosting:</span>
                <span className="font-bold text-white">NPR 1,500/month</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Includes full mobile responsiveness, SSL security, domain mapping, and unlimited content updates.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Payment Channel</span>
              <div className="grid grid-cols-3 gap-3">
                {(['fonepay', 'esewa', 'khalti'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMethod(m)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                      selectedMethod === m
                        ? 'border-blue-500 bg-blue-500/20 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs space-y-2">
              <div className="flex items-center gap-2 text-blue-300 font-semibold">
                <QrCode className="w-4 h-4" />
                <span>Instant QR Transfer Available</span>
              </div>
              <p className="text-slate-300">
                Transfer to merchant account: <strong className="text-white">9800000000</strong> ({selectedMethod.toUpperCase()}) or scan static merchant QR at confirmation.
              </p>
            </div>

            <a
              href={`https://wa.me/9779800000000?text=Hello%20Sunya%20Visibility,%20I%20want%20to%20claim%20the%20website%20for%20${encodeURIComponent(businessName)}%20via%20${selectedMethod.toUpperCase()}!`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all text-sm"
            >
              <span>Confirm & Activate on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
