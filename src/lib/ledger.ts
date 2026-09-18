import fs from 'fs';
import path from 'path';

export interface SentRecord {
  id: string;
  name: string;
  email: string;
  category: string;
  district: string;
  sentAt: string;
  messageId: string;
  status: 'delivered' | 'failed' | 'simulated';
}

export const LEDGER_PATH = path.join(process.cwd(), 'outreach', 'sent-ledger.json');
export const DAILY_OUTREACH_LIMIT = 20;

export function getTodayDateNPT(): string {
  // Nepal Standard Time (UTC + 5:45)
  const now = new Date();
  const nptOffsetMs = 5.75 * 60 * 60 * 1000;
  const nptDate = new Date(now.getTime() + nptOffsetMs);
  return nptDate.toISOString().split('T')[0];
}

export function getDailySentCount(dateStr?: string): number {
  const ledger = loadLedger();
  const targetDate = dateStr || getTodayDateNPT();
  return ledger.filter((r) => {
    if (!r.sentAt || r.status !== 'delivered') return false;
    const recordTime = new Date(r.sentAt).getTime();
    if (isNaN(recordTime)) return false;
    const nptRecordDate = new Date(recordTime + 5.75 * 60 * 60 * 1000).toISOString().split('T')[0];
    return nptRecordDate === targetDate;
  }).length;
}

export function canSendMoreToday(maxDaily: number = DAILY_OUTREACH_LIMIT): boolean {
  return getDailySentCount() < maxDaily;
}

export function loadLedger(): SentRecord[] {
  if (!fs.existsSync(LEDGER_PATH)) {
    const dir = path.dirname(LEDGER_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LEDGER_PATH, JSON.stringify([], null, 2), 'utf-8');
    return [];
  }
  try {
    const content = fs.readFileSync(LEDGER_PATH, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export function saveLedger(records: SentRecord[]): void {
  const dir = path.dirname(LEDGER_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(records, null, 2), 'utf-8');
}

export function isAlreadySent(email: string, name?: string): boolean {
  const ledger = loadLedger();
  const lowerEmail = email.toLowerCase().trim();
  const lowerName = name?.toLowerCase().trim();

  return ledger.some((r) => {
    if (r.email && r.email.toLowerCase().trim() === lowerEmail) return true;
    if (lowerName && r.name && r.name.toLowerCase().trim() === lowerName) return true;
    return false;
  });
}

export function recordSent(record: SentRecord): void {
  const ledger = loadLedger();
  const existingIdx = ledger.findIndex(
    (r) =>
      (r.email && r.email.toLowerCase() === record.email.toLowerCase()) ||
      (r.name && r.name.toLowerCase() === record.name.toLowerCase()),
  );

  if (existingIdx >= 0) {
    ledger[existingIdx] = record;
  } else {
    ledger.push(record);
  }
  saveLedger(ledger);
}
