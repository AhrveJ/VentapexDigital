import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';

interface Crumb { name: string; to?: string }

export function PageHero({ title, lead, crumbs }: { title: string; lead: string; crumbs?: Crumb[] }) {
  return (
    <>
      <section className="ledger-lines bg-ink text-white">
        <Container className="py-16 md:py-24">
          <h1 data-aos="fade-up" className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
          <p data-aos="fade-up" data-aos-delay="150" className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{lead}</p>
        </Container>
      </section>
      {crumbs && (
        <nav aria-label="Breadcrumb" className="border-ink/10 bg-white text-sm text-ink-soft">
          <Container className="py-4">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.name} className="flex items-center gap-2">
                  {c.to ? (
                    <Link className="hover:text-brass" to={c.to}>{c.name}</Link>
                  ) : (
                    <span aria-current={i === crumbs.length - 1 ? 'page' : undefined}
                      className={i === crumbs.length - 1 ? 'font-semibold text-ink' : undefined}>
                      {c.name}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden className="text-ink/30">/</span>}
                </li>
              ))}
            </ol>
          </Container>
        </nav>
      )}
    </>
  );
}
