import type { ServiceSection } from '@/types/service';

type Props = Extract<ServiceSection, { type: 'list' }>;

export function ListSection({ title, intro, items }: Props) {
  return (
    <section>
      <h2 className="text-3xl font-semibold">{title}</h2>
      {intro && <p className="mt-4 leading-relaxed text-ink-soft">{intro}</p>}
      <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
        {items.map((item) => (
          <li key={item} className="flex gap-4 py-4 leading-relaxed">
            <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-brass" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
