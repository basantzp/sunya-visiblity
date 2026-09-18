import { execSync } from 'child_process';
import { NextResponse } from 'next/server';
import {
  canSendMoreToday,
  DAILY_OUTREACH_LIMIT,
  getDailySentCount,
  getTodayDateNPT,
  loadLedger,
} from '@/lib/ledger';

export async function GET() {
  try {
    const ledger = loadLedger();
    const lastRecord = ledger.length > 0 ? ledger[ledger.length - 1] : null;

    const sentToday = getDailySentCount();
    const dailyLimit = DAILY_OUTREACH_LIMIT;
    const remainingToday = Math.max(0, dailyLimit - sentToday);
    const canSendToday = canSendMoreToday(dailyLimit);
    const todayDateNPT = getTodayDateNPT();

    let workerRunning = false;
    try {
      const psOutput = execSync('pgrep -f "scripts/cron-worker.ts" || true', { encoding: 'utf-8' });
      workerRunning = Boolean(psOutput && psOutput.trim().length > 0);
    } catch {
      workerRunning = false;
    }

    const activeAutomations = [
      ...(workerRunning ? ['Autonomous Discovery & Outreach Worker Daemon'] : []),
      'Next.js Interactive Preview Host (Port 3005)',
      'Strict Zero Multi-Mailing Deduplication Engine',
      `Strict Daily Quota Engine (Max ${dailyLimit} Daily / All Nepal)`,
      sentToday >= dailyLimit
        ? `Daily Quota Reached (${sentToday}/${dailyLimit}) — Paused until tomorrow 00:00 NPT`
        : `Daily Quota Active (${sentToday}/${dailyLimit} sent today, ${remainingToday} remaining)`,
      'Zero-API Fees Discovery Engine ($0.00 Cost)',
    ];

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      active: true,
      workerRunning,
      devServerRunning: true,
      totalDeliveredShops: ledger.length,
      dailySentToday: sentToday,
      dailyLimit,
      remainingToday,
      canSendToday,
      todayDateNPT,
      scope:
        'All Over Nepal (Kathmandu, Pokhara, Chitwan, Butwal, Dharan, Biratnagar, Nepalgunj, Bhaktapur, Lalitpur)',
      lastDispatchedShop: lastRecord ? lastRecord.name : 'None yet',
      lastDispatchedTime: lastRecord ? lastRecord.sentAt : null,
      activeAutomations,
      deduplicationActive: true,
      salutationStandard: "Dear Sir/Ma'am (Formal)",
      system: {
        platform: 'Linux (Arch Linux / Hyprland / Omarchy)',
        costMode: 'Zero API Fees ($0.00 / NPR 0.00)',
        cycleIntervalMinutes: 15,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
