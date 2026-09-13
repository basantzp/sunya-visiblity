import { describe, expect, it } from 'vitest';
import { discoverPlaces } from '@/lib/places';

describe('Discovery Engine (Places Module)', () => {
  it('should discover Kathmandu Valley mock leads when API key is missing/placeholder', async () => {
    const leads = await discoverPlaces({ category: 'all', district: 'All' });
    expect(leads).toBeDefined();
    expect(leads.length).toBeGreaterThan(0);
  });

  it('should enforce lead qualification filter: rating >= 4.0 and reviews >= 15', async () => {
    const minRating = 4.0;
    const minReviews = 15;
    const leads = await discoverPlaces({
      category: 'all',
      district: 'All',
      minRating,
      minReviews,
    });

    for (const lead of leads) {
      expect(lead.rating).toBeGreaterThanOrEqual(minRating);
      expect(lead.user_ratings_total).toBeGreaterThanOrEqual(minReviews);
      // Lead qualifier: business should not have an existing website
      expect(lead.website).toBeUndefined();
    }
  });

  it('should filter leads by district', async () => {
    const kathmanduLeads = await discoverPlaces({ category: 'all', district: 'Kathmandu' });
    for (const lead of kathmanduLeads) {
      expect(lead.district).toBe('Kathmandu');
    }

    const lalitpurLeads = await discoverPlaces({ category: 'all', district: 'Lalitpur' });
    for (const lead of lalitpurLeads) {
      expect(lead.district).toBe('Lalitpur');
    }
  });
});
