import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/service/PageHero';
import { InquiryForm } from '@/components/contact/InquiryForm';
import { Container } from '@/components/ui/Container';
import { site } from '@/config/site';

export default function ContactPage() {
  const [params] = useSearchParams();
  return (
    <>
      <Seo title="Contact" description="Send an inquiry about our tax, bookkeeping, accounting and advisory services." path="/contact" />
      <PageHero
        title="Contact us"
        lead="Tell us what you need help with and we will reply within one business day."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Contact' }]}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <div data-aos="fade-up">
          <InquiryForm defaultService={params.get('service')} />
        </div>
        <aside data-aos="fade-up" data-aos-delay="150" className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-xl font-semibold">Prefer to reach us directly?</h2>
          <address className="mt-4 space-y-2 not-italic text-ink-soft">
            <p>{site.address}</p>
            <p><a className="font-semibold text-ink hover:text-brass" href={`tel:${site.phone}`}>{site.phone}</a></p>
            {/* <p><a className="font-semibold text-ink hover:text-brass" href={`mailto:${site.email}`}>{site.email}</a></p> */}
          </address>
        </aside>
      </Container>
    </>
  );
}
