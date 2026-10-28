import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { breadcrumbSchema, serviceSchema } from '@/components/seo/schema';
import { PageHero } from '@/components/service/PageHero';
import { ContactCard } from '@/components/service/ContactCard';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { Container } from '@/components/ui/Container';
import { getServiceBySlug, services } from '@/data/services';
import NotFoundPage from './NotFoundPage';

/** One template for every service. Content comes from data/services.ts. */
export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  if (!service) return <NotFoundPage />;

  const path = `/services/${service.slug}`;
  const otherServices = services.filter((s) => s.slug !== service.slug);

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
        eyebrow="Services"
        image={{ src: `/images/hero/${service.slug}.jpg`, alt: service.heroImageAlt }}
        primaryAction={{ label: 'Get started', to: `/contact?service=${service.slug}` }}
        // secondaryAction={{ label: 'Book a free consultation', to: '/contact' }}
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Services' }, { name: service.name }]}
      />
      <div className="bg-cloud">
        <Container className="grid gap-8 py-16 md:py-20 lg:grid-cols-[1fr_340px] lg:gap-10">
          <div className="min-w-0 space-y-8">
            {service.sections.map((section) => (
              <SectionRenderer key={section.title} section={section} />
            ))}
          </div>
          <div data-aos="fade-up" data-aos-delay="150" className="lg:sticky lg:top-24 lg:self-start">
            <ContactCard serviceName={service.name} serviceSlug={service.slug} pricing={service.pricing} />
          </div>
        </Container>
      </div>

      {/* Other services: keeps visitors moving through the site */}
      <section className="bg-white">
        <Container className="py-16 md:py-20">
          <p data-aos="fade-up" className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">Explore more</p>
          <h2 data-aos="fade-up" className="mt-3 text-3xl font-bold md:text-4xl">Other services</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s, i) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="group flex flex-col rounded-3xl border border-ink/10 bg-cloud p-7 transition-colors duration-300 hover:border-transparent hover:bg-ink hover:text-white"
              >
                <h3 className="text-xl font-bold transition-colors group-hover:text-brass-light">{s.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft transition-colors group-hover:text-white/70">{s.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  Learn more
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-ink text-white">
        <div aria-hidden className="pointer-events-none absolute -left-32 -bottom-40 h-[28rem] w-[28rem] rounded-full bg-brass-light/10 blur-3xl" />
        <Container className="relative flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div data-aos="fade-up">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to get your numbers in order?</h2>
            <p className="mt-3 max-w-xl text-lg text-white/70">Book a free consultation and we'll walk you through how {service.name.toLowerCase()} works with us.</p>
          </div>
          <Link
            data-aos="fade-up"
            data-aos-delay="150"
            to={`/contact?service=${service.slug}`}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brass-light px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-white"
          >
            Book a free consultation
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Container>
      </section>
    </>
  );
}
