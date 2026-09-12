# ⚙️ Environment Variables Reference

All credentials should be specified in `.env.local`. This file is git-ignored to prevent credential leaks.

---

## 1. Core Settings

| Variable               | Description                                          | Default                 |
| ---------------------- | ---------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_BASE_URL` | Public origin URL for preview links & interest hooks | `http://localhost:3005` |

---

## 2. Supabase (Database & State)

Sign up at [supabase.com](https://supabase.com) and create a project:

| Variable                        | Location in Supabase Dashboard                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Project Settings $\rightarrow$ API $\rightarrow$ Project URL                                  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings $\rightarrow$ API $\rightarrow$ Project API keys (`anon` / `public`)         |
| `SUPABASE_SERVICE_ROLE_KEY`     | Project Settings $\rightarrow$ API $\rightarrow$ Project API keys (`service_role` / `secret`) |

_Note: For local offline development without Supabase, the client defaults to safe placeholders._

---

## 3. Google Cloud (Places API)

Required for real Kathmandu, Lalitpur, and Bhaktapur discovery queries:

| Variable                | Description                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `GOOGLE_PLACES_API_KEY` | Google Cloud Console $\rightarrow$ APIs & Services $\rightarrow$ Credentials $\rightarrow$ Places API (New) |

_Note: If set to `placeholder` or omitted, the discovery engine automatically falls back to authentic Kathmandu Valley mock fixtures._

---

## 4. Google AI Studio (Gemini)

Required for bilingual copywriting and sentiment synthesis:

| Variable         | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| `GEMINI_API_KEY` | Free API key from [aistudio.google.com](https://aistudio.google.com/) |

_Note: If set to `placeholder` or omitted, the enrichment engine automatically uses authentic Nepali-English fallback copy._

---

## 5. Email Dispatch (Gmail SMTP)

Used by the Outreach Engine for direct cold proposals:

| Variable             | Description                                                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GMAIL_USER`         | Your full Gmail address (e.g. `yourname@gmail.com`)                                                                                                  |
| `GMAIL_APP_PASSWORD` | 16-character Google App Password (generated via Google Account $\rightarrow$ Security $\rightarrow$ 2-Step Verification $\rightarrow$ App Passwords) |

---

## 6. Founder & Payment Details

Configures direct merchant handoff details shown on generated sites and pitch emails:

| Variable             | Description                        | Example           |
| -------------------- | ---------------------------------- | ----------------- |
| `FOUNDER_NAME`       | Name shown in cold outreach copy   | `Basant`          |
| `FOUNDER_WHATSAPP`   | Direct WhatsApp line for inquiries | `+977-9800000000` |
| `ESEWA_MERCHANT_ID`  | eSewa ID for direct QR billing     | `9800000000`      |
| `KHALTI_MERCHANT_ID` | Khalti ID for direct QR billing    | `9800000000`      |
