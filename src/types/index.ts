/**
 * Sunya Visibility — Core Domain Type Definitions
 * Centralized types for all autonomous agency pipelines, database models, and template configurations.
 */

export type { Lead, EnrichedData, GeneratedSite, OutreachLog } from '@/lib/supabaseClient';

export type { GooglePlaceResult, DiscoveryOptions } from '@/lib/places';

export type { TemplateType } from '@/lib/templates';

export type { BusinessInputForEnrichment, EnrichedCopyResult } from '@/lib/gemini';

export type { OutreachMailOptions } from '@/lib/mailer';

export type { PipelineExecutionOptions, PipelineSummary } from '@/lib/pipeline';

export type District = 'Kathmandu' | 'Lalitpur' | 'Bhaktapur';

export interface PricingConfig {
  setupFeeNpr: number;
  monthlyHostingNpr: number;
  currency: string;
}

export interface AppConfig {
  baseUrl: string;
  districts: District[];
  defaultCategories: string[];
  pricing: PricingConfig;
}
