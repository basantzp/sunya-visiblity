/**
 * Sunya Visibility — Project Configuration & Constants
 * Kathmandu Valley geographical bounds, localized pricing, and agency operational limits.
 */

import { District, PricingConfig } from '@/types';

export const KATHMANDU_VALLEY_DISTRICTS: District[] = ['Kathmandu', 'Lalitpur', 'Bhaktapur'];

export const KATHMANDU_VALLEY_COORDINATES = {
  Kathmandu: { lat: 27.7172, lng: 85.324, radius: 10000 },
  Lalitpur: { lat: 27.667, lng: 85.32, radius: 8000 },
  Bhaktapur: { lat: 27.671, lng: 85.4298, radius: 8000 },
} as const;

export const TARGET_CATEGORIES = [
  'restaurant',
  'cafe',
  'bakery',
  'spa',
  'ayurveda',
  'boutique',
  'handicrafts',
  'pottery',
  'clinic',
  'fitness',
] as const;

export const DEFAULT_PRICING: PricingConfig = {
  setupFeeNpr: 12000,
  monthlyHostingNpr: 1500,
  currency: 'NPR',
};

export const RATE_LIMITS = {
  maxDailyEmails: 50,
  maxDailyWhatsApp: 30,
  minLeadRating: 4.0,
  minLeadReviews: 15,
} as const;

export const SUPPORTED_PAYMENTS = [
  { id: 'fonepay', name: 'FonePay QR', instant: true },
  { id: 'esewa', name: 'eSewa Mobile Wallet', instant: true },
  { id: 'khalti', name: 'Khalti Digital Wallet', instant: true },
] as const;
