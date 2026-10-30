import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';

interface Crumb { name: string; to?: string }
/** `to` is an internal route; anything starting with # scrolls to that id on the page */
interface HeroAction { label: string; to: string }
type StatIcon = 'briefcase' | 'users' | 'shield';
interface HeroStat { value: string; label: string; icon?: StatIcon }

// Line icons for the stats row
const statIcons: Record<StatIcon, ReactNode> = {
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M3 12h18" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0113 0M16 4.6a3.5 3.5 0 010 6.8M18 14a6.5 6.5 0 013.5 6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" strokeLinejoin="round" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
};

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
  /**
   * Full-bleed landscape photo (3:2, min 1536×1024px) covering the right side and fading into navy behind the text.
   * Use instead of `image`.
   */
  backgroundImage?: { src: string; alt: string };
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

/**
 * Counts from 1 up to the number in `value` once it scrolls into view, keeping any prefix/suffix (e.g. "50+").
 * Holds the final number for `pause` ms, then counts again, forever.
 */
function CountUp({ value, duration = 1600, pause = 2000 }: { value: string; duration?: number; pause?: number }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!match || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target);
      return;
    }

    let frame = 0;
    let timeout = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setCurrent(Math.max(1, Math.round(1 + (target - 1) * eased)));
        if (t < 1) frame = requestAnimationFrame(tick);
        else timeout = window.setTimeout(run, pause);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      run();
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [target, duration, pause]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <>{value}</>;
  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">{match[1]}{current}{match[3]}</span>
      <span className="sr-only">{value}</span>
    </>
  );
}

export function PageHero({ title, lead, crumbs, eyebrow, image, badge, backgroundImage, primaryAction, secondaryAction, stats }: PageHeroProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        {backgroundImage ? (
          <>
            {/* Photo fills the right ~60% on desktop and sits behind everything on smaller screens */}
            <img
              data-aos="fade"
              src={backgroundImage.src}
              alt={backgroundImage.alt}
              className="absolute inset-0 h-full w-full object-cover lg:left-auto lg:w-[75%]"
            />
            {/* Navy fade: solid behind the text, clearing towards the right edge (heavier on small screens) */}
            <div aria-hidden className="absolute inset-0 bg-ink/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-ink lg:from-[40%] lg:via-ink/70 lg:via-[55%] lg:to-transparent lg:to-[85%]" />
            {/* Darkens the bottom so the stats row stays readable over the photo */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
          </>
        ) : (
          // Soft gold glow behind the photo
          <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brass-light/10 blur-3xl" />
        )}
        <Container
          className={`relative grid items-center gap-12 py-16 md:py-24 ${image ? 'lg:grid-cols-[1.1fr_1fr] lg:gap-16' : ''} ${backgroundImage ? 'lg:min-h-[640px] lg:py-28' : ''}`}
        >
          <div className={backgroundImage ? 'max-w-2xl' : undefined}>
            {eyebrow && (
              <p data-aos="fade-down" className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
                <span aria-hidden className="h-px w-8 bg-brass-light" />
                {eyebrow}
              </p>
            )}
            <h1
              data-aos="fade-right"
              className={`mt-5 max-w-3xl text-5xl font-bold leading-[1.05] md:text-6xl ${backgroundImage ? 'lg:max-w-xl lg:text-7xl' : ''}`}
            >
              {title}
            </h1>
            <p data-aos="fade-right" data-aos-delay="100" className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{lead}</p>

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
              <dl data-aos="fade-up" data-aos-delay="300" className="mt-12 flex flex-wrap gap-y-6 border-t border-white/15 pt-8">
                {/* Thin dividers between stats from sm up; on phones they wrap without dividers */}
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-4 pr-8 sm:border-r sm:border-white/15 sm:pl-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
                    {s.icon && (
                      <svg aria-hidden viewBox="0 0 24 24" className="h-9 w-9 shrink-0 fill-none stroke-brass-light stroke-[1.5]" strokeLinecap="round">
                        {statIcons[s.icon]}
                      </svg>
                    )}
                    <div>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="font-display text-3xl font-semibold"><CountUp value={s.value} /></dd>
                      <dd className="mt-1 text-sm text-white/60">{s.label}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {image && (
            <div data-aos="fade-left" data-aos-delay="150" className="relative mx-auto w-full max-w-md lg:max-w-none">
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
