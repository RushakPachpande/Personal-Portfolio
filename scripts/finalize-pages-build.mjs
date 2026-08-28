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

// Keeps any subpath, so a project site gets https://user.github.io/repo/about
function siteRoot(siteUrl) {
  return siteUrl.href.replace(/\/+$/, '');
}

function rewriteOrigin(file, siteUrl) {
  const filePath = path.join(DIST, file);
  if (!existsSync(filePath)) return;

  const root = siteRoot(siteUrl);
  const current = readFileSync(filePath, 'utf8');
  const updated = current.replaceAll(PLACEHOLDER_ORIGIN, root);
  if (updated === current) return;

  writeFileSync(filePath, updated, 'utf8');
  console.log(`rewrote ${file} canonical URLs to ${root}`);
}

// On a project site the crawl rules live under /<repo>/, not the domain root.
function rewriteRobotsPaths(siteUrl) {
  const base = `${siteUrl.pathname.replace(/\/+$/, '')}/`;
  if (base === '/') return;

  const filePath = path.join(DIST, 'robots.txt');
  if (!existsSync(filePath)) return;

  const updated = readFileSync(filePath, 'utf8')
    .replace(/^Allow: \/$/m, `Allow: ${base}`)
    .replace(/^Disallow: \/(.*)$/m, `Disallow: ${base}$1`);

  writeFileSync(filePath, updated, 'utf8');
  console.log(`scoped robots.txt rules to ${base}`);
}

spaFallback();

const siteUrl = parseSiteUrl();
if (siteUrl) {
  writeCname(siteUrl);
  rewriteOrigin('sitemap.xml', siteUrl);
  rewriteOrigin('robots.txt', siteUrl);
  rewriteRobotsPaths(siteUrl);
} else {
  console.log(
    'PAGES_SITE_URL not set: no CNAME written, canonical URLs left as-is'
  );
}
