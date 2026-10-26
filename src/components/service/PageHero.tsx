import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';

interface Crumb { name: string; to?: string }

export function PageHero({ title, lead, crumbs }: { title: string; lead: string; crumbs?: Crumb[] }) {
  return (
    <section className="ledger-lines bg-ink text-white">
      <Container className="py-16 md:py-24">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
            <ol className="flex flex-wrap gap-2">
              {crumbs.map((c, i) => (
                <li key={c.name} className="flex gap-2">
                  {c.to ? <Link className="hover:text-brass-light" to={c.to}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
                  {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{lead}</p>
      </Container>
    </section>
  );
}
