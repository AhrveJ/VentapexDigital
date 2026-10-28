import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/service/PageHero';
import { Container } from '@/components/ui/Container';
import { site } from '@/config/site';
import { team } from '@/data/team';
import { TeamPhoto } from '@/components/team/TeamPhoto';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description={`Meet the team behind ${site.name}: tax, bookkeeping, accounting and fractional CFO professionals.`}
        path="/about"
      />
      <PageHero
        eyebrow="About us"
        title="People who explain every number."
        image={{ src: '/images/hero/about.jpg', alt: 'Two people shaking hands in an office' }}
        lead="Tax, bookkeeping, accounting and advisory professionals who explain every decision, so you always know where your numbers stand."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'About' }]}
      />
      <Container className="py-16">
        <h2 data-aos="fade-up" className="text-3xl font-semibold">Our team</h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <article key={m.name} data-aos="fade-up" data-aos-delay={i * 120}>
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
                </div>
              </Link>
              {/* {m.phone && (
                <p className="mt-2">
                  <a className="font-semibold hover:text-brass" href={`tel:${m.phone}`}>{m.phone}</a>
                </p>
              )} */}
            </article>
          ))}
        </div>
        <div data-aos="fade-up" className="mt-14">
          {/* <Button to="/contact" className="!bg-ink !text-white hover:!bg-ink-soft">Schedule a consultation</Button> */}
        </div>
      </Container>
    </>
  );
}
