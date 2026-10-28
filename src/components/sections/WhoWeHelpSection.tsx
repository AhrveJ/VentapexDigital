import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import type { TeamMember } from '@/data/team';

const audiences = [
  'Small businesses',
  'Freelancers & sole proprietors',
  'Real estate',
  'Restaurants & retail',
  'Contractors',
  'Individuals & families',
];

/** Who the firm serves, next to a quote from the leader. The quote is the member's `intro` from data/team.ts. */
export function WhoWeHelpSection({ leader }: { leader: TeamMember }) {
  const crop = leader.photoCrop;
  return (
    <section className="bg-cloud text-ink">
      <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">Who we help</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Built for small businesses and the people who run them.
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {audiences.map((a) => (
              <li key={a} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">{a}</li>
            ))}
          </ul>
        </div>

        {leader.intro && (
          <figure data-aos="fade-up" data-aos-delay="150" className="rounded-3xl bg-ink p-8 text-white shadow-[0_30px_60px_-25px_rgba(11,28,41,0.45)] md:p-10">
            <svg aria-hidden viewBox="0 0 32 24" className="h-7 w-9 fill-brass-light">
              <path d="M0 24V14C0 6 4.5 1.3 12 0l1.5 3.4C9 5 7 8 7 11h6v13H0zm18 0V14c0-8 4.5-12.7 12-14l1.5 3.4C27 5 25 8 25 11h6v13H18z" />
            </svg>
            <blockquote className="mt-6 text-xl font-medium leading-relaxed md:text-2xl">{leader.intro}</blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20">
                <img
                  src={leader.photo}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                  style={crop ? { transform: `scale(${crop.zoom})`, transformOrigin: crop.focus } : undefined}
                />
              </span>
              <span>
                <Link to={`/team/${leader.slug}`} className="underline block font-semibold transition-colors hover:text-brass-light">
                  {leader.name}
                </Link>
                <span className="block text-sm text-white/60">{leader.title}, AZN Accounting</span>
              </span>
            </figcaption>
          </figure>
        )}
      </Container>
    </section>
  );
}
