import { useEffect } from 'react';
import { useOptionalPortfolio } from '@/hooks/usePortfolio';
import { publicMediaUrl } from '@/lib/supabase';

const ALLOWED_TOKEN_KEYS = new Set([
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--popover',
  '--popover-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--destructive',
  '--border',
  '--input',
  '--ring',
  '--electric-blue',
  '--soft-cyan',
  '--surface',
]);

function isSafeCssValue(value: string) {
  return (
    value.length <= 80 &&
    !/[;{}]|url\s*\(|expression|javascript:/i.test(value)
  );
}

/** Applies Studio brand tokens and favicon without a redeploy. */
export function SiteBrandApplier() {
  const portfolio = useOptionalPortfolio();
  const brand = portfolio?.siteConfig.brand;

  useEffect(() => {
    if (!brand) return;
    const root = document.documentElement;
    const applied: string[] = [];

    for (const [key, value] of Object.entries(brand.tokens ?? {})) {
      if (!ALLOWED_TOKEN_KEYS.has(key) || !isSafeCssValue(value)) continue;
      root.style.setProperty(key, value);
      applied.push(key);
    }

    let faviconLink = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][data-studio-favicon]'
    );
    if (brand.faviconPath) {
      if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.setAttribute('data-studio-favicon', 'true');
        document.head.appendChild(faviconLink);
      }
      faviconLink.href = publicMediaUrl(brand.faviconPath);
    }

    return () => {
      for (const key of applied) {
        root.style.removeProperty(key);
      }
    };
  }, [brand]);

  return null;
}
