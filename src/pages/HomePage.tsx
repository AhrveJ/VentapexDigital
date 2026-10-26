import { Seo } from '@/components/seo/Seo';
import { organizationSchema } from '@/components/seo/schema';
import { PageHero } from '@/components/service/PageHero';
import { ServiceCard } from '@/components/service/ServiceCard';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { services } from '@/data/services';
import { team } from '@/data/team';

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
      <Container className="grid items-center gap-10 py-16 md:grid-cols-[240px_1fr]">
        <img
          src={team[0].photo}
          alt={`${team[0].name}, ${team[0].title}`}
          width={240}
          height={361}
          loading="lazy"
          className="w-48 rounded-2xl object-cover shadow-lg md:w-full"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">About us</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Led by {team[0].name}, {team[0].title}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            We are a team of accounting and tax professionals who explain every decision, so you always know where your numbers stand.
          </p>
          <Button to="/about" variant="outline" className="mt-6">Meet our team</Button>
        </div>
      </Container>
    </>
  );
}
