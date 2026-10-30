import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/service/PageHero';
import { Container } from '@/components/ui/Container';
import { site } from '@/config/site';
import { team } from '@/data/team';
import { TeamPhoto } from '@/components/team/TeamPhoto';
import { FamilyOfCompaniesSection } from '@/components/sections/FamilyOfCompaniesSection';

// History: one string per paragraph, shown beside the photo.
// TODO: PLACEHOLDER. Replace the [bracketed] text with the firm's own story.
const history = [
  '[How and why the firm started: the year, who founded it and the problem they set out to solve for business owners.]',
  '[How the firm grew: key milestones such as new services, a growing team or the move to secure, cloud-based accounting.]',
  '[Where the firm is today: the clients it serves, the areas it covers and what has stayed the same since day one.]',
];

// Mission and vision: one string per paragraph. The first paragraph is shown large as the headline statement.
const mission = [
  'To empower businesses with reliable, accurate, and strategic accounting solutions backed by extensive experience in public accounting, corporate finance, audit, and taxation.',
  "Our mission is to simplify financial complexities by delivering high-quality bookkeeping, payroll, financial reporting, and accounting services tailored to each client's unique needs. We are committed to providing the same level of financial expertise, professionalism, and accountability expected of publicly traded companies while making these services accessible to small and growing businesses.",
  'Through integrity, transparency, and personalized support, we help business owners make informed financial decisions and focus on what matters most—growing their businesses.',
];
const vision = [
  'To become a trusted and leading accounting partner for businesses seeking financial clarity, operational excellence, and sustainable growth.',
  'We envision bridging the gap between traditional bookkeeping services and sophisticated corporate accounting by bringing the financial expertise and best practices of publicly traded and private equity-backed companies to businesses of all sizes.',
  'Our vision is to build lasting partnerships, empower entrepreneurs with meaningful financial insights, and establish a standard of excellence where every business, regardless of size, has access to professional, reliable, and forward-thinking accounting solutions.',
];
// Culture values. SAMPLE CONTENT: placeholder values. Replace with the firm's own.
const values = [
  { title: 'Clarity', text: 'We explain every number and every decision in plain language.' },
  { title: 'Integrity', text: 'Honest advice, transparent pricing and no surprises.' },
  { title: 'Precision', text: 'Accurate, reconciled work you can rely on at tax time and beyond.' },
  { title: 'Partnership', text: 'We treat your business like our own and grow alongside you.' },
];

// Small line icons for the mission and vision cards
const targetIcon = (
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" />
  </>
);
const eyeIcon = (
  <>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" />
  </>
);

/** Gold eyebrow + heading shared by every section. The id matches the Company menu links in site.ts. */
function SectionHeading({ eyebrow, title, dark = false, center = false, wide = false, children }: {
  eyebrow: string;
  title: ReactNode;
  dark?: boolean;
  /** Wider box for long titles that should stay on fewer lines */
  wide?: boolean;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <div data-aos="fade-down" className={`${wide ? 'max-w-5xl' : 'max-w-3xl'} ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-brass-light' : 'text-brass'}`}>{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{title}</h2>
      {children && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-ink-soft'}`}>{children}</p>}
    </div>
  );
}

/** Soft gold glow in the corner of the navy sections, matching the hero */
const glow = <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brass-light/10 blur-3xl" />;

export default function AboutPage() {
  return (
    <>
      <Seo
        title="Company"
        description={`Meet the team behind ${site.name}, and learn about our history, mission, vision and culture.`}
        path="/about"
      />
      <PageHero
        eyebrow="Our company"
        title="People who explain every number."
        image={{ src: '/images/hero/about.jpg', alt: 'Close-up of two business people shaking hands in an office' }}
        lead="Tax, bookkeeping, accounting and advisory professionals who explain every decision, so you always know where your numbers stand."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Company' }]}
      />

      {/* Sections alternate light (cloud) and navy (ink). scroll-mt clears the sticky header when a menu link jumps to a section. */}
      <section id="team" className="scroll-mt-20 bg-cloud">
        <Container className="py-16 md:py-20">
          <SectionHeading center eyebrow="Our team" title="The people behind your numbers." />
          {/* Flex instead of grid so a short last row (e.g. 4 people in rows of 3) sits centered. Widths = 2 or 3 per row minus the 2.5rem gaps. */}
          <div className="mt-12 flex flex-wrap justify-center gap-10">
            {team.map((m, i) => (
              <article
                key={m.name}
                data-aos="fade-up"
                data-aos-delay={i * 120}
                className="w-full max-w-sm sm:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-5rem)/3)]"
              >
                {/* The whole card is the link. AOS animates the <article>, so the hover scale lives on this inner card. */}
                <Link
                  to={`/team/${m.slug}`}
                  aria-label={`${m.name}, ${m.title}: view profile`}
                  className="group block rounded-3xl border border-ink/10 bg-white p-4 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-brass-light/60 hover:bg-ink hover:shadow-[0_20px_60px_-20px_rgba(242,193,78,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
                >
                  <TeamPhoto member={m} className="shadow-none" />
                  <div className="px-2 pb-2 pt-5">
                    <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-brass-light">{m.name}</h3>
                    <p className="text-brass transition-colors duration-300 group-hover:text-white/70">{m.title}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors duration-300 group-hover:text-brass-light">
                      View profile
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="history" className="relative scroll-mt-20 overflow-hidden bg-ink text-white">
        {glow}
        <Container className="relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading dark eyebrow="History" title="How we got here." />
            <div data-aos="fade-right" data-aos-delay="100" className="mt-8 space-y-5 text-lg leading-relaxed text-white/70">
              {history.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          {/* Sample stock photo in public/images/about. Replace with a photo from the firm's history. */}
          <img
            data-aos="fade-left"
            data-aos-delay="150"
            src="/images/about/client-meeting.jpg"
            alt="An accountant meeting with a client over a laptop"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl border border-white/10 object-cover"
          />
        </Container>
      </section>

      <section id="mission-vision" className="scroll-mt-20 bg-cloud">
        <Container className="py-16 md:py-20">
          <SectionHeading
            center
            wide
            eyebrow="Mission & Vision"
            // Exactly two lines on desktop; on smaller screens it wraps naturally
            title={<><span className="lg:block">Corporate-level expertise.</span> <span className="lg:block">Personalized accounting solutions.</span></>}
          >
            Professional accounting expertise for businesses at every stage of growth.
          </SectionHeading>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article data-aos="fade-right" className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white md:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brass-light/15 blur-3xl" />
              <span aria-hidden className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brass-light text-ink">
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[1.75]">{targetIcon}</svg>
              </span>
              <p className="relative mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">Our mission</p>
              <p className="relative mt-4 text-xl font-semibold leading-snug md:text-2xl">{mission[0]}</p>
              <div className="relative mt-6 space-y-4 border-t border-white/10 pt-6 leading-relaxed text-white/70">
                {mission.slice(1).map((p) => <p key={p}>{p}</p>)}
              </div>
            </article>

            <article data-aos="fade-left" data-aos-delay="150" className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-8 md:p-10">
              <span aria-hidden className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-brass-light">
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[1.75]">{eyeIcon}</svg>
              </span>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brass">Our vision</p>
              <p className="mt-4 text-xl font-semibold leading-snug text-ink md:text-2xl">{vision[0]}</p>
              <div className="mt-6 space-y-4 border-t border-ink/10 pt-6 leading-relaxed text-ink-soft">
                {vision.slice(1).map((p) => <p key={p}>{p}</p>)}
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section id="culture" className="relative scroll-mt-20 overflow-hidden bg-ink text-white">
        {glow}
        <Container className="relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading dark eyebrow="Culture" title="How we work, with each other and with you." />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => (
                <li
                  key={v.title}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-brass-light"
                >
                  <p className="text-sm font-bold text-brass-light">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* Sample stock photo in public/images/about */}
          <img
            data-aos="fade-left"
            data-aos-delay="150"
            src="/images/about/working-session.jpg"
            alt="Colleagues discussing figures at a desk"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl border border-white/10 object-cover"
          />
        </Container>
      </section>

      <FamilyOfCompaniesSection id="family" />
    </>
  );
}
