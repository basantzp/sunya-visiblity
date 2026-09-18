/**
 * Sunya Visibility — Autonomous Background Worker
 * Scheduled autonomous agent processor for Kathmandu Valley:
 * - Runs periodic discovery and site generation cycles
 * - Processes pending outreach queues within safe daily rate limits
 * - Can be executed directly or run inside Docker/systemd:
 *     pnpm worker
 */

import dotenv from 'dotenv';
import {
  canSendMoreToday,
  DAILY_OUTREACH_LIMIT,
  getDailySentCount,
  getTodayDateNPT,
} from '../src/lib/ledger';
import { runAgencyPipeline } from '../src/lib/pipeline';
import { NepalDistrict } from '../src/lib/places';

dotenv.config({ path: '.env.local' });
dotenv.config();

// Parse optional CLI args: --interval-mins 15
const args = process.argv.slice(2);
const intervalArgIdx = args.indexOf('--interval-mins');
const customMins =
  intervalArgIdx >= 0 && args[intervalArgIdx + 1] ? parseInt(args[intervalArgIdx + 1], 10) : null;

const INTERVAL_MS = customMins
  ? customMins * 60 * 1000
  : parseInt(process.env.WORKER_INTERVAL_MS || '900000', 10); // Default: 15 minutes

const isAutoOutreach = process.env.AUTO_OUTREACH !== 'false';

// Dynamic rotation across all commercial districts in Nepal
const ALL_NEPAL_REGIONS: (NepalDistrict | 'All')[] = [
  'All',
  'Pokhara',
  'Kathmandu',
  'Chitwan',
  'Butwal',
  'Dharan',
  'Lalitpur',
  'Biratnagar',
  'Nepalgunj',
  'Bhaktapur',
];

let currentRegionIndex = 0;
let isRunning = false;
let shouldStop = false;

async function executeCycle() {
  if (isRunning) {
    console.log('[Worker] Previous cycle still active, skipping tick.');
    return;
  }

  isRunning = true;
  const timestamp = new Date().toISOString();
  const todayNPT = getTodayDateNPT();
  const sentToday = getDailySentCount();
  const canSend = canSendMoreToday(DAILY_OUTREACH_LIMIT);
  const remainingToday = Math.max(0, DAILY_OUTREACH_LIMIT - sentToday);

  // Rotate to next region in Nepal
  const currentDistrict = ALL_NEPAL_REGIONS[currentRegionIndex % ALL_NEPAL_REGIONS.length];
  currentRegionIndex++;

  console.log(`\n⏰ [Worker Tick] Starting autonomous cycle at ${timestamp}`);
  console.log(`🇳🇵 [Coverage Scope]: Target Region -> ${currentDistrict} (Rotating all over Nepal)`);
  console.log(
    `📊 [Daily Quota]: ${sentToday}/${DAILY_OUTREACH_LIMIT} emails dispatched today (${todayNPT} NPT). Remaining: ${remainingToday}`,
  );

  if (!canSend) {
    console.warn(
      `🛑 [Daily Quota Ceil Reached]: Strict limit of ${DAILY_OUTREACH_LIMIT} emails/day across Nepal is met.`,
    );
    console.warn(
      `   No more emails will be dispatched today. Autonomous cycle will generate leads & previews without mailing until tomorrow 00:00 NPT.`,
    );
  }

  // Batch size: at most 3 per cycle, capped by remaining allowance today
  const batchLimit = canSend ? Math.min(3, remainingToday) : 5;
  const shouldDispatch = isAutoOutreach && canSend;

  try {
    const summary = await runAgencyPipeline({
      category: 'all',
      district: currentDistrict,
      limit: batchLimit,
      autoSendOutreach: shouldDispatch,
    });

    const updatedSentToday = getDailySentCount();
    console.log('[Worker Tick] Cycle completed successfully:');
    console.log(`  - Region:      ${currentDistrict}`);
    console.log(`  - Discovered:  ${summary.discovered}`);
    console.log(`  - Enriched:    ${summary.enriched}`);
    console.log(`  - Generated:   ${summary.sitesGenerated}`);
    console.log(`  - Dispatched:  ${summary.outreachDispatched}`);
    console.log(
      `  - Daily Total: ${updatedSentToday}/${DAILY_OUTREACH_LIMIT} dispatched today across Nepal`,
    );
    if (summary.errors.length > 0) {
      console.warn(`  - Warnings/Errors: ${summary.errors.length}`);
    }
  } catch (error) {
    console.error('[Worker Error] Unhandled exception during cycle:', error);
  } finally {
    isRunning = false;
  }
}

async function start() {
  console.log('🤖 [Sunya Visibility Autonomous Worker] Booting up...');
  console.log(`   - Cycle Interval: ${INTERVAL_MS / 1000 / 60} minutes`);
  console.log(
    `   - Auto Outreach:  ${isAutoOutreach ? 'ENABLED (Deduplicated via sent-ledger.json)' : 'DISABLED (Safe Review Mode)'}`,
  );

  // Execute initial cycle on start
  await executeCycle();

  const timer = setInterval(() => {
    if (shouldStop) {
      clearInterval(timer);
      return;
    }
    executeCycle();
  }, INTERVAL_MS);

  const shutdown = () => {
    console.log('\n🛑 [Worker] Graceful shutdown initiated. Waiting for active jobs...');
    shouldStop = true;
    clearInterval(timer);
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

start().catch((err) => {
  console.error('[Worker Fatal]:', err);
  process.exit(1);
});
