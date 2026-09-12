/**
 * Sunya Visibility — Autonomous Pipeline CLI Runner
 * Can be executed via CLI:
 *   pnpm pipeline:all
 *   pnpm pipeline:discover
 *   pnpm pipeline:enrich
 */

import 'dotenv/config';
import { runAgencyPipeline } from '../src/lib/pipeline';

async function main() {
  const args = process.argv.slice(2);
  const action = args.includes('--action') ? args[args.indexOf('--action') + 1] : 'all';

  console.log(`[CLI Runner] Executing action: ${action}`);

  const summary = await runAgencyPipeline({
    category: 'all',
    district: 'All',
    limit: 10,
    autoSendOutreach: false, // Default false for Phase 1 MVP human review safety
  });

  console.log('\n==========================================');
  console.log('Sunya Visibility Pipeline Results:');
  console.log(`Discovered:        ${summary.discovered}`);
  console.log(`Enriched:          ${summary.enriched}`);
  console.log(`Sites Generated:   ${summary.sitesGenerated}`);
  console.log(`Outreach Sent:     ${summary.outreachDispatched}`);
  console.log(`Errors:            ${summary.errors.length}`);
  console.log('==========================================\n');
}

main().catch((err) => {
  console.error('[Fatal Error]:', err);
  process.exit(1);
});
