import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';

interface Crumb { name: string; to?: string }
/** `to` is an internal route; anything starting with # scrolls to that id on the page */
interface HeroAction { label: string; to: string }
interface HeroStat { value: string; label: string }

interface PageHeroProps {
  title: string;
  lead: string;
  crumbs?: Crumb[];
  /** Small gold label above the title, e.g. "Accounting · Tax · Bookkeeping" */
  eyebrow?: string;
  /** Portrait photo on the right (4:5, min 1200×1500px). Without it the hero is a single column. */
  image?: { src: string; alt: string };
  /** Small white card overlapping the photo's bottom-left corner */
  badge?: { title: string; text: string };
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  stats?: HeroStat[];
}

function ActionLink({ action, className, arrow = false }: { action: HeroAction; className: string; arrow?: boolean }) {
  const content = (
    <>
      {action.label}
      {arrow && <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>}
    </>
  );
  return action.to.startsWith('#')
    ? <a href={action.to} className={className}>{content}</a>
    : <Link to={action.to} className={className}>{content}</Link>;
}

export function PageHero({ title, lead, crumbs, eyebrow, image, badge, primaryAction, secondaryAction, stats }: PageHeroProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        {/* Soft gold glow behind the photo */}
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brass-light/10 blur-3xl" />
        <Container
          className={`relative grid items-center gap-12 py-16 md:py-24 ${image ? 'lg:grid-cols-[1.1fr_1fr] lg:gap-16' : ''}`}
        >
          <div>
            {eyebrow && (
              <p data-aos="fade-up" className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
                <span aria-hidden className="h-px w-8 bg-brass-light" />
                {eyebrow}
              </p>
            )}
            <h1 data-aos="fade-up" className="mt-5 max-w-3xl text-5xl font-bold leading-[1.05] md:text-6xl">{title}</h1>
            <p data-aos="fade-up" data-aos-delay="100" className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{lead}</p>

            {(primaryAction || secondaryAction) && (
              <div data-aos="fade-up" data-aos-delay="200" className="mt-9 flex flex-wrap gap-3">
                {primaryAction && (
                  <ActionLink
                    action={primaryAction}
                    arrow
                    className="group inline-flex items-center gap-2 rounded-full bg-brass-light px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
                  />
                )}
                {secondaryAction && (
                  <ActionLink
                    action={secondaryAction}
                    className="inline-flex items-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-brass-light hover:text-brass-light"
                  />
                )}
              </div>
            )}

            {stats && (
              <dl data-aos="fade-up" data-aos-delay="300" className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-3xl font-semibold">{s.value}</dd>
                    <dd className="mt-1 text-sm text-white/60">{s.label}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {image && (
            <div data-aos="fade-up" data-aos-delay="150" className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </div>
              {badge && (
                <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] sm:-left-8">
                  <span aria-hidden className="grid h-9 w-9 place-items-center rounded-lg bg-mist">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-brass stroke-[2.5]">
                      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{badge.title}</span>
                    <span className="block text-xs text-ink-soft">{badge.text}</span>
                  </span>
                </div>
              )}
            </div>
          )}
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
