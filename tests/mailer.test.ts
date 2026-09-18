import { describe, expect, it } from 'vitest';
import { generateAntiSpamHash, generateColdEmailCopy, sendOutreachEmail } from '@/lib/mailer';

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

  it('should never attach Sandar Momo social proof screenshots to outreach emails', async () => {
    const result = await sendOutreachEmail({
      toEmail: 'kathmandusteakhouse@gmail.com',
      businessName: 'Kathmandu Steak House Restaurant',
      district: 'Kathmandu',
      category: 'restaurant',
      previewUrl: 'http://localhost:3005/preview/kathmandu-steak-house',
      slug: 'kathmandu-steak-house',
      dryRun: true,
    });

    const attachmentFilenames = (result.attachments || []).map((a) => a.filename);
    expect(attachmentFilenames).not.toContain('community-reddit-discussion.png');
    expect(attachmentFilenames).not.toContain('community-x-review.png');
    expect(attachmentFilenames).not.toContain('community-facebook-discussion.png');
  });

  it('should never show momo items, momo photos, or Sandar references for steak houses', () => {
    const steakEmail = generateColdEmailCopy({
      toEmail: 'kathmandusteakhouse@gmail.com',
      businessName: 'Kathmandu Steak House Restaurant',
      district: 'Kathmandu',
      category: 'restaurant',
      previewUrl: 'http://localhost:3005/preview/kathmandu-steak-house',
      slug: 'kathmandu-steak-house',
    });

    const lowerHtml = steakEmail.html.toLowerCase();
    expect(lowerHtml).not.toContain('momo');
    expect(lowerHtml).not.toContain('sandar');
    expect(lowerHtml).toContain('steak');
    expect(steakEmail.html).toContain('Kathmandu Steak House Restaurant');
    expect(steakEmail.subject).toContain('Kathmandu Steak House Restaurant');
  });

  it('should never show momo items or Sandar references for bakeries', () => {
    const bakeryEmail = generateColdEmailCopy({
      toEmail: 'chefbs2000@gmail.com',
      businessName: 'French Bakery',
      district: 'Kathmandu',
      category: 'bakery',
      previewUrl: 'http://localhost:3005/preview/french-bakery-paknajol',
      slug: 'french-bakery-paknajol',
    });

    const lowerHtml = bakeryEmail.html.toLowerCase();
    expect(lowerHtml).not.toContain('momo');
    expect(lowerHtml).not.toContain('sandar');
    expect(lowerHtml).toContain('croissant');
    expect(bakeryEmail.html).toContain('French Bakery');
  });

  it('should correctly include authentic momo items when shop is a genuine momo shop', () => {
    const momoEmail = generateColdEmailCopy({
      toEmail: 'mrmomonepal@gmail.com',
      businessName: 'Mr. Momo',
      district: 'Kathmandu',
      category: 'restaurant',
      previewUrl: 'http://localhost:3005/preview/mr-momo-midbaneshwor',
      slug: 'mr-momo-midbaneshwor',
    });

    const lowerHtml = momoEmail.html.toLowerCase();
    expect(lowerHtml).toContain('momo');
    expect(momoEmail.html).toContain('Mr. Momo');
  });

  it('should generate bespoke clothing boutique emails with fashion banner, lookbook items, and zero momo/steak mentions', () => {
    const boutiqueEmail = generateColdEmailCopy({
      toEmail: 'info@sanahastakala.com',
      businessName: 'Sana Hastakala Crafts & Clothing Boutique',
      district: 'Lalitpur',
      category: 'boutique',
      previewUrl: 'http://localhost:3005/preview/sana-hastakala-boutique',
      slug: 'sana-hastakala-boutique',
    });

    expect(boutiqueEmail.subject).toContain('Digital Lookbook Draft');
    expect(boutiqueEmail.html).toContain('photo-1441984904996-e0b6ba687e04'); // Clothing boutique banner
    expect(boutiqueEmail.html).toContain('Handwoven Pashmina Shawl');
    expect(boutiqueEmail.html).toContain('Block-Printed Organic Cotton Kurtha');
    expect(boutiqueEmail.html).toContain('Seasonal Collection & Lookbook Preview');

    const lowerHtml = boutiqueEmail.html.toLowerCase();
    expect(lowerHtml).not.toContain('momo');
    expect(lowerHtml).not.toContain('steak');
    expect(lowerHtml).not.toContain('sandar');
  });

  it('should generate bespoke hotel emails with luxury suite banner, room rates, and zero momo/steak mentions', () => {
    const hotelEmail = generateColdEmailCopy({
      toEmail: 'reservation@thamelheritage.com',
      businessName: 'Thamel Heritage Boutique Hotel',
      district: 'Kathmandu',
      category: 'hotel',
      previewUrl: 'http://localhost:3005/preview/thamel-heritage-boutique-hotel',
      slug: 'thamel-heritage-boutique-hotel',
    });

    expect(hotelEmail.subject).toContain('Direct Room Booking System');
    expect(hotelEmail.html).toContain('photo-1566073771259-6a8506099945'); // Hotel suite banner
    expect(hotelEmail.html).toContain('Deluxe King Balcony Room');
    expect(hotelEmail.html).toContain('Mountain View Executive Suite');
    expect(hotelEmail.html).toContain('Rooms, Suites & Stay Packages');

    const lowerHtml = hotelEmail.html.toLowerCase();
    expect(lowerHtml).not.toContain('momo');
    expect(lowerHtml).not.toContain('steak');
    expect(lowerHtml).not.toContain('sandar');
  });

  it("should address business recipients formally as Dear Sir/Ma'am and never use informal Namaste or Dai / Didi in greetings", () => {
    const email = generateColdEmailCopy({
      toEmail: 'chefbs2000@gmail.com',
      businessName: 'French Bakery',
      district: 'Kathmandu',
      category: 'bakery',
      previewUrl: 'http://localhost:3005/preview/french-bakery-paknajol',
      slug: 'french-bakery-paknajol',
    });

    // Greeting must be formal
    expect(email.bodyText).toContain("Dear Sir/Ma'am & Management");
    expect(email.html).toContain("Dear Sir/Ma'am &amp; Management");

    // No informal 'Namaste' or 'Dai / Didi'
    expect(email.bodyText).not.toContain('Namaste');
    expect(email.bodyText).not.toContain('Dai / Didi');
    expect(email.html).not.toContain('Namaste');
    expect(email.html).not.toContain('Dai / Didi');
  });

  it('should block repeat outreach emails to the same client (strict deduplication)', async () => {
    // chefbs2000@gmail.com (French Bakery) is already recorded in sent-ledger.json
    const repeatAttempt = await sendOutreachEmail({
      toEmail: 'chefbs2000@gmail.com',
      businessName: 'French Bakery',
      district: 'Kathmandu',
      category: 'bakery',
      previewUrl: 'http://localhost:3005/preview/french-bakery-paknajol',
      slug: 'french-bakery-paknajol',
      dryRun: false,
    });

    expect(repeatAttempt.success).toBe(false);
    expect(repeatAttempt.skipped).toBe(true);
    expect(repeatAttempt.error).toContain('Strict Deduplication');
  });

  it('should strictly enforce the daily ceiling of 20 outreach emails across Nepal', async () => {
    // Attempting to send to a brand-new non-duplicate business in Pokhara
    // Today's ledger already contains >= 20 emails
    const attempt = await sendOutreachEmail({
      toEmail: 'newunseenhotel999@pokhara.com.np',
      businessName: 'Unseen Lakeside Boutique Resort',
      district: 'Pokhara',
      category: 'hotel',
      previewUrl: 'http://localhost:3005/preview/unseen-lakeside-boutique-resort',
      slug: 'unseen-lakeside-boutique-resort',
      dryRun: false,
    });

    expect(attempt.success).toBe(false);
    expect(attempt.skipped).toBe(true);
    expect(attempt.error).toContain('Daily Limit Reached');
  });
});
