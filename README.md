# 🚀 Sunya Visibility (शून्य भिजिविलिटी)
### Autonomous Local Website & Lead-Generation Agency for Kathmandu Valley

> **Autonomous local-business web agency operated by a solo founder with zero employees.** Automatically discovers top-rated businesses in Kathmandu, Lalitpur, and Bhaktapur that lack websites, generates custom Next.js web experiences across 4 distinct templates, deploys live previews, sends rate-limited outreach, and handles automated payment handoffs.

---

## 🧭 The North Star

> **The system must cover its own hosting and API costs before anything counts as profit.** If monthly infrastructure spend exceeds monthly revenue for two consecutive months, the built-in financial watchdog surfaces a critical alert rather than quietly absorbing the deficit.

---

## 🛠️ The Tech Stack

Reuses the founder's proven stack from **NepaJob** and **AutoApply AI**:
- **Framework**: Next.js 16 (App Router), TypeScript (Strict Mode), Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL) — `leads`, `enriched_data`, `generated_sites`, `outreach_log`, `payments`, `system_metrics`
- **AI Copywriting & Theme Synthesis**: Google Gemini 1.5 Flash (Strict anti-boilerplate, Kathmandu localized texture, Nepali/English bilingual output)
- **Email Outreach**: Gmail SMTP via `nodemailer` with DNS MX record validation and SHA-256 anti-double-send prevention (reused from AutoApply AI)
- **WhatsApp Outreach**: WhatsApp Cloud API (Meta Graph API v21.0) with hard rate-limits (20–50 sends/day)
- **Preview Deployments**: Vercel / Cloudflare Pages API per-site preview subdomains (`[business].preview.sunyavisibility.com`) and dynamic App Router routes
- **Orchestration**: CLI Automation Runner (`scripts/run-pipeline.ts`) and Founder Ops Console (`/admin`)

---

## 🧩 The 6 Autonomous Modules

### 1. 🔍 Discovery Engine (`src/lib/places.ts`)
- Queries Google Places API across Kathmandu, Lalitpur, and Bhaktapur.
- Target categories: Restaurants, Spas & Ayurvedic clinics, Cafes & Bakeries, Boutiques & Handicrafts, Gyms, Tutoring centers.
- **Critical Lead Qualification Filter**:
  - Rating ≥ 4.0 ★
  - Reviews ≥ 15 (indicates established, loyal customer base)
  - **No existing website listed in Places** (the absence of a website *is* the lead qualifier).

### 2. 🧠 Enrichment Engine (`src/lib/gemini.ts`)
- Pulls owner-uploaded business photos over generic user photos where distinguishable.
- **Strict Compliance Guardrail**: Google's terms restrict republishing customer reviews outside Google Maps. **Reviews are never stored or displayed verbatim.** Instead, Gemini analyzes patron sentiment, extracts core themes (e.g. "renowned for hot buff momo", "unhurried courtyard breeze"), and rewrites them into original patron praise summaries.
- Generates bilingual copy (Devanagari Nepali + English) with genuine local valley references (Jhamsikhel, Patan, Boudha, New Road, Thamel).

### 3. 🎨 Multi-Template Site Generator (`src/lib/templates/`)
Rotates across **4 visually distinct templates** to avoid the repetitive AI-generated signature:
1. **Culinary & Dining** (`RestaurantTemplate.tsx`): Warm amber/terracotta palette, interactive menu, reservation button, and bilingual toggle.
2. **Health, Spa & Wellness** (`WellnessTemplate.tsx`): Calm emerald/sage theme, treatment tiers, certified practitioner badges, and appointment booking.
3. **Retail & Boutique** (`RetailTemplate.tsx`): Modern minimalist editorial lookbook, product collection grid, and direct WhatsApp ordering.
4. **Services & Clinics** (`ServicesTemplate.tsx`): Professional navy trust layout, credential showcase, FAQ accordions, and consultation modal.
- Automated Local SEO: JSON-LD `LocalBusiness` schema, OpenGraph & Twitter tags, mobile-first responsive layout.

### 4. 🌐 Preview & Hosting Engine (`src/lib/deployer.ts`)
- Automatically provisions a live, clickable preview URL (`/preview/[slug]`) before any outreach is initiated.
- Equips the preview with a sticky owner claim banner enabling the business owner to test their site on mobile and claim it instantly.

### 5. 📬 Outreach Engine (`src/lib/mailer.ts`, `src/lib/whatsapp.ts`)
- Reuses the AutoApply AI dispatch skeleton:
  - DNS MX record verification before attempting email delivery.
  - SHA-256 anti-double-send hash ensuring no business receives duplicate pitches.
  - Hard daily rate-limits: **20–50 messages/day** to prevent domain spam flags or WhatsApp Business bans.
- Pitch copy formula:
  - 1 specific real detail about the business.
  - The live, clickable preview URL.
  - Transparent pricing in Nepali Rupees (NPR 12,000 setup + NPR 1,500/month hosting).
  - Static merchant QR code (eSewa / Khalti / FonePay).
  - Founder's direct WhatsApp number for immediate contact.
- **Anti-Overclaiming Rule**: Explains the discoverability mechanism rather than promising "guaranteed 100x sales".

### 6. 💳 Payment & Handoff Engine (`src/lib/payments.ts`)
- Supports local payment methods: **eSewa, Khalti, and FonePay**.
- Two handoff pathways upon payment confirmation:
  1. **Managed Hosting (NPR 1,500/mo)**: Automated custom domain DNS mapping via Vercel/Cloudflare API with SSL provisioning.
  2. **Self-Hosted Export**: Generates a downloadable ZIP bundle of the static Next.js production build.
- Generates automated monthly performance reports to retain subscription hosting revenue.

---

## 🚦 Build Phases & Governance

| Phase | Description | Human Involvement |
|---|---|---|
| **Phase 1 (MVP)** | Discovery + Generation working end-to-end for 10 businesses. Email only. | Founder manually reviews every generated site and approves every outreach message before send. |
| **Phase 2** | Adds WhatsApp Cloud API, merchant QR payments, and domain handoff. | Founder approves batches in the Founder Console (`/admin`). |
| **Phase 3 (Full Autonomy)** | Unattended scheduled runs, automatic retries, rate-limited dispatch. | Founder only reviews weekly revenue vs spend and edge-case exceptions. |

---

## ⚡ Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/basantzp/sunya-visiblity.git
cd sunya-visiblity
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and set your API keys:
```bash
cp .env.example .env.local
```

### 3. Initialize Supabase Database
Run the schema in your Supabase SQL Editor:
```bash
# Apply supabase/schema.sql in your Supabase project dashboard
```

### 4. Run Development Server
```bash
pnpm dev
```
- Agency Landing Page: `http://localhost:3005`
- Founder Ops Console: `http://localhost:3005/admin`
- Sample Live Preview: `http://localhost:3005/preview/himalayan-momo-sekuwa-corner`

### 5. Run CLI Automation Pipeline
```bash
# Run discovery, enrichment, and preview generation for Kathmandu Valley
pnpm pipeline:all
```

---

## 📜 License
MIT License. Crafted with care for the Kathmandu Valley entrepreneurial ecosystem by [Basant Kumar](https://github.com/basantzp).
