import { describe, expect, it } from 'vitest';
import { generateAntiSpamHash, generateColdEmailCopy } from '@/lib/mailer';

describe('Outreach Engine (Mailer Module)', () => {
  it('should generate consistent SHA-256 anti-duplicate dispatch hashes', () => {
    const email = 'owner@localbusiness.com.np';
    const businessId = 'ktm_place_001';

    const hash1 = generateAntiSpamHash(email, businessId);
    const hash2 = generateAntiSpamHash(email.toUpperCase(), businessId);

    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64); // SHA-256 hex string
  });

  it('should generate personalized cold outreach copy with preview URL and pricing', () => {
    const emailData = generateColdEmailCopy({
      toEmail: 'owner@himalayanmomo.com',
      businessName: 'Himalayan Momo Corner',
      district: 'Kathmandu',
      category: 'restaurant',
      previewUrl: 'http://localhost:3005/preview/himalayan-momo-corner',
      specificDetail: 'renowned buff momo and loyal courtyard following',
      priceNpr: 12000,
      founderName: 'Basant',
    });

    expect(emailData.subject).toContain('Himalayan Momo Corner');
    expect(emailData.html).toContain('http://localhost:3005/preview/himalayan-momo-corner');
    expect(emailData.html).toContain('12,000');
    expect(emailData.bodyText).toContain('Basant');
  });
});
