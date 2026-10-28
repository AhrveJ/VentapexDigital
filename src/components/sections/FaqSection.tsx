import { useId, useState } from 'react';
import { Container } from '@/components/ui/Container';
import type { Faq } from '@/data/faqs';

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section className="border-b border-white/10 bg-ink text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-24">
        <div data-aos="fade-up">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass-light">Common questions</p>
          <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">
            plain <span className="font-semibold text-brass-light">answers</span>.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-white/65">
            The things people usually ask before the first call. If yours isn't here, just reach out and we'll answer it.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="150" className="border-t border-white/80">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={faq.question} className="border-b border-white/15">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left text-lg font-semibold md:text-xl"
                  >
                    <span className={`transition-colors ${open ? 'text-brass-light' : 'group-hover:text-brass-light'}`}>
                      {faq.question}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 20 20"
                      className={`h-5 w-5 shrink-0 fill-none stroke-white/60 stroke-[1.5] transition-transform duration-300 ${open ? 'rotate-45 stroke-brass-light' : ''}`}
                    >
                      <path d="M10 3v14M3 10h14" strokeLinecap="round" />
                    </svg>
                  </button>
                </h3>
                {/* grid-rows 0fr -> 1fr animates the panel to its natural height */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-7 leading-relaxed text-white/65">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
