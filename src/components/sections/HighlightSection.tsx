import type { ServiceSection } from '@/types/service';

type Props = Extract<ServiceSection, { type: 'highlight' }>;

export function HighlightSection({ title, body }: Props) {
  return (
    <section data-aos="fade-up" className="relative overflow-hidden rounded-3xl bg-ink p-7 text-white md:p-10">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brass-light/10 blur-3xl" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
        <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brass-light text-ink">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
            <path d="M12 3l2.5 5.5L20 9.3l-4 4 1 5.7-5-2.8-5 2.8 1-5.7-4-4 5.5-.8L12 3z" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-white/75">{body}</p>
        </div>
      </div>
    </section>
  );
}
