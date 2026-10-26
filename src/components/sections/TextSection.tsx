import type { ServiceSection } from '@/types/service';

type Props = Extract<ServiceSection, { type: 'text' }>;

export function TextSection({ title, body }: Props) {
  return (
    <section>
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-ink-soft">
        {body.map((p) => <p key={p}>{p}</p>)}
      </div>
    </section>
  );
}
