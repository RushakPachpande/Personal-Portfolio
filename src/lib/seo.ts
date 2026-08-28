export type PageMeta = {
  title: string;
  description: string;
  path?: string;
};

export function buildTitle(name: string, role: string, pageTitle?: string) {
  if (!pageTitle) return `${name} | ${role}`;
  return `${pageTitle} | ${name}`;
}

export function defaultDescription(description: string) {
  return description;
}

// Canonical URLs must match wherever the site is actually served: a custom
// domain, a user site, or a project site under /<repo>/.
export function siteOrigin() {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (typeof window === 'undefined') return base;
  return `${window.location.origin}${base}`;
}

export function absoluteUrl(path: string) {
  const suffix = path === '/' ? '' : path;
  return `${siteOrigin()}${suffix}` || '/';
}
