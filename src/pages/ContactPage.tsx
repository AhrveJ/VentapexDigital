import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/service/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { site } from '@/config/site';

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact" description="Schedule a consultation with our tax, accounting and advisory team." path="/contact" />
      <PageHero title="Contact us" lead="Tell us what you need help with and we will reply within one business day." />
      <Container className="py-16">
        <address className="space-y-2 text-lg not-italic">
          <p>{site.address}</p>
          <p><a className="underline" href={`tel:${site.phone}`}>{site.phone}</a></p>
          <p><a className="underline" href={`mailto:${site.email}`}>{site.email}</a></p>
        </address>
        <Button href={`mailto:${site.email}`} className="mt-8 !bg-ink !text-white hover:!bg-ink-soft">Email us</Button>
      </Container>
    </>
  );
}
