/**
 * Sunya Visibility — Autonomous Agency Master Pipeline
 * Orchestrates Discovery -> Enrichment -> Site Generation -> Deployment -> Outreach -> Health Check.
 */

import { discoverPlaces, GooglePlaceResult } from './places';
import { enrichAndGenerateCopy } from './gemini';
import { resolveTemplateType } from './templates';
import { deployPreviewSite } from './deployer';
import { sendOutreachEmail } from './mailer';
import { sendWhatsAppOutreach } from './whatsapp';
import { supabase } from './supabaseClient';

export interface PipelineExecutionOptions {
  category?: string;
  district?: 'Kathmandu' | 'Lalitpur' | 'Bhaktapur' | 'All';
  limit?: number;
  autoSendOutreach?: boolean; // false in Phase 1 (manual review gate), true in Phase 3
}

export interface PipelineSummary {
  discovered: number;
  enriched: number;
  sitesGenerated: number;
  outreachDispatched: number;
  errors: string[];
}

export async function runAgencyPipeline(opts: PipelineExecutionOptions = {}): Promise<PipelineSummary> {
  const summary: PipelineSummary = {
    discovered: 0,
    enriched: 0,
    sitesGenerated: 0,
    outreachDispatched: 0,
    errors: [],
  };

  console.log('🚀 [Sunya Visibility Pipeline] Starting Autonomous Cycle for Kathmandu Valley...');

  // Step 1: Discovery Engine
  const places = await discoverPlaces({
    category: opts.category || 'restaurant',
    district: opts.district || 'All',
    limit: opts.limit || 5,
  });

  summary.discovered = places.length;
  console.log(`[Step 1 - Discovery] Found ${places.length} qualified leads without websites.`);

  for (const place of places) {
    try {
      // Step 2: Enrichment Engine (Google TOS-compliant theme extraction)
      console.log(`[Step 2 - Enrichment] Synthesizing authentic voice for: ${place.name} (${place.district})...`);
      const copy = await enrichAndGenerateCopy({
        name: place.name,
        category: place.category,
        district: place.district,
        address: place.address,
        rating: place.rating,
        reviews_count: place.user_ratings_total,
      });
      summary.enriched++;

      // Step 3: Template Assignment & Generation
      const templateType = resolveTemplateType(place.category);
      const slug = place.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      // Step 4: Preview Deployment
      const deployment = await deployPreviewSite(slug, { business: place, copy, templateType });
      summary.sitesGenerated++;
      console.log(`[Step 4 - Preview] Live preview ready at: ${deployment.previewUrl}`);

      // Step 5: Outreach (Only if autoSendOutreach is true, Phase 3 autonomy)
      if (opts.autoSendOutreach) {
        if (place.email) {
          const mailRes = await sendOutreachEmail({
            toEmail: place.email,
            businessName: place.name,
            district: place.district,
            category: place.category,
            previewUrl: deployment.previewUrl,
            slug,
            specificDetail: copy.signature_offerings[0]?.title || 'signature service',
            isConfidential: true,
          });
          if (mailRes.success) summary.outreachDispatched++;
        }

        if (place.phone) {
          const waRes = await sendWhatsAppOutreach({
            toPhone: place.phone,
            businessName: place.name,
            district: place.district,
            previewUrl: deployment.previewUrl,
            specificDetail: copy.signature_offerings[0]?.title || 'signature service',
          });
          if (waRes.success) summary.outreachDispatched++;
        }
      }
    } catch (err: any) {
      console.error(`[Pipeline Error] Failed processing ${place.name}:`, err);
      summary.errors.push(`${place.name}: ${err.message}`);
    }
  }

  console.log('✅ [Sunya Visibility Pipeline] Cycle complete.');
  return summary;
}
