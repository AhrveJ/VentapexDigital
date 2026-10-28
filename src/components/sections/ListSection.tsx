import type { ServiceSection } from '@/types/service';

type Props = Extract<ServiceSection, { type: 'list' }>;

export function ListSection({ title, intro, items }: Props) {
  return (
    <section data-aos="fade-up" className="rounded-3xl border border-ink/10 bg-white p-7 md:p-10">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      {intro && <p className="mt-4 leading-relaxed text-ink-soft">{intro}</p>}
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-2xl border border-ink/10 bg-cloud p-4 leading-snug transition-colors hover:border-brass-light">
            <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink">
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-brass-light stroke-[2.5]">
                <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="self-center text-[0.95rem] font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
