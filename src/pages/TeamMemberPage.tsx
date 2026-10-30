import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/service/PageHero';
import { SocialLinks } from '@/components/team/SocialLinks';
import { TeamPhoto } from '@/components/team/TeamPhoto';
import { Container } from '@/components/ui/Container';
import { site } from '@/config/site';
import { getTeamMemberBySlug } from '@/data/team';
import NotFoundPage from './NotFoundPage';

/** One template for every team member. Content comes from data/team.ts. */
export default function TeamMemberPage() {
  const { slug } = useParams();
  const member = getTeamMemberBySlug(slug);
  if (!member) return <NotFoundPage />;

  const firstName = member.name.split(' ')[0];

  return (
    <>
      <Seo
        title={`${member.name}, ${member.title}`}
        description={member.bio[0] ?? `${member.name}, ${member.title} at ${site.name}.`}
        path={`/team/${member.slug}`}
      />
      <PageHero
        title={member.name}
        lead={member.headline ?? `${member.title} at ${site.name}`}
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Company', to: '/about' }, { name: member.name }]}
      />

      <Container className="grid gap-12 py-16 lg:grid-cols-[340px_1fr]">
        <aside data-aos="fade-right" className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <TeamPhoto member={member} className="w-64 sm:w-80 lg:w-full" />
          <div>
            <p className="text-2xl font-semibold font-display">{member.name}</p>
            <p className="text-brass">{member.title}</p>
          </div>
          <SocialLinks member={member} />
        </aside>

        <div className="max-w-3xl space-y-14">
          {member.intro && (
            <figure data-aos="fade-left" className="border-l-4 border-brass pl-6">
              <blockquote className="font-display text-2xl leading-snug text-ink md:text-3xl">“{member.intro}”</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-ink-soft">{member.name}</figcaption>
            </figure>
          )}

          <section data-aos="fade-up">
            <h2 className="text-3xl font-semibold">About {firstName}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-ink-soft">
              {member.bio.map((p) => <p key={p}>{p}</p>)}
            </div>
          </section>

          {member.experience && member.experience.length > 0 && (
            <section data-aos="fade-up">
              <h2 className="text-3xl font-semibold">Experience</h2>
              {/* Timeline: a line down the left with a dot per role */}
              <ol className="mt-6 space-y-8 border-l-2 border-ink/10">
                {member.experience.map((job, i) => (
                  <li key={`${job.role}-${job.company}`} className="relative pl-8">
                    <span
                      aria-hidden
                      className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-paper ${i === 0 ? 'bg-brass' : 'bg-ink/30'}`}
                    />
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brass">{job.period}</p>
                    <h3 className="mt-1 text-xl font-semibold">{job.role}</h3>
                    <p className="text-ink-soft">{job.company}</p>
                    {job.highlights && job.highlights.length > 0 && (
                      <ul className="mt-3 space-y-2 text-ink-soft">
                        {job.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {member.skills && member.skills.length > 0 && (
            <section data-aos="fade-up">
              <h2 className="text-3xl font-semibold">Skills &amp; expertise</h2>
              <ul className="mt-5 flex flex-wrap gap-3">
                {member.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Link to="/about#team" className="inline-block text-sm font-semibold text-ink-soft hover:text-brass">← Back to the team</Link>
        </div>
      </Container>
    </>
  );
}
