import { copyFileSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const PLACEHOLDER_ORIGIN = 'https://rushak.dev';

function spaFallback() {
  copyFileSync(path.join(DIST, 'index.html'), path.join(DIST, '404.html'));
}

function parseSiteUrl() {
  const raw = process.env.PAGES_SITE_URL?.trim();
  if (!raw) return undefined;

  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    return new URL(withScheme);
  } catch {
    throw new Error(
      `PAGES_SITE_URL is not a valid URL: "${raw}". Use a full origin such as https://example.com`
    );
  }
}

// GitHub Pages reads a CNAME file from the published artifact and applies it as
// the repository's custom domain, so it must only exist for real custom domains.
function writeCname(siteUrl) {
  if (siteUrl.hostname.endsWith('.github.io')) return;
  writeFileSync(path.join(DIST, 'CNAME'), `${siteUrl.hostname}\n`, 'utf8');
  console.log(`custom domain: wrote dist/CNAME (${siteUrl.hostname})`);
}

function rewriteOrigin(file, siteUrl) {
  const filePath = path.join(DIST, file);
  if (!existsSync(filePath)) return;

  const origin = siteUrl.origin;
  const current = readFileSync(filePath, 'utf8');
  const updated = current.replaceAll(PLACEHOLDER_ORIGIN, origin);
  if (updated === current) return;

  writeFileSync(filePath, updated, 'utf8');
  console.log(`rewrote ${file} origin to ${origin}`);
}

spaFallback();

const siteUrl = parseSiteUrl();
if (siteUrl) {
  writeCname(siteUrl);
  rewriteOrigin('sitemap.xml', siteUrl);
  rewriteOrigin('robots.txt', siteUrl);
} else {
  console.log(
    'PAGES_SITE_URL not set: no CNAME written, canonical URLs left as-is'
  );
}
