import { useParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { breadcrumbSchema, serviceSchema } from '@/components/seo/schema';
import { PageHero } from '@/components/service/PageHero';
import { ContactCard } from '@/components/service/ContactCard';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { Container } from '@/components/ui/Container';
import { getServiceBySlug } from '@/data/services';
import NotFoundPage from './NotFoundPage';

/** One template for every service. Content comes from data/services.ts. */
export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  if (!service) return <NotFoundPage />;

  const path = `/services/${service.slug}`;

  return (
    <>
      <Seo
        title={service.seo.title}
        description={service.seo.description}
        path={path}
        jsonLd={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/' },
            { name: service.name, path },
          ]),
        ]}
      />
      <PageHero
        title={service.heroTitle}
        lead={service.heroLead}
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Services' }, { name: service.name }]}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <div className="max-w-3xl space-y-14">
          {service.sections.map((section) => (
            <SectionRenderer key={section.title} section={section} />
          ))}
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ContactCard serviceName={service.name} pricing={service.pricing} />
        </div>
      </Container>
    </>
  );
}
