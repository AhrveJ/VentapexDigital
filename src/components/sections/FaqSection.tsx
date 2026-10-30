import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import type { Faq } from '@/data/faqs';

/** `more` adds a link under the intro, e.g. "View all FAQs" on the home page preview */
export function FaqSection({ faqs, more }: { faqs: Faq[]; more?: { label: string; to: string } }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section className="bg-white text-ink">
      <Container className="grid items-start gap-12 py-16 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-24">
        {/* Sticky on larger screens so the heading stays in view beside the long list of questions */}
        <div data-aos="fade-right" className="md:sticky md:top-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">Common questions</p>
          <h2 className="mt-4 text-5xl font-bold leading-none md:text-6xl">
            FAQs<span className="text-brass">.</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
            The things people usually ask before the first call. If yours isn't here, just reach out and we'll answer it.
          </p>
          {more && (
            <Link
              to={more.to}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brass-light hover:text-ink"
            >
              {more.label}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>

        <div data-aos="fade-left" data-aos-delay="150" className="border-t border-ink/80">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={faq.question} className="border-b border-ink/15">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left text-lg font-semibold md:text-xl"
                  >
                    <span className={`transition-colors ${open ? 'text-brass' : 'group-hover:text-brass'}`}>
                      {faq.question}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 20 20"
                      className={`h-5 w-5 shrink-0 fill-none stroke-ink/50 stroke-[1.5] transition-transform duration-300 ${open ? 'rotate-45 !stroke-brass' : ''}`}
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
                    <div className="max-w-xl space-y-4 pb-7 leading-relaxed text-ink-soft">
                      {faq.answer.map((block, j) =>
                        typeof block === 'string' ? (
                          <p key={j}>{block}</p>
                        ) : (
                          <ul key={j} className="space-y-2">
                            {block.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ),
                      )}
                    </div>
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
