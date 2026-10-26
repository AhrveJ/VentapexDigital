import { Seo } from '@/components/seo/Seo';
import { organizationSchema } from '@/components/seo/schema';
import { PageHero } from '@/components/service/PageHero';
import { ServiceCard } from '@/components/service/ServiceCard';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { services } from '@/data/services';

export default function HomePage() {
  return (
    <>
      <Seo jsonLd={[organizationSchema]} />
      <PageHero
        title="Accounting that keeps your books and your conscience clear"
        lead="Tax preparation, bookkeeping, accounting and fractional CFO services from professionals who explain every decision."
      />
      <section className="bg-[#0B1C29] text-white">
        <Container className="py-16 md:py-20">
          <h2 className="text-3xl font-semibold md:text-4xl">Our services</h2>
          <div className="mt-10 grid items-start gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
          <div className="mt-14">
            <Button to="/contact">Schedule a consultation</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
