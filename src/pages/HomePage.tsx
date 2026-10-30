import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { organizationSchema } from '@/components/seo/schema';
import { PageHero } from '@/components/service/PageHero';
import { ServiceCard } from '@/components/service/ServiceCard';
import { Container } from '@/components/ui/Container';
import { services } from '@/data/services';
import { FaqSection } from '@/components/sections/FaqSection';
import { FamilyOfCompaniesSection } from '@/components/sections/FamilyOfCompaniesSection';
import { faqs } from '@/data/faqs';
import { WhoWeHelpSection } from '@/components/sections/WhoWeHelpSection';
import { team } from '@/data/team';

/** How many of the first FAQs show on the home page */
const HOME_FAQ_COUNT = 4;

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
        backgroundImage={{
          src: '/images/hero/home-desk.jpg',
          alt: 'A laptop showing a financial dashboard on a desk, next to an AZN Accounting mug and a notebook listing bookkeeping, tax planning, financial reports and business growth',
        }}
        primaryAction={{ label: 'Book a free consultation', to: '/contact#inquiry' }}
        secondaryAction={{ label: 'Explore services', to: '#services' }}
        // TODO: replace placeholder numbers with real ones
        stats={[
          { value: '15+', label: 'Years of experience', icon: 'briefcase' },
          { value: '100+', label: 'Clients served', icon: 'users' },
          // { value: '[CPA / EA]', label: 'Credentials', icon: 'shield' },
        ]}
      />
      <section id="services" className="scroll-mt-20 bg-cloud">
        <Container className="py-16 md:py-20">
          <h2 data-aos="fade-right" className="text-3xl font-semibold md:text-4xl">Our services</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((s, i) => <ServiceCard key={s.slug} service={s} aosDelay={150 + i * 150} />)}
          </div>
        </Container>
      </section>

      {/* Same navy as the FAQ below, so a faint line separates the two */}
      <section className="border-b border-white/10 bg-ink text-white">
        <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
          {/* Photos in public/images/about (home-*.jpg, cropped from the client's mockup). The tall photo sets the height; the two on the right split it evenly. */}
          <div data-aos="fade-right" className="grid grid-cols-[1.15fr_1fr] grid-rows-2 gap-4">
            <img
              src="/images/about/home-whiteboard.jpg"
              alt="An accountant presenting charts on a whiteboard to colleagues"
              className="row-span-2 aspect-[3/4] h-full w-full rounded-3xl object-cover"
            />
            <img
              src="/images/about/home-consultation.jpg"
              alt="A smiling accountant reviewing documents with a client"
              className="h-full w-full rounded-3xl object-cover"
            />
            <img
              src="/images/about/home-desk-detail.jpg"
              alt="Hands working a calculator over financial reports beside an AZN Accounting mug"
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>

          <div data-aos="fade-left" data-aos-delay="150">
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
              to="/about#team"
              className="mt-8 inline-flex items-center rounded-full bg-brass-light px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              Meet the team
            </Link>
          </div>
        </Container>
      </section>

      <WhoWeHelpSection leader={team[0]} />

      {/* Navy between the light "Who we help" above and the white FAQs below */}
      <FamilyOfCompaniesSection dark />

      {/* Preview only: the full list lives on /faqs */}
      <FaqSection faqs={faqs.slice(0, HOME_FAQ_COUNT)} more={{ label: 'View all FAQs', to: '/faqs' }} />
    </>
  );
}
