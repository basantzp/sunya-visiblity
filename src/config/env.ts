/**
 * Sunya Visibility — Environment Configuration & Validation
 * Validates and exposes strictly-typed environment variables.
 * Safe fallbacks ensure the app boots in offline development mode without throwing fatal errors.
 */

import { z } from 'zod';

const envSchema = z.object({
  // 1. App Base URL
  NEXT_PUBLIC_BASE_URL: z.string().url().default('http://localhost:3005'),

  // 2. Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default('https://placeholder.supabase.co'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().default('placeholder-anon-key'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().default('placeholder-service-role-key'),

  // 3. Google Places API
  GOOGLE_PLACES_API_KEY: z.string().default('placeholder'),

  // 4. Gemini AI
  GEMINI_API_KEY: z.string().default('placeholder'),

  // 5. Email (Gmail SMTP)
  GMAIL_USER: z.string().email().optional().or(z.literal('')),
  GMAIL_APP_PASSWORD: z.string().optional().or(z.literal('')),

  // 6. WhatsApp Cloud API
  WHATSAPP_CLOUD_TOKEN: z.string().default('placeholder-token'),
  WHATSAPP_PHONE_NUMBER_ID: z.string().default('placeholder-phone-id'),

  // 7. Preview Hosting (Vercel)
  VERCEL_API_TOKEN: z.string().default('placeholder-token'),
  VERCEL_PROJECT_ID: z.string().default('placeholder-project-id'),

  // 8. Founder & Merchant Details
  FOUNDER_NAME: z.string().default('Basant'),
  FOUNDER_WHATSAPP: z.string().default('+977-9800000000'),
  ESEWA_MERCHANT_ID: z.string().default('9800000000'),
  KHALTI_MERCHANT_ID: z.string().default('9800000000'),

  // 9. v0 UI Generator MCP
  V0_API_KEY: z.string().optional().or(z.literal('')),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ [Config Error] Invalid environment variables:');
    console.error(result.error.format());
    return envSchema.parse({});
  }

  return result.data;
}

export const env = parseEnv();
