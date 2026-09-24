import { Helmet } from 'react-helmet-async';
import { absoluteUrl, buildTitle, defaultDescription } from '@/lib/seo';
import { publicMediaUrl } from '@/lib/supabase';
import { usePortfolio } from '@/hooks/usePortfolio';
import { usePreviewMode } from '@/hooks/usePreviewMode';

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
};

export function Seo({ title, description, path = '/' }: SeoProps) {
  const isPreview = usePreviewMode();
  const { profile, siteConfig } = usePortfolio();
  if (isPreview) return null;
  const fullTitle = buildTitle(profile.name, profile.role, title);
  const desc =
    description ??
    siteConfig.seo.defaultDescription ??
    defaultDescription(profile.description);
  const url = absoluteUrl(path);
  const ogImage = siteConfig.seo.ogImagePath
    ? publicMediaUrl(siteConfig.seo.ogImagePath)
    : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
