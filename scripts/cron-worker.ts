/**
 * Sunya Visibility — Autonomous Background Worker
 * Scheduled autonomous agent processor for Kathmandu Valley:
 * - Runs periodic discovery and site generation cycles
 * - Processes pending outreach queues within safe daily rate limits
 * - Can be executed directly or run inside Docker/systemd:
 *     pnpm worker
 */

import 'dotenv/config';
import { runAgencyPipeline } from '../src/lib/pipeline';

const INTERVAL_MS = parseInt(process.env.WORKER_INTERVAL_MS || '3600000', 10); // Default: 1 hour

let isRunning = false;
let shouldStop = false;

async function executeCycle() {
  if (isRunning) {
    console.log('[Worker] Previous cycle still active, skipping tick.');
    return;
  }

  isRunning = true;
  const timestamp = new Date().toISOString();
  console.log(`\n⏰ [Worker Tick] Starting autonomous cycle at ${timestamp}`);

  try {
    const summary = await runAgencyPipeline({
      category: 'all',
      district: 'All',
      limit: 5,
      autoSendOutreach: process.env.AUTO_OUTREACH === 'true',
    });

    console.log('[Worker Tick] Cycle completed successfully:');
    console.log(`  - Discovered: ${summary.discovered}`);
    console.log(`  - Enriched:   ${summary.enriched}`);
    console.log(`  - Generated:  ${summary.sitesGenerated}`);
    console.log(`  - Dispatched: ${summary.outreachDispatched}`);
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
    `   - Auto Outreach:  ${process.env.AUTO_OUTREACH === 'true' ? 'ENABLED' : 'DISABLED (Safe Review Mode)'}`,
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
