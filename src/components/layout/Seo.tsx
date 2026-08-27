import { Helmet } from 'react-helmet-async';
import { buildTitle, defaultDescription } from '@/lib/seo';
import { usePortfolio } from '@/hooks/usePortfolio';

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
};

export function Seo({ title, description, path = '/' }: SeoProps) {
  const { profile } = usePortfolio();
  const fullTitle = buildTitle(profile.name, profile.role, title);
  const desc = description ?? defaultDescription(profile.description);
  const url = `https://rushak.dev${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
