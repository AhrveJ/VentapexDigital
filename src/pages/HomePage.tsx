import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { organizationSchema } from '@/components/seo/schema';
import { PageHero } from '@/components/service/PageHero';
import { ServiceCard } from '@/components/service/ServiceCard';
import { Container } from '@/components/ui/Container';
import { services } from '@/data/services';
import { FaqSection } from '@/components/sections/FaqSection';
import { faqs } from '@/data/faqs';
import { WhoWeHelpSection } from '@/components/sections/WhoWeHelpSection';
import { team } from '@/data/team';

const aboutPoints = [
  { title: 'A dedicated accountant', text: 'one point of contact who knows your business.' },
  { title: 'Flat, transparent pricing', text: 'no surprise invoices.' },
  { title: 'Secure & cloud-based', text: 'share documents safely from anywhere.' },
];

export default function HomePage() {
  return (
    <>
      <Seo jsonLd={[organizationSchema]} />
      <PageHero
        eyebrow="Accounting · Tax · Bookkeeping"
        title="Clear books. Confident decisions."
        lead="We handle your bookkeeping, tax and financial reporting so you always know where your business stands, and what to do next."
        image={{ src: '/images/hero/home.jpg', alt: 'Two colleagues celebrating over a laptop and financial reports' }}
        badge={{ title: 'Books closed on time', text: 'Clear monthly reports' }}
        primaryAction={{ label: 'Book a free consultation', to: '/contact' }}
        secondaryAction={{ label: 'Explore services', to: '#services' }}
        // TODO: replace placeholder numbers with real ones
        stats={[
          { value: '[XX]+', label: 'Years of experience' },
          { value: '[XXX]+', label: 'Clients served' },
          { value: '[CPA / EA]', label: 'Credentials' },
        ]}
      />
      <section id="services" className="scroll-mt-20 bg-cloud">
        <Container className="py-16 md:py-20">
          <h2 data-aos="fade-up" className="text-3xl font-semibold md:text-4xl">Our services</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((s, i) => <ServiceCard key={s.slug} service={s} aosDelay={i * 100} />)}
          </div>
        </Container>
      </section>

      {/* Same navy as the FAQ below, so a faint line separates the two */}
      <section className="border-b border-white/10 bg-ink text-white">
        <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
          {/* Sample stock photos in public/images/about. The tall photo sets the height; the two on the right split it evenly. */}
          <div data-aos="fade-up" className="grid grid-cols-[1.15fr_1fr] grid-rows-2 gap-4">
            <img
              src="/images/about/team-at-work.jpg"
              alt="Team members planning together at a whiteboard"
              className="row-span-2 aspect-[3/4] h-full w-full rounded-3xl object-cover"
            />
            <img
              src="/images/about/client-meeting.jpg"
              alt="An accountant meeting with a client over a laptop"
              className="h-full w-full rounded-3xl object-cover"
            />
            <img
              src="/images/about/working-session.jpg"
              alt="Colleagues discussing figures at a desk"
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="150">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">About AZN Accounting</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              A modern firm with old-fashioned attention to detail.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-white/70">
              We are a team of accounting and tax professionals who explain every decision, so you always know where your numbers stand.
            </p>
            <ul className="mt-6 space-y-3">
              {aboutPoints.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <svg aria-hidden viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 fill-none stroke-brass-light stroke-[2.5]">
                    <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-white/70">
                    <strong className="font-semibold text-white">{p.title}</strong> — {p.text}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center rounded-full bg-brass-light px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              Meet the team
            </Link>
          </div>
        </Container>
      </section>

      <WhoWeHelpSection leader={team[0]} />

      <FaqSection faqs={faqs} />
    </>
  );
}
