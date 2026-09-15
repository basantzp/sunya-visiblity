import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { NextRequest, NextResponse } from 'next/server';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      slug = 'shankhamul-health-club-fitness-centre',
      businessName = 'Shankhamul Health Club & Fitness Centre',
      category = 'gym',
      district = 'Kathmandu',
      phone = '+977-9867333080',
      rating = 4.6,
      reviewsCount = 148,
    } = body;

    const exportDir = path.join(process.cwd(), 'public', 'exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const htmlFileName = `${slug}-pdf-template.html`;
    const tempHtmlPath = path.join(exportDir, htmlFileName);
    const pdfFileName = `${slug}-proposal.pdf`;
    const targetPdfPath = path.join(exportDir, pdfFileName);

    const isGym =
      category.toLowerCase().includes('gym') || businessName.toLowerCase().includes('fitness');

    // Clean phone number
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const nepPhone = cleanPhone.startsWith('977')
      ? cleanPhone
      : cleanPhone.length === 10
        ? `977${cleanPhone}`
        : '9779867333080';

    // Logo base64 or absolute path
    const logoPath = path.join(process.cwd(), 'public', 'sunya-user-logo.png');
    let logoSrc = '/sunya-user-logo.png';
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }

    // Build dedicated executive PDF HTML template
    const pdfHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${businessName} — Digital Presence Proposal</title>
  <style>
    @page {
      size: 595pt 842pt; /* A4 standard portrait */
      margin: 20pt 24pt 20pt 24pt;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      background-color: #0b0f19;
      color: #f1f5f9;
      padding: 16pt;
      -webkit-font-smoothing: antialiased;
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12pt;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      margin-bottom: 14pt;
    }
    .brand-logo-group {
      display: flex;
      align-items: center;
      gap: 8pt;
    }
    .brand-logo {
      width: 28pt;
      height: 28pt;
      border-radius: 8pt;
      background: #ffffff;
      padding: 2pt;
      object-fit: contain;
    }
    .brand-title {
      font-size: 13pt;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: #ffffff;
    }
    .brand-tag {
      font-size: 8pt;
      color: #38bdf8;
      font-weight: 600;
    }
    .confidential-badge {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
      font-size: 7.5pt;
      font-weight: 800;
      padding: 3pt 8pt;
      border-radius: 999pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .hero-card {
      background: linear-gradient(135deg, #111827 0%, #1e293b 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14pt;
      padding: 16pt;
      margin-bottom: 12pt;
      box-shadow: 0 10pt 25pt -5pt rgba(0, 0, 0, 0.5);
    }
    .cat-badge {
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 2.5pt 8pt;
      border-radius: 999pt;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
      margin-bottom: 6pt;
    }
    .business-name {
      font-size: 19pt;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: #ffffff;
      margin-bottom: 4pt;
      line-height: 1.2;
    }
    .business-subtitle {
      font-size: 9.5pt;
      color: #94a3b8;
      line-height: 1.4;
    }
    .stats-row {
      display: flex;
      gap: 10pt;
      margin-top: 10pt;
    }
    .stat-pill {
      flex: 1;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 8pt;
      padding: 8pt;
      text-align: center;
    }
    .stat-val {
      font-size: 13pt;
      font-weight: 900;
      color: #f59e0b;
    }
    .stat-lbl {
      font-size: 7pt;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: 1pt;
    }
    .section-heading {
      font-size: 9.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #38bdf8;
      margin-bottom: 8pt;
      display: flex;
      align-items: center;
      gap: 4pt;
    }
    .grid-2 {
      display: flex;
      gap: 10pt;
      margin-bottom: 12pt;
    }
    .card-box {
      flex: 1;
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10pt;
      padding: 12pt;
    }
    .tier-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6pt 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .tier-item:last-child {
      border-bottom: none;
    }
    .tier-name {
      font-size: 9pt;
      font-weight: 700;
      color: #ffffff;
    }
    .tier-desc {
      font-size: 7.5pt;
      color: #94a3b8;
    }
    .tier-price {
      font-size: 10pt;
      font-weight: 900;
      color: #10b981;
    }
    .feature-list {
      list-style: none;
    }
    .feature-list li {
      font-size: 8.5pt;
      color: #cbd5e1;
      margin-bottom: 5pt;
      display: flex;
      align-items: center;
      gap: 5pt;
      line-height: 1.3;
    }
    .pricing-banner {
      background: linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%);
      border: 1px solid rgba(59, 130, 246, 0.35);
      border-radius: 12pt;
      padding: 12pt 16pt;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12pt;
    }
    .pricing-tag {
      font-size: 7.5pt;
      font-weight: 800;
      text-transform: uppercase;
      color: #60a5fa;
    }
    .pricing-title {
      font-size: 12pt;
      font-weight: 900;
      color: #ffffff;
      margin-top: 1pt;
    }
    .pricing-nums {
      text-align: right;
    }
    .pricing-main {
      font-size: 14pt;
      font-weight: 900;
      color: #34d399;
    }
    .pricing-sub {
      font-size: 7.5pt;
      color: #94a3b8;
    }
    .footer-cta {
      background: #022c22;
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 12pt;
      padding: 10pt 16pt;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
    }
    .footer-cta-title {
      font-size: 9.5pt;
      font-weight: 800;
      color: #34d399;
    }
    .footer-cta-desc {
      font-size: 8pt;
      color: #a7f3d0;
      margin-top: 2pt;
    }
    .wa-button {
      background: #25d366;
      color: #022c22;
      font-size: 9pt;
      font-weight: 900;
      padding: 8pt 14pt;
      border-radius: 8pt;
      text-decoration: none;
      display: inline-block;
      white-space: nowrap;
    }
  </style>
</head>
<body>

  <!-- Top Header -->
  <div class="header-bar">
    <div class="brand-logo-group">
      <img src="${logoSrc}" alt="Sunya" class="brand-logo" />
      <div>
        <div class="brand-title">Sunya <span style="font-size: 10pt; color: #38bdf8;">शून्य</span></div>
        <div class="brand-tag">Kathmandu Valley Web Presence Agency</div>
      </div>
    </div>
    <div class="confidential-badge">Private Proposal</div>
  </div>

  <!-- Hero Business Card -->
  <div class="hero-card">
    <span class="cat-badge">${category} · ${district}</span>
    <h1 class="business-name">${businessName}</h1>
    <p class="business-subtitle">
      Prepared exclusively for the management of ${businessName}. Autonomous digital web presence & 1-tap WhatsApp consultation system.
    </p>

    <div class="stats-row">
      <div class="stat-pill">
        <div class="stat-val">★ ${rating}</div>
        <div class="stat-lbl">Google Map Rating</div>
      </div>
      <div class="stat-pill">
        <div class="stat-val">${reviewsCount}+</div>
        <div class="stat-lbl">Verified Kathmandu Reviews</div>
      </div>
      <div class="stat-pill">
        <div class="stat-val">100%</div>
        <div class="stat-lbl">Mobile Optimized</div>
      </div>
    </div>
  </div>

  <!-- Middle Grid: Packages & Features -->
  <div class="grid-2">
    <!-- Box 1: Membership/Offerings -->
    <div class="card-box">
      <div class="section-heading">⚡ ${isGym ? 'Membership Showcase' : 'Core Offerings'}</div>
      ${
        isGym
          ? `
      <div class="tier-item">
        <div>
          <div class="tier-name">Monthly Floor Access</div>
          <div class="tier-desc">5:30 AM – 8:30 PM shift timings</div>
        </div>
        <div class="tier-price">NPR 2,500</div>
      </div>
      <div class="tier-item">
        <div>
          <div class="tier-name">Quarterly Pass (3 Mo)</div>
          <div class="tier-desc">Locker, steam & equipment access</div>
        </div>
        <div class="tier-price">NPR 6,500</div>
      </div>
      <div class="tier-item">
        <div>
          <div class="tier-name">Personal Coach 1-on-1</div>
          <div class="tier-desc">12 structured guided sessions</div>
        </div>
        <div class="tier-price">NPR 6,000</div>
      </div>
      `
          : `
      <div class="tier-item">
        <div>
          <div class="tier-name">Signature Specialty</div>
          <div class="tier-desc">Freshly prepared daily with quality</div>
        </div>
        <div class="tier-price">Featured</div>
      </div>
      `
      }
    </div>

    <!-- Box 2: System Capabilities -->
    <div class="card-box">
      <div class="section-heading">🚀 Included Features</div>
      <ul class="feature-list">
        <li>✅ <strong>1-Tap WhatsApp Button:</strong> Patrons book memberships directly to your phone.</li>
        <li>✅ <strong>Google Local SEO:</strong> Ranks your business when patrons search in Kathmandu.</li>
        <li>✅ <strong>Shift Timings & Location:</strong> Morning & evening hours displayed clearly.</li>
        <li>✅ <strong>Nepali & English Views:</strong> Bilingual presentation for all patrons.</li>
        <li>✅ <strong>Zero Complex Apps:</strong> Opens instantly in mobile browser with no downloads.</li>
      </ul>
    </div>
  </div>

  <!-- Pricing Banner -->
  <div class="pricing-banner">
    <div>
      <div class="pricing-tag">Transparent All-Inclusive Pricing</div>
      <div class="pricing-title">One-Time Setup & Cloud Hosting</div>
      <div style="font-size: 8pt; color: #94a3b8; margin-top: 2pt;">Accepted: eSewa · Khalti · FonePay · Bank Transfer</div>
    </div>
    <div class="pricing-nums">
      <div class="pricing-main">NPR 9,999</div>
      <div class="pricing-sub">+ NPR 1,500/month managed cloud</div>
    </div>
  </div>

  <!-- Bottom WhatsApp Action -->
  <div class="footer-cta">
    <div>
      <div class="footer-cta-title">Ready to activate your custom domain?</div>
      <div class="footer-cta-desc">
        Connect your domain (e.g. ${slug}.com.np) today. Simply reply on WhatsApp to start.
      </div>
    </div>
    <a href="https://wa.me/${nepPhone}?text=${encodeURIComponent(
      `Namaste Sunya! We reviewed our proposal PDF for ${businessName} and would like to connect our domain.`,
    )}" class="wa-button">
      <span>💬 Reply on WhatsApp</span>
    </a>
  </div>

  <!-- Verification Seal Footer with Company Logo -->
  <div style="margin-top: 12pt; padding-top: 8pt; border-top: 1px solid rgba(255,255,255,0.12); display: flex; justify-content: space-between; align-items: center; font-size: 8pt; color: #94a3b8;">
    <div style="display: flex; align-items: center; gap: 6pt;">
      <img src="${logoSrc}" alt="Sunya Logo" style="width: 16pt; height: 16pt; border-radius: 4pt; background: #ffffff; padding: 1.5pt; object-fit: contain;" />
      <span style="font-weight: 700; color: #e2e8f0;">Sunya (शून्य) Digital Presence Architecture · Kathmandu</span>
    </div>
    <span style="font-family: monospace; color: #64748b;">Verified Proposal Engine · 100% Zero-API-Fees</span>
  </div>

</body>
</html>`;

    fs.writeFileSync(tempHtmlPath, pdfHtml, 'utf-8');

    // Run Brave Headless to print to PDF
    const cmd = `brave --headless=new --print-to-pdf="${targetPdfPath}" --no-pdf-header-footer "${tempHtmlPath}"`;
    await execAsync(cmd);

    const stats = fs.statSync(targetPdfPath);
    const sizeKb = Math.round(stats.size / 1024);

    return NextResponse.json({
      success: true,
      fileName: pdfFileName,
      sizeKb,
      downloadUrl: `/exports/${pdfFileName}`,
      publicUrl: `${req.nextUrl.origin}/exports/${pdfFileName}`,
    });
  } catch (err: any) {
    console.error('[Export PDF Error]:', err);
    return NextResponse.json({ error: err.message || 'Failed to export PDF' }, { status: 500 });
  }
}
