import { Link } from 'react-router-dom';
import type { Service } from '@/types/service';

export function ServiceCard({ service, aosDelay = 0 }: { service: Service; aosDelay?: number }) {
  const { slug, name, summary, pricing, badge } = service;
  const highlights =
    service.highlights ?? service.sections.find((s) => s.type === 'list')?.items.slice(0, 4) ?? [];
  const featured = Boolean(badge);

  return (
    // AOS sets transform on whatever it animates, so it goes on this wrapper and the article keeps its hover lift.
    // grid-cols-1 (minmax(0,1fr)) keeps the card at its column's width even when content is wide.
    <div data-aos="fade-up" data-aos-delay={aosDelay} className="row-span-5 grid grid-cols-1 grid-rows-subgrid gap-y-0">
    <article
      className={`group relative row-span-5 grid grid-rows-subgrid gap-y-0 rounded-3xl border p-7 transition duration-300 ease-out hover:-translate-y-2 hover:scale-[1.08] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 ${
        featured
          ? 'border-brass-light/60 bg-gradient-to-b from-[#16334A] to-[#0F2536] shadow-[0_20px_60px_-20px_rgba(242,193,78,0.35)] hover:border-brass-light hover:shadow-[0_28px_70px_-20px_rgba(242,193,78,0.5)]'
          : 'border-white/10 bg-white/[0.03] hover:border-brass-light/60 hover:bg-transparent hover:bg-gradient-to-b hover:from-[#16334A] hover:to-[#0F2536] hover:shadow-[0_20px_60px_-20px_rgba(242,193,78,0.35)]'
      }`}
    >
      {badge && (
        <p className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-brass-light/60 bg-[#16334A] px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
          {badge}
        </p>
      )}
      <h3 className="text-2xl font-semibold leading-tight">
        {/* group-hover: the title lights up when the mouse is anywhere on the card, not just on the title */}
        <Link to={`/services/${slug}`} className="transition-colors duration-300 group-hover:text-brass-light">{name}</Link>
      </h3>
      <p className="mt-3 leading-relaxed text-white/65">{summary}</p>

      <div className="mt-6">
        {pricing ? (
          <>
            <p className="text-sm text-white/60 mb-2">Starting at</p>
            <p className="font-display">
              <span className="text-5xl font-semibold leading-[3rem] xl:text-4xl">${pricing.startingAt.toLocaleString('en-US')}</span>
              <span className="text-lg text-white/70">/{pricing.period}</span>
            </p>
            <p className="mt-1 text-sm font-semibold text-emerald-400">{pricing.label}</p>
          </>
        ) : (
          <>
            <p className="text-sm text-white/60 mb-2">Pricing</p>
            <p className="font-display whitespace-nowrap text-3xl font-semibold leading-[3rem] sm:text-4xl xl:text-3xl">Custom quote</p>
            <p className="mt-1 text-sm font-semibold text-emerald-400">Based on your return</p>
          </>
        )}
      </div>

      <ul className="mb-8 mt-6 space-y-4">
        {highlights.map((item) => (
          <li key={item} className="flex gap-3">
            <svg aria-hidden viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 fill-none stroke-brass-light stroke-[2.5]">
              <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white/90">{item}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/services/${slug}`}
        aria-label={`Get started with ${name}`}
        className={`block self-end rounded-xl px-5 py-4 text-center font-semibold transition-colors ${
          featured
            ? 'bg-gradient-to-r from-brass to-brass-light text-ink hover:from-brass-light hover:to-white'
            : 'border border-white/15 bg-white/[0.03] hover:bg-white/10 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-brass group-hover:to-brass-light group-hover:text-ink'
        }`}
      >
        Get started
      </Link>
    </article>
    </div>
  );
}
