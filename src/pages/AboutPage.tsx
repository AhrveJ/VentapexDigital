import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/service/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { site } from '@/config/site';
import { team } from '@/data/team';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description={`Meet the team behind ${site.name}: tax, bookkeeping, accounting and fractional CFO professionals.`}
        path="/about"
      />
      <PageHero
        title="About us"
        lead="Tax, bookkeeping, accounting and advisory professionals who explain every decision, so you always know where your numbers stand."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'About' }]}
      />
      <Container className="py-16">
        <h2 className="text-3xl font-semibold">Our team</h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <article key={m.name}>
              <img
                src={m.photo}
                alt={`${m.name}, ${m.title}`}
                width={800}
                height={1000}
                className="aspect-[4/5] w-full rounded-2xl object-cover object-top shadow-lg"
              />
              <h3 className="mt-5 text-2xl font-semibold">{m.name}</h3>
              <p className="text-brass">{m.title}</p>
              {m.phone && (
                <p className="mt-2">
                  <a className="font-semibold hover:text-brass" href={`tel:${m.phone}`}>{m.phone}</a>
                </p>
              )}
            </article>
          ))}
        </div>
        <div className="mt-14">
          <Button to="/contact" className="!bg-ink !text-white hover:!bg-ink-soft">Schedule a consultation</Button>
        </div>
      </Container>
    </>
  );
}
