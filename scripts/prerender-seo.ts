import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  SEO_CONFIG,
  SITE_URL,
  buildStructuredData,
  canonicalUrl,
  type SeoConfig,
} from '../src/seo';

const distDir = path.resolve(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function replaceMeta(html: string, selector: RegExp, replacement: string) {
  return selector.test(html) ? html.replace(selector, replacement) : html;
}

function renderRouteHtml(template: string, route: string, seo: SeoConfig) {
  const canonical = canonicalUrl(route);
  const schema = JSON.stringify(buildStructuredData(route)).replace(/</g, '\\u003c');

  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`);

  html = replaceMeta(
    html,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name=["']robots["'][^>]*>/i,
    `<meta name="robots" content="${escapeHtml(seo.robots || 'index,follow')}" />`,
  );
  html = replaceMeta(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
  );

  html = html.replace(
    '</head>',
    `<script id="recovero-structured-data" type="application/ld+json">${schema}</script>\n  </head>`,
  );

  return html;
}

function render404Html(template: string) {
  const title = 'Page Not Found | Recovero247';
  const description =
    'The page you requested could not be found. Return to Recovero247 for vehicle recovery and transport services.';

  let html = template.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
  html = replaceMeta(
    html,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${description}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name=["']robots["'][^>]*>/i,
    '<meta name="robots" content="noindex,follow" />',
  );
  html = replaceMeta(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${SITE_URL}/" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${title}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${description}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${SITE_URL}/" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${title}" />`,
  );
  html = replaceMeta(
    html,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${description}" />`,
  );

  return html;
}

async function main() {
  const template = await readFile(indexPath, 'utf8');

  for (const [route, seo] of Object.entries(SEO_CONFIG)) {
    const rendered = renderRouteHtml(template, route, seo);

    if (route === '/') {
      await writeFile(indexPath, rendered, 'utf8');
      continue;
    }

    const routeDir = path.join(distDir, route.replace(/^\//, ''));
    await mkdir(routeDir, { recursive: true });
    await writeFile(path.join(routeDir, 'index.html'), rendered, 'utf8');
  }

  await writeFile(path.join(distDir, '404.html'), render404Html(template), 'utf8');

  console.log(
    `Pre-rendered SEO metadata for ${Object.keys(SEO_CONFIG).length} routes plus 404.html`,
  );
}

main().catch((error) => {
  console.error('SEO pre-render failed:', error);
  process.exit(1);
});
