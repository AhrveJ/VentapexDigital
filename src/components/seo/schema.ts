import { site } from '@/config/site';
import type { Service } from '@/types/service';
import type { Faq } from '@/data/faqs';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: site.name,
  url: site.url,
  // email: site.email,
  telephone: site.phone,
  address: { '@type': 'PostalAddress', streetAddress: site.address },
};

export const serviceSchema = (s: Service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description: s.seo.description,
  url: `${site.url}/services/${s.slug}`,
  provider: { '@type': 'AccountingService', name: site.name },
  ...(s.pricing && {
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'USD',
        minPrice: s.pricing.startingAt,
        unitText: s.pricing.period.toUpperCase(),
      },
    },
  }),
});

// Lets search engines show the questions as rich results. Bullet lists are flattened into the answer text.
export const faqSchema = (faqs: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer.map((b) => (typeof b === 'string' ? b : b.join('; '))).join(' ') },
  })),
});

export const breadcrumbSchema =(items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${site.url}${item.path}`,
  })),
});
