import type { ServiceSection } from '@/types/service';

type Props = Extract<ServiceSection, { type: 'highlight' }>;

export function HighlightSection({ title, body }: Props) {
  return (
    <section data-aos="fade-up" className="border-l-4 border-brass bg-mist p-6 md:p-8">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-lg leading-relaxed">{body}</p>
    </section>
  );
}
