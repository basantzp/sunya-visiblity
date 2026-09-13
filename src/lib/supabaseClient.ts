import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Lead {
  id: string;
  place_id: string;
  name: string;
  category: string;
  address: string;
  district: 'Kathmandu' | 'Lalitpur' | 'Bhaktapur';
  phone?: string;
  email?: string;
  rating?: number;
  reviews_count?: number;
  has_website: boolean;
  google_maps_url?: string;
  latitude?: number;
  longitude?: number;
  status:
    | 'discovered'
    | 'enriched'
    | 'site_generated'
    | 'preview_deployed'
    | 'outreach_queued'
    | 'outreached'
    | 'replied'
    | 'paid'
    | 'handed_off'
    | 'archived';
  created_at?: string;
  updated_at?: string;
}

export interface EnrichedData {
  id?: string;
  lead_id: string;
  primary_color: string;
  accent_color: string;
  brand_voice: string;
  signature_offerings: string[];
  review_themes: string[]; // Google TOS compliant: summarized themes only
  owner_photos: string[];
  opening_hours: Record<string, string>;
  extracted_at?: string;
}

export interface GeneratedSite {
  id?: string;
  lead_id: string;
  template_type: 'restaurant' | 'wellness' | 'retail' | 'services';
  subdomain: string;
  preview_url: string;
  screenshot_url?: string;
  seo_title: string;
  seo_description: string;
  schema_jsonld: Record<string, any>;
  site_content: Record<string, any>;
  deployment_provider?: 'vercel' | 'cloudflare' | 'local';
  deployment_id?: string;
  is_live: boolean;
  created_at?: string;
}

export interface OutreachLog {
  id?: string;
  lead_id: string;
  channel: 'email' | 'whatsapp';
  recipient: string;
  subject?: string;
  body_text: string;
  preview_link: string;
  preview_image_url?: string;
  price_npr: number;
  status: 'queued' | 'sent' | 'delivered' | 'failed' | 'replied';
  anti_spam_hash?: string;
  sent_at?: string;
  error_message?: string;
}
