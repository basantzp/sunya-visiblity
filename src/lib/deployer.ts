/**
 * Module 4 — Preview & Hosting Engine
 * Deploys generated sites to unique preview subdomains or dynamic Next.js App Router routes.
 * Generates live preview URLs before any outreach is dispatched.
 */

export interface DeploymentResult {
  previewUrl: string;
  subdomain: string;
  deploymentId: string;
  provider: 'vercel' | 'cloudflare' | 'local_multitenant';
}

export async function deployPreviewSite(
  slug: string,
  siteData: Record<string, any>,
): Promise<DeploymentResult> {
  const vercelToken = process.env.VERCEL_API_TOKEN;
  const vercelProjectId = process.env.VERCEL_PROJECT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005';

  const cleanSubdomain = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-');

  // If Vercel API credentials are provided, register subdomain alias
  if (vercelToken && vercelProjectId && vercelToken !== 'placeholder') {
    try {
      const aliasUrl = `https://api.vercel.com/v2/projects/${vercelProjectId}/alias`;
      const res = await fetch(aliasUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: `${cleanSubdomain}.preview.sunyavisibility.com`,
        }),
      });

      if (res.ok) {
        return {
          previewUrl: `https://${cleanSubdomain}.preview.sunyavisibility.com`,
          subdomain: cleanSubdomain,
          deploymentId: `vercel_${Date.now()}`,
          provider: 'vercel',
        };
      }
    } catch (err) {
      console.warn(
        '[Vercel Deployer Warning] Subdomain alias failed, falling back to dynamic route:',
        err,
      );
    }
  }

  // Dynamic High-Performance Route on Next.js
  const previewUrl = `${baseUrl}/preview/${cleanSubdomain}`;
  return {
    previewUrl,
    subdomain: cleanSubdomain,
    deploymentId: `local_${Date.now()}`,
    provider: 'local_multitenant',
  };
}
