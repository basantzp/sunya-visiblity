# 🏗️ Sunya Visibility Architecture

## System Overview

Sunya Visibility is an autonomous agency engine operated by a solo founder with zero employees. It bridges the digital divide in Kathmandu Valley by identifying high-rated local businesses that lack websites, synthesizing localized digital presences, deploying live previews, and facilitating instant payment handoffs.

---

## 🔁 The Autonomous Pipeline Cycle

```
  [ Places API ] ───► [ Lead Qualification ] ───► [ Gemini AI Enrichment ]
                            │ (Rating ≥ 4.0,              │ (Sentiment Rewrite,
                            │  Reviews ≥ 15,              │  Brand Voice,
                            │  No Website)                │  Signature Items)
                                                          ▼
  [ Outreach Engine ] ◄─── [ Preview Deployer ] ◄─── [ Template Engine ]
        │ (Email / WhatsApp,       │ (/preview/[slug])          │ (Restaurant, Spa,
        │  SHA-256 Dedup)          │                            │  Retail, Services)
        ▼
  [ 1-Click Payment ] ───► [ Automated Handoff ]
   (eSewa / Khalti / FonePay) (Managed DNS / Static ZIP)
```

---

## 📁 Directory Structure & Organization

```
├── .husky/              # Git pre-commit hooks (lint-staged)
├── .vscode/             # Team IDE settings, launch profiles & tasks
├── docs/                # Architectural and operational documentation
├── scripts/             # CLI automation runners & cron worker
│   ├── run-pipeline.ts  # Manual / scripted pipeline trigger
│   └── cron-worker.ts   # Autonomous periodic background runner
├── src/
│   ├── app/             # Next.js 15 App Router pages & API handlers
│   │   ├── admin/       # Founder Ops Console
│   │   ├── api/         # Webhooks, lead responses, email dispatch
│   │   ├── preview/     # Dynamic business preview routes
│   │   ├── layout.tsx   # Root layout with Inter & Outfit typography
│   │   └── page.tsx     # Public Agency landing page
│   ├── config/          # Valley coordinates, pricing, & rate limits
│   ├── lib/             # Core engines (places, gemini, mailer, etc.)
│   │   └── templates/   # 4 business archetype templates
│   └── types/           # Centralized TypeScript definitions
├── supabase/            # PostgreSQL database schema & seed data
├── tests/               # Vitest unit & integration test suites
└── vitest.config.mts    # Test runner configuration
```

---

## 🛡️ Key Business Guardrails

1. **Google Terms of Service Compliance**:
   - Google terms forbid storing or republishing customer reviews verbatim.
   - The Enrichment Engine (`src/lib/gemini.ts`) analyzes reviews transiently, extracts abstract themes (e.g. "courtyard atmosphere", "authentic buff momo"), and rewrites them into original patron praise summaries.
2. **Anti-Spam & Rate Limits**:
   - `src/lib/mailer.ts` verifies MX records before sending.
   - Enforces SHA-256 hash checking to guarantee zero duplicate pitches.
   - Enforces a hard cap of 20–50 sends per day to protect domain reputation.
3. **Financial Watchdog**:
   - The system monitors monthly infrastructure spend against revenue to guarantee self-sufficiency.
