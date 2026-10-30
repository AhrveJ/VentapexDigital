import { Link } from 'react-router-dom';
import type { Service } from '@/types/service';

export function ServiceCard({ service, aosDelay = 0 }: { service: Service; aosDelay?: number }) {
  const { slug, name, summary, pricing, badge } = service;
  const highlights =
    service.highlights ?? service.sections.find((s) => s.type === 'list')?.items.slice(0, 4) ?? [];
  // The featured card stays navy so it stands out on the white section; the rest are light
  const featured = Boolean(badge);
  // Light cards turn primary navy on hover, so their text colors flip with group-hover
  const muted = featured ? 'text-white/65' : 'text-ink-soft transition-colors duration-300 group-hover:text-white/65';
  const accent = featured ? 'text-emerald-400' : 'text-emerald-700 transition-colors duration-300 group-hover:text-emerald-400';

  return (
    // AOS sets transform on whatever it animates, so it goes on this wrapper and the article keeps its hover lift.
    // grid-cols-1 (minmax(0,1fr)) keeps the card at its column's width even when content is wide.
    // fade-right: each card slides in from the left; with the staggered delay they sweep across left to right.
    <div
      data-aos="fade-right"
      data-aos-delay={aosDelay}
      data-aos-duration="900"
      data-aos-easing="ease-out-back"
      className="row-span-5 grid grid-cols-1 grid-rows-subgrid gap-y-0"
    >
    <article
      className={`group relative row-span-5 grid grid-rows-subgrid gap-y-0 rounded-3xl border p-7 transition duration-300 ease-out hover:-translate-y-2 hover:scale-[1.08] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 ${
        featured
          ? 'border-brass-light/60 bg-gradient-to-b from-[#16334A] to-ink text-white shadow-[0_20px_60px_-20px_rgba(242,193,78,0.35)] hover:border-brass-light hover:shadow-[0_28px_70px_-20px_rgba(242,193,78,0.5)]'
          : 'border-ink/10 bg-white text-ink hover:border-brass-light/60 hover:bg-ink hover:text-white hover:shadow-[0_20px_60px_-20px_rgba(11,28,41,0.45)]'
      }`}
    >
      {badge && (
        <p className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-brass-light/60 bg-[#16334A] px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
          {badge}
        </p>
      )}
      <h3 className="text-2xl font-semibold leading-tight">
        {/* group-hover: the title lights up when the mouse is anywhere on the card, not just on the title */}
        <Link
          to={`/services/${slug}`}
          className="transition-colors duration-300 group-hover:text-brass-light"
        >
          {name}
        </Link>
      </h3>
      <p className={`mt-3 leading-relaxed ${muted}`}>{summary}</p>

      <div className="mt-6">
        {pricing ? (
          <>
            {/* <p className={`mb-2 text-sm ${muted}`}>Starting at</p>
            <p className="font-display">
              <span className="text-5xl font-semibold leading-[3rem] xl:text-4xl">${pricing.startingAt.toLocaleString('en-US')}</span>
              <span className={`text-lg ${muted}`}>/{pricing.period}</span>
            </p>
            <p className={`mt-1 text-sm font-semibold ${accent}`}>{pricing.label}</p> */}
            <>
              <p className={`mb-2 text-sm ${muted}`}>Pricing</p>
              <p className="font-display whitespace-nowrap text-3xl font-semibold leading-[3rem] sm:text-4xl xl:text-3xl">Custom quote</p>
              {/* <p className={`mt-1 text-sm font-semibold ${accent}`}>Based on your return</p> */}
            </>
          </>
        ) : (
          <>
            <p className={`mb-2 text-sm ${muted}`}>Pricing</p>
            <p className="font-display whitespace-nowrap text-3xl font-semibold leading-[3rem] sm:text-4xl xl:text-3xl">Custom quote</p>
            <p className={`mt-1 text-sm font-semibold ${accent}`}>Based on your return</p>
          </>
        )}
      </div>

      <ul className="mb-6 mt-4 space-y-4">
        {highlights.map((item) => (
          <li key={item} className="flex gap-3">
            <svg aria-hidden viewBox="0 0 20 20" className={`mt-1 h-4 w-4 shrink-0 fill-none stroke-[2.5] ${featured ? 'stroke-brass-light' : 'stroke-brass transition-colors duration-300 group-hover:stroke-brass-light'}`}>
              <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={featured ? 'text-white/90' : 'text-ink transition-colors duration-300 group-hover:text-white/90'}>{item}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/services/${slug}`}
        aria-label={`Get started with ${name}`}
        className={`block self-end rounded-xl px-5 py-4 text-center font-semibold transition-colors ${
          featured
            ? 'bg-gradient-to-r from-brass to-brass-light text-ink hover:from-brass-light hover:to-white'
            : 'border border-ink/15 bg-white text-ink group-hover:border-transparent group-hover:bg-brass-light group-hover:text-ink hover:!bg-white'
        }`}
      >
        Get started
      </Link>
    </article>
    </div>
  );
}
