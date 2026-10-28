import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/service/PageHero';
import { InquiryForm } from '@/components/contact/InquiryForm';
import { directionsUrl, LocationMap } from '@/components/contact/LocationMap';
import { Container } from '@/components/ui/Container';
import { site } from '@/config/site';

function ContactRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-4">
      <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cloud text-brass">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.75]">{icon}</svg>
      </span>
      <span className="text-ink">{children}</span>
    </li>
  );
}

export default function ContactPage() {
  const [params] = useSearchParams();
  return (
    <>
      <Seo title="Contact" description="Send an inquiry about our tax, bookkeeping, accounting and advisory services." path="/contact" />
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        image={{ src: '/images/hero/contact.jpg', alt: 'A person signing a document at a desk' }}
        lead="Tell us what you need help with and we will reply within one business day."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Contact' }]}
      />

      <section className="bg-white">
        <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div data-aos="fade-up" className="lg:pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">Contact</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Let's talk about your numbers.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
              Tell us a little about your business and we'll reply within one business day.
            </p>
            <ul className="mt-8 space-y-4">
              <ContactRow icon={<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinejoin="round" />}>
                <a href={`tel:${site.phone}`} className="font-medium transition-colors hover:text-brass">{site.phone}</a>
              </ContactRow>
              <ContactRow icon={<><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" strokeLinejoin="round" /><circle cx="12" cy="9.5" r="2.5" /></>}>
                <address className="not-italic">{site.address}</address>
              </ContactRow>
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="150">
            <InquiryForm defaultService={params.get('service')} heading={null} />
          </div>
        </Container>
      </section>

      {/* Map moved out of the sidebar into its own full-width section */}
      <section className="relative bg-cloud">
        <LocationMap className="h-[420px] md:h-[480px]" />
        <Container className="pointer-events-none absolute inset-x-0 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
          <div className="pointer-events-auto max-w-sm rounded-3xl bg-ink p-7 text-white shadow-[0_30px_60px_-20px_rgba(11,28,41,0.6)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">Visit us</p>
            <h2 className="mt-3 text-2xl font-bold">Our office</h2>
            <address className="mt-3 not-italic leading-relaxed text-white/75">{site.address}</address>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brass-light px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              Get directions
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
