-- ==============================================================================
-- Sunya — Autonomous Local Website Agency Schema
-- PostgreSQL Schema for Supabase
-- Target: Kathmandu Valley (Kathmandu, Lalitpur, Bhaktapur)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Leads Table (Businesses discovered from Google Places with rating >= 4.0, reviews >= 15, NO website)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- restaurant, cafe, spa, salon, gym, clinic, boutique, tutoring, hotel
    address TEXT NOT NULL,
    district TEXT NOT NULL, -- Kathmandu, Lalitpur, Bhaktapur
    phone TEXT,
    email TEXT,
    rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 5),
    reviews_count INT DEFAULT 0,
    has_website BOOLEAN DEFAULT FALSE,
    google_maps_url TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    status TEXT DEFAULT 'discovered' CHECK (status IN (
        'discovered',
        'enriched',
        'site_generated',
        'preview_deployed',
        'outreach_queued',
        'outreached',
        'replied',
        'paid',
        'handed_off',
        'archived'
    )),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enriched Data (Synthesized themes, colors, and specifics - NO VERBATIM REVIEWS)
CREATE TABLE IF NOT EXISTS public.enriched_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    primary_color TEXT DEFAULT '#003893', -- Nepal Blue default
    accent_color TEXT DEFAULT '#DC143C',  -- Nepal Crimson default
    brand_voice TEXT DEFAULT 'Friendly and authentic local neighborhood staple',
    signature_offerings JSONB DEFAULT '[]'::JSONB,
    review_themes JSONB DEFAULT '[]'::JSONB, -- AI-synthesized themes, compliant with Google Terms
    owner_photos JSONB DEFAULT '[]'::JSONB,
    opening_hours JSONB DEFAULT '{}'::JSONB,
    extracted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Generated Sites (Multi-template static Next.js preview deployments)
CREATE TABLE IF NOT EXISTS public.generated_sites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    template_type TEXT NOT NULL CHECK (template_type IN ('restaurant', 'wellness', 'retail', 'services')),
    subdomain TEXT UNIQUE NOT NULL,
    preview_url TEXT NOT NULL,
    screenshot_url TEXT,
    seo_title TEXT NOT NULL,
    seo_description TEXT NOT NULL,
    schema_jsonld JSONB NOT NULL,
    site_content JSONB NOT NULL, -- Clean JSON structure for templates
    deployment_provider TEXT DEFAULT 'vercel' CHECK (deployment_provider IN ('vercel', 'cloudflare', 'local')),
    deployment_id TEXT,
    is_live BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Outreach Log (Email SMTP & WhatsApp dispatch tracking with hard rate limits)
CREATE TABLE IF NOT EXISTS public.outreach_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    recipient TEXT NOT NULL,
    subject TEXT,
    body_text TEXT NOT NULL,
    preview_link TEXT NOT NULL,
    preview_image_url TEXT,
    price_npr NUMERIC(10,2) DEFAULT 12000.00,
    status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'delivered', 'failed', 'replied')),
    anti_spam_hash TEXT UNIQUE, -- Prevents double-send to same business on same channel
    sent_at TIMESTAMPTZ,
    response_received_at TIMESTAMPTZ,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Payments & Client Handoff (eSewa, Khalti, FonePay, domain mapping, zip exports)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    amount_npr NUMERIC(10,2) NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('esewa', 'khalti', 'fonepay', 'bank_transfer')),
    transaction_reference TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'failed', 'refunded')),
    handoff_type TEXT DEFAULT 'hosted' CHECK (handoff_type IN ('hosted', 'export_zip')),
    custom_domain TEXT,
    export_zip_url TEXT,
    recurring_monthly_npr NUMERIC(10,2) DEFAULT 1500.00,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. System Metrics & Financial Health Guardrail
-- Triggers loud alert if infra spend exceeds revenue for 2 consecutive months
CREATE TABLE IF NOT EXISTS public.system_metrics (
    month TEXT PRIMARY KEY, -- Format: YYYY-MM
    infra_cost_usd NUMERIC(8,2) DEFAULT 0.00,
    revenue_npr NUMERIC(10,2) DEFAULT 0.00,
    revenue_usd NUMERIC(8,2) DEFAULT 0.00,
    leads_discovered INT DEFAULT 0,
    sites_generated INT DEFAULT 0,
    outreach_sent INT DEFAULT 0,
    paying_clients INT DEFAULT 0,
    consecutive_loss_months INT DEFAULT 0,
    alert_triggered BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_district ON public.leads(district);
CREATE INDEX IF NOT EXISTS idx_leads_category ON public.leads(category);
CREATE INDEX IF NOT EXISTS idx_outreach_status ON public.outreach_log(status);
CREATE INDEX IF NOT EXISTS idx_outreach_sent_at ON public.outreach_log(sent_at);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
