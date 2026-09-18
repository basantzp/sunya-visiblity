import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import {
  isAlreadySent,
  LEDGER_PATH,
  loadLedger,
  recordSent,
  saveLedger,
  SentRecord,
} from '../src/lib/ledger';
import { sendOutreachEmail } from '../src/lib/mailer';

dotenv.config({ path: '.env.local' });
dotenv.config();

interface TargetShop {
  id: string;
  name: string;
  category: string;
  address: string;
  district: 'Kathmandu' | 'Lalitpur' | 'Bhaktapur';
  email: string;
  phone?: string;
  slug: string;
}

// 20 Verified Brick-and-Mortar Shops in Kathmandu Valley
const KATHMANDU_20_SHOPS: TargetShop[] = [
  {
    id: 'ktm-shop-001',
    name: 'Mr. Momo',
    category: 'restaurant',
    address: 'Basukimarga, Midbaneshwor, Kathmandu',
    district: 'Kathmandu',
    email: 'mrmomonepal@gmail.com',
    phone: '+977-9849740063',
    slug: 'mr-momo-midbaneshwor',
  },
  {
    id: 'ktm-shop-002',
    name: 'French Bakery',
    category: 'bakery',
    address: 'Paknajol, Chetrapati, Kathmandu',
    district: 'Kathmandu',
    email: 'chefbs2000@gmail.com',
    slug: 'french-bakery-paknajol',
  },
  {
    id: 'ktm-shop-003',
    name: 'Utpala BakeHouse',
    category: 'bakery',
    address: 'Boudha, Kathmandu',
    district: 'Kathmandu',
    email: 'boharadeep74@gmail.com',
    slug: 'utpala-bakehouse-boudha',
  },
  {
    id: 'ktm-shop-004',
    name: 'Sa.Ra Bakes Vegan',
    category: 'bakery',
    address: 'Arun Thapa Chowk, Lalitpur',
    district: 'Lalitpur',
    email: 'sarasarabakesvegan@gmail.com',
    slug: 'sara-bakes-vegan-lalitpur',
  },
  {
    id: 'ktm-shop-005',
    name: 'Healthy Pasal',
    category: 'retail',
    address: 'Boudha, Tushal Marg, Kathmandu',
    district: 'Kathmandu',
    email: 'healthygroupnepal@gmail.com',
    slug: 'healthy-pasal-boudha',
  },
  {
    id: 'ktm-shop-006',
    name: 'Apsara Dry Foods',
    category: 'retail',
    address: 'Kalinchok Marg, Maitidevi, Kathmandu',
    district: 'Kathmandu',
    email: 'apsaradryfoods@gmail.com',
    slug: 'apsara-dry-foods-maitidevi',
  },
  {
    id: 'ktm-shop-007',
    name: 'Jaiswal Fruits Juice Pan Pasal',
    category: 'cafe',
    address: 'Ekantakuna, Lalitpur',
    district: 'Lalitpur',
    email: 'Jaiswalrakesh4u76@gmail.com',
    slug: 'jaiswal-fruits-juice-ekantakuna',
  },
  {
    id: 'ktm-shop-008',
    name: 'Thakkhola Thakali Kitchen',
    category: 'restaurant',
    address: 'Ranamukteshwor Marg, Khichapokhari, Kathmandu',
    district: 'Kathmandu',
    email: 'bishnusherchan52@gmail.com',
    slug: 'thakkhola-thakali-kitchen-khichapokhari',
  },
  {
    id: 'ktm-shop-009',
    name: 'Bhojan Griha',
    category: 'restaurant',
    address: 'Dillibazar, Kathmandu',
    district: 'Kathmandu',
    email: 'booking.bhojangriha@gmail.com',
    slug: 'bhojan-griha-dillibazar',
  },
  {
    id: 'ktm-shop-010',
    name: 'Rosemary Kitchen and Coffee Shop',
    category: 'restaurant',
    address: 'Thamel, Kathmandu',
    district: 'Kathmandu',
    email: 'rosemarykitchenktm@gmail.com',
    slug: 'rosemary-kitchen-thamel',
  },
  {
    id: 'ktm-shop-011',
    name: 'Farm Garden Cafe',
    category: 'cafe',
    address: 'Kathmandu Valley',
    district: 'Kathmandu',
    email: 'farmgardencafenepal@gmail.com',
    slug: 'farm-garden-cafe-kathmandu',
  },
  {
    id: 'ktm-shop-012',
    name: 'Zorpido Cafe',
    category: 'cafe',
    address: 'Kathmandu Valley',
    district: 'Kathmandu',
    email: 'zorpido@gmail.com',
    slug: 'zorpido-cafe-kathmandu',
  },
  {
    id: 'ktm-shop-013',
    name: 'Traditional Bakery & Cake Shop',
    category: 'bakery',
    address: 'Kuleshwor, Kathmandu',
    district: 'Kathmandu',
    email: 'jesanalam12345@gmail.com',
    slug: 'traditional-bakery-kuleshwor',
  },
  {
    id: 'ktm-shop-014',
    name: 'RED MUG CAFE',
    category: 'cafe',
    address: 'Kalanki, Kathmandu',
    district: 'Kathmandu',
    email: 'bholaman243@gmail.com',
    slug: 'red-mug-cafe-kalanki',
  },
  {
    id: 'ktm-shop-015',
    name: 'Global Kitchen',
    category: 'restaurant',
    address: 'New Road, Kathmandu',
    district: 'Kathmandu',
    email: 'globalkitchen.np@gmail.com',
    slug: 'global-kitchen-new-road',
  },
  {
    id: 'ktm-shop-016',
    name: 'Kathmandu Steak House Restaurant',
    category: 'restaurant',
    address: 'Chhetrapati, Ward 16, Kathmandu',
    district: 'Kathmandu',
    email: 'kathmandusteakhouse@gmail.com',
    slug: 'kathmandu-steak-house',
  },
  {
    id: 'ktm-shop-017',
    name: 'Makoo Bakery',
    category: 'bakery',
    address: 'Jawalakhel, Lalitpur',
    district: 'Lalitpur',
    email: 'makoobakery@gmail.com',
    slug: 'makoo-bakery-jawalakhel',
  },
  {
    id: 'ktm-shop-018',
    name: 'Manna Bakery',
    category: 'bakery',
    address: 'Satdobato / Talchikhel, Lalitpur',
    district: 'Lalitpur',
    email: 'findmannabakery@gmail.com',
    slug: 'manna-bakery-satdobato',
  },
  {
    id: 'ktm-shop-019',
    name: 'Fit Bar Nepal',
    category: 'fitness',
    address: 'Gwarko, Lalitpur',
    district: 'Lalitpur',
    email: 'thefitindustries@gmail.com',
    slug: 'fit-bar-nepal-gwarko',
  },
  {
    id: 'ktm-shop-020',
    name: 'The Pump Fitness Center',
    category: 'gym',
    address: 'Jhamsikhel Road, Lalitpur',
    district: 'Lalitpur',
    email: 'thepump1234@gmail.com',
    slug: 'the-pump-fitness-jhamsikhel',
  },
  {
    id: 'ktm-shop-021',
    name: 'Sana Hastakala Crafts & Clothing Boutique',
    category: 'boutique',
    address: 'Kupondole & Thamel, Kathmandu',
    district: 'Lalitpur',
    email: 'info@sanahastakala.com',
    phone: '+977-1-5522628',
    slug: 'sana-hastakala-boutique',
  },
  {
    id: 'ktm-shop-022',
    name: 'Thamel Heritage Boutique Hotel',
    category: 'hotel',
    address: 'Bhagwati Marg, Thamel, Kathmandu',
    district: 'Kathmandu',
    email: 'reservation@thamelboutiquehotels.com',
    phone: '+977-1-4700812',
    slug: 'thamel-heritage-boutique-hotel',
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('================================================================');
  console.log('SUNYA — AUTONOMOUS OUTREACH DISPATCH (KATHMANDU VALLEY SHOPS)');
  console.log('================================================================');
  console.log(`Sender: ${process.env.GMAIL_USER || 'thesunya.official@gmail.com'}`);
  console.log(`Total Configured Shops: ${KATHMANDU_20_SHOPS.length}`);
  console.log(`Ledger Path: ${LEDGER_PATH}`);

  const isDryRun = process.argv.includes('--dry-run');
  const isMomoOnly = process.argv.includes('--momo-only');
  const isForce = process.argv.includes('--force');
  const shopArg = process.argv.find((a) => a.startsWith('--shop='));
  const targetSlug = shopArg ? shopArg.split('=')[1].trim().toLowerCase() : null;

  if (isDryRun) {
    console.log('⚡ [DRY-RUN MODE ACTIVATED] — Emails will be validated but NOT sent live.');
  } else {
    console.log('🚀 [LIVE DISPATCH MODE] — Live emails will be transmitted via Gmail SMTP.');
  }

  const allowDuplicates = process.argv.includes('--allow-duplicates');

  if (allowDuplicates) {
    console.warn(
      '⚠️ [--allow-duplicates ACTIVATED] — Warning: Repeat emails to the same client are permitted.',
    );
  }

  let activeShopList = KATHMANDU_20_SHOPS;
  if (targetSlug) {
    activeShopList = activeShopList.filter(
      (s) => s.slug.toLowerCase() === targetSlug || s.id.toLowerCase() === targetSlug,
    );
    console.log(
      `🎯 [SINGLE TARGET FILTER] Targeted: "${targetSlug}" (${activeShopList.length} matching shop found)`,
    );
  } else if (isMomoOnly) {
    activeShopList = activeShopList.filter(
      (s) => s.name.toLowerCase().includes('momo') || s.slug.includes('momo'),
    );
    console.log('🥟 [MOMO-ONLY FILTER ACTIVATED] — Only genuine Momo shops will be processed.');
  }

  console.log(`Active Target Shops Count: ${activeShopList.length}`);

  const ledger = loadLedger();
  console.log(`Loaded ledger: ${ledger.length} shops already recorded.`);

  let newlySent = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < activeShopList.length; i++) {
    const shop = activeShopList[i];
    console.log(`\n----------------------------------------------------------------`);
    console.log(
      `[Shop ${i + 1}/${activeShopList.length}] Processing: ${shop.name} (${shop.category})`,
    );
    console.log(`Address: ${shop.address}`);
    console.log(`Email:   ${shop.email}`);

    // STRICT DEDUPLICATION CHECK: Never email one client multiple times
    const alreadySent = isAlreadySent(shop.email, shop.name);

    if (alreadySent && !allowDuplicates) {
      console.log(
        `⏩ [SKIPPED - Strictly Deduplicated] ${shop.name} (${shop.email}) already received an outreach proposal. Never sending to the same client multiple times.`,
      );
      skipped++;
      continue;
    }

    if (alreadySent && allowDuplicates) {
      console.warn(`⚠️ [--allow-duplicates active] Re-dispatching to ${shop.name}.`);
    }

    const previewUrl = `http://localhost:3005/preview/${shop.slug}`;

    try {
      console.log(`📨 Dispatching proposal to ${shop.email}...`);
      const result = await sendOutreachEmail({
        toEmail: shop.email,
        businessName: shop.name,
        district: shop.district,
        category: shop.category,
        previewUrl: previewUrl,
        slug: shop.slug,
        isConfidential: true,
        preventDownloads: true,
        dryRun: isDryRun,
        allowDuplicates: allowDuplicates,
      });

      if (result.success) {
        console.log(`✅ [DISPATCH SUCCESS]`);
        console.log(`   Message ID: ${result.messageId}`);
        console.log(`   Simulated:  ${Boolean(result.simulated)}`);

        // Record in ledger
        const record: SentRecord = {
          id: shop.id,
          name: shop.name,
          email: shop.email,
          category: shop.category,
          district: shop.district,
          sentAt: new Date().toISOString(),
          messageId: result.messageId || `msg_${Date.now()}`,
          status: result.simulated ? 'simulated' : 'delivered',
        };

        if (!isDryRun) {
          recordSent(record);
        }
        newlySent++;
      } else {
        console.error(`❌ [DISPATCH FAILED]: ${result.error}`);
        failed++;
      }
    } catch (err: any) {
      console.error(`❌ [DISPATCH EXCEPTION]:`, err.message);
      failed++;
    }

    // Rate-limiting delay: 3 seconds between emails
    if (i < activeShopList.length - 1 && !isDryRun) {
      console.log('⏳ Waiting 3 seconds before next shop to respect Gmail sending rate limits...');
      await sleep(3000);
    }
  }

  console.log('\n================================================================');
  console.log('DISPATCH CYCLE COMPLETED');
  console.log(`Total Target Shops: ${KATHMANDU_20_SHOPS.length}`);
  console.log(`Newly Sent:         ${newlySent}`);
  console.log(`Skipped (Dedupe):   ${skipped}`);
  console.log(`Failed:             ${failed}`);
  console.log(`Ledger total:       ${ledger.length}`);
  console.log('================================================================\n');
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
