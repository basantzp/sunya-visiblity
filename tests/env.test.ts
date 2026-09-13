import { describe, expect, it } from 'vitest';
import { env } from '@/config/env';

describe('Environment Validator (Zod Schema)', () => {
  it('should provide default values for critical settings in offline mode', () => {
    expect(env.NEXT_PUBLIC_BASE_URL).toBeDefined();
    expect(env.FOUNDER_NAME).toBe('Basant');
    expect(env.FOUNDER_WHATSAPP).toBe('+977-9800000000');
  });

  it('should safely fallback for external services without throwing runtime crashes', () => {
    expect(env.GOOGLE_PLACES_API_KEY).toBeDefined();
    expect(env.GEMINI_API_KEY).toBeDefined();
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toContain('supabase.co');
  });
});
