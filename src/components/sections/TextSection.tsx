import type { ServiceSection } from '@/types/service';

type Props = Extract<ServiceSection, { type: 'text' }>;

export function TextSection({ title, body }: Props) {
  return (
    <section data-aos="fade-up" className="rounded-3xl border border-ink/10 bg-white p-7 md:p-10">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
        {/* First paragraph reads as the lead */}
        {body.map((p, i) => <p key={p} className={i === 0 ? 'text-lg text-ink' : undefined}>{p}</p>)}
      </div>
    </section>
  );
}
