import { Helmet } from 'react-helmet-async';
import { site } from '@/config/site';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  /** schema.org objects rendered as JSON-LD */
  jsonLd?: Record<string, unknown>[];
}

export function Seo({ title, description = site.description, path = '/', jsonLd = [] }: SeoProps) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Accounting, Tax and Bookkeeping`;
  const url = `${site.url}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(data)}</script>
      ))}
    </Helmet>
  );
}
