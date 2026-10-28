import type { ReactNode } from 'react';
import type { TeamMember } from '@/data/team';

type Network = keyof NonNullable<TeamMember['socials']>;

// Simple line icons (24x24, stroke = currentColor) so they pick up the site's colours
const networks: Record<Network, { label: string; icon: ReactNode }> = {
  linkedin: {
    label: 'LinkedIn',
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  facebook: {
    label: 'Facebook',
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  instagram: {
    label: 'Instagram',
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  },
  tiktok: {
    label: 'TikTok',
    icon: <path d="M9 12a4 4 0 1 0 4 4V2a5 5 0 0 0 5 5" />,
  },
};

/** Round icon buttons for whichever networks the member has. Renders nothing if they have none. */
export function SocialLinks({ member }: { member: TeamMember }) {
  const links = (Object.keys(networks) as Network[]).filter((n) => member.socials?.[n]);
  if (links.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((n) => (
        <li key={n}>
          <a
            href={member.socials![n]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on ${networks[n].label}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-brass-light"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-current stroke-2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {networks[n].icon}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
