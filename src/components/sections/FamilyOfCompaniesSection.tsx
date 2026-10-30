import { Container } from '@/components/ui/Container';
import { companies } from '@/data/companies';

/**
 * Logo grid of the family of companies. `dark` puts it on navy (use it to alternate with the sections around it).
 * Logo cards stay white either way so logos are always readable.
 */
export function FamilyOfCompaniesSection({ id, dark = false }: { id?: string; dark?: boolean }) {
  return (
    // scroll-mt clears the sticky header when a menu link jumps here
    <section id={id} className={`relative scroll-mt-20 overflow-hidden ${dark ? 'bg-ink text-white' : 'bg-cloud'}`}>
      {dark && (
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brass-light/10 blur-3xl" />
      )}
      <Container className="relative py-16 md:py-20">
        <div data-aos="fade-down" className="max-w-3xl">
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-brass-light' : 'text-brass'}`}>Family of companies</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Part of a larger family.</h2>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {companies.map((c, i) => (
            <li
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className={`grid aspect-[3/2] place-items-center rounded-3xl border bg-white p-6 transition-colors duration-300 hover:border-brass-light ${dark ? 'border-white/10' : 'border-ink/10'}`}
            >
              {c.logo ? (
                <img src={c.logo} alt={c.name} loading="lazy" className="max-h-full max-w-full object-contain" />
              ) : (
                // Placeholder until the logo arrives: dashed box with a generic image icon
                <span className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink/15 text-ink/40">
                  <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[1.5]">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <circle cx="9" cy="10" r="2" />
                    <path d="M21 16l-5-5-9 9" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs font-semibold">{c.name}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
