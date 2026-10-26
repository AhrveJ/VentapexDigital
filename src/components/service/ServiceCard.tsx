import { Link } from 'react-router-dom';
import type { Service } from '@/types/service';

export function ServiceCard({ service }: { service: Service }) {
  const { slug, name, summary, pricing, badge } = service;
  const highlights =
    service.highlights ?? service.sections.find((s) => s.type === 'list')?.items.slice(0, 4) ?? [];
  const featured = Boolean(badge);

  return (
    <article
      className={`flex h-full flex-col rounded-3xl border p-7 ${
        featured
          ? 'border-brass-light/60 bg-gradient-to-b from-[#16334A] to-[#0F2536] shadow-[0_20px_60px_-20px_rgba(242,193,78,0.35)]'
          : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      {badge && (
        <p className="mb-5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
          {badge}
        </p>
      )}
      <h3 className="text-2xl font-semibold leading-tight">
        <Link to={`/services/${slug}`} className="hover:text-brass-light">{name}</Link>
      </h3>
      <p className="mt-3 leading-relaxed text-white/65">{summary}</p>

      <div className="mt-6">
        {pricing ? (
          <>
            <p className="text-sm text-white/60">Starting at</p>
            <p className="font-display">
              <span className="text-5xl font-semibold">${pricing.startingAt.toLocaleString('en-US')}</span>
              <span className="text-lg text-white/70">/{pricing.period}</span>
            </p>
            <p className="mt-1 text-sm font-semibold text-emerald-400">{pricing.label}</p>
          </>
        ) : (
          <>
            <p className="text-sm text-white/60">Pricing</p>
            <p className="font-display text-4xl font-semibold">Custom quote</p>
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
        className={`mt-auto block rounded-xl px-5 py-4 text-center font-semibold transition-colors ${
          featured
            ? 'bg-gradient-to-r from-brass to-brass-light text-ink hover:from-brass-light hover:to-white'
            : 'border border-white/15 bg-white/[0.03] hover:bg-white/10'
        }`}
      >
        Get started
      </Link>
    </article>
  );
}
