import { NextRequest, NextResponse } from 'next/server';
import { generateColdEmailCopy } from '@/lib/mailer';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const business =
    searchParams.get('business') || searchParams.get('name') || 'Sandar Momo (Sankhamul)';
  const category = searchParams.get('category') || 'restaurant';
  const slug = searchParams.get('slug') || 'sandar-momo-sankhamul';
  const district = searchParams.get('district') || 'Kathmandu';
  const isConfidential = searchParams.get('confidential') !== 'false';

  const baseUrl = req.nextUrl.origin;

  const emailData = generateColdEmailCopy({
    toEmail: 'owner@example.com',
    businessName: business,
    district,
    category,
    previewUrl: `${baseUrl}/preview/${slug}`,
    slug,
    isConfidential,
  });

  // Replace cid: references with relative web paths for localhost browser display
  let webHtml = emailData.html
    .replace(/src="cid:brandlogo"/g, 'src="/sunya-logo-horizontal-white.png"')
    .replace(/src="cid:redditproof"/g, 'src="/social-proof-reddit-sandar.png"')
    .replace(/src="cid:xproof"/g, 'src="/social-proof-x-sandar.png"')
    .replace(/src="cid:fbproof"/g, 'src="/social-proof-fb-sandar.png"');

  // Inject Butter-Smooth Liquid Momentum Wheel & Anchor Glide Engine for web viewing
  const smoothScrollEnhancement = `
    <!-- Top Reading Progress Indicator -->
    <div id="sunya-scroll-progress" style="position: fixed; top: 0; left: 0; height: 2.5px; width: 0%; background: linear-gradient(90deg, #38bdf8, #f59e0b, #10b981); z-index: 99999; transition: width 0.05s ease; box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);"></div>

    <!-- Floating Back-to-Top Pill -->
    <div id="sunya-floating-top" style="position: fixed; bottom: 18px; right: 18px; z-index: 99998; opacity: 0; transform: translateY(12px); transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none;">
      <a href="#top" style="display: inline-flex; align-items: center; gap: 5px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid #334155; color: #f1f5f9; font-size: 11px; font-weight: 800; padding: 6px 12px; border-radius: 999px; text-decoration: none; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.7), 0 0 1px 1px rgba(255,255,255,0.1);">
        <span>▲</span> <span>Top</span>
      </a>
    </div>

    <!-- Butter-Smooth Physics Momentum Wheel Engine -->
    <script>
      (function() {
        if (typeof window === 'undefined') return;

        var targetY = window.scrollY || window.pageYOffset || 0;
        var currentY = targetY;
        var isRunning = false;
        var ease = 0.11; // Fluid deceleration factor
        var rafId = null;

        var progressBar = document.getElementById('sunya-scroll-progress');
        var floatingTop = document.getElementById('sunya-floating-top');

        function getMaxScroll() {
          return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        }

        function updateIndicators() {
          var max = getMaxScroll();
          var scrolled = window.scrollY || window.pageYOffset || 0;
          if (progressBar) {
            var pct = max > 0 ? (scrolled / max) * 100 : 0;
            progressBar.style.width = pct + '%';
          }
          if (floatingTop) {
            if (scrolled > 220) {
              floatingTop.style.opacity = '1';
              floatingTop.style.transform = 'translateY(0)';
              floatingTop.style.pointerEvents = 'auto';
            } else {
              floatingTop.style.opacity = '0';
              floatingTop.style.transform = 'translateY(12px)';
              floatingTop.style.pointerEvents = 'none';
            }
          }
        }

        function step() {
          var diff = targetY - currentY;
          if (Math.abs(diff) < 0.4) {
            currentY = targetY;
            window.scrollTo(0, currentY);
            isRunning = false;
            updateIndicators();
            return;
          }
          currentY += diff * ease;
          window.scrollTo(0, currentY);
          updateIndicators();
          rafId = requestAnimationFrame(step);
        }

        // Intercept mouse wheel events for fluid inertia
        window.addEventListener('wheel', function(e) {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

          var delta = e.deltaY;
          if (e.deltaMode === 1) delta *= 34; // line mode
          else if (e.deltaMode === 2) delta *= window.innerHeight;

          // Let delicate touchpad ticks pass natively
          if (Math.abs(delta) < 6) return;

          var max = getMaxScroll();
          targetY = Math.max(0, Math.min(max, targetY + delta));

          if (!isRunning) {
            isRunning = true;
            currentY = window.scrollY || window.pageYOffset || 0;
            rafId = requestAnimationFrame(step);
          }
          e.preventDefault();
        }, { passive: false });

        // Synchronize on native scroll / manual scrollbar dragging
        window.addEventListener('scroll', function() {
          updateIndicators();
          if (!isRunning) {
            targetY = window.scrollY || window.pageYOffset || 0;
            currentY = targetY;
          }
        }, { passive: true });

        // Butter-smooth anchor navigation
        document.addEventListener('click', function(e) {
          var link = e.target.closest('a[href^="#"]');
          if (!link) return;
          var href = link.getAttribute('href');
          if (href === '#' || href === '#top') {
            e.preventDefault();
            targetY = 0;
            if (!isRunning) {
              isRunning = true;
              currentY = window.scrollY || window.pageYOffset || 0;
              rafId = requestAnimationFrame(step);
            }
            return;
          }
          try {
            var target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              var rect = target.getBoundingClientRect();
              var top = rect.top + (window.scrollY || window.pageYOffset) - 20;
              targetY = Math.max(0, Math.min(getMaxScroll(), top));
              if (!isRunning) {
                isRunning = true;
                currentY = window.scrollY || window.pageYOffset || 0;
                rafId = requestAnimationFrame(step);
              }
            }
          } catch (err) {}
        });

        updateIndicators();
      })();
    </script>
  `;

  if (webHtml.includes('</body>')) {
    webHtml = webHtml.replace('</body>', `${smoothScrollEnhancement}</body>`);
  } else {
    webHtml += smoothScrollEnhancement;
  }

  return new NextResponse(webHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
