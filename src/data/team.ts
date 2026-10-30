export interface Experience {
  role: string;
  company: string;
  /** e.g. '2021 – Present' */
  period: string;
  /** What they did there, one string per bullet */
  highlights?: string[];
}

export interface TeamMember {
  /** URL of the profile page: /team/<slug> */
  slug: string;
  name: string;
  title: string;
  phone?: string;
  /** Path under /public */
  photo: string;
  /**
   * Optional zoom for photos that aren't already head-and-shoulders.
   * `zoom` 2 = twice as close; `focus` is the point that stays put (CSS transform-origin), e.g. '50% 20%'.
   */
  photoCrop?: { zoom: number; focus: string };
  /** One line under the name on the profile page. Falls back to `title`. */
  headline?: string;
  /** Short first-person introduction, shown large at the top of the profile */
  intro?: string;
  /** Profile page "About" section, one string per paragraph */
  bio: string[];
  /** Work history, newest first. Leave empty to hide the section. */
  experience?: Experience[];
  /** Shown as tags on the profile page. Leave empty to hide the section. */
  skills?: string[];
  /** Full profile URLs. Leave any out (or all) and its icon is hidden. */
  socials?: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    tiktok?: string;
  };
}

/** First entry is featured on the home page. */
export const team: TeamMember[] = [
  {
    slug: 'justin-tio',
    name: 'Justin Tio',
    title: 'CEO',
    phone: '610-804-0459',
    photo: '/images/justin-tio.jpg',
    // Full-length photo: zoom in so the face sits near the middle with room above the hair
    photoCrop: { zoom: 2, focus: '50% 35%' },
    // SAMPLE CONTENT: placeholder intro, bio and skills. Replace with Justin's real story and details.
    // No `experience` on purpose: the CEO's story is told in the bio instead of a timeline.
    intro:
      "I help business owners understand their numbers so they can make confident decisions. Clear books, honest advice and no surprises at tax time.",
    bio: [
      'Justin Tio started his career as an accountant, working with small business owners who were often overwhelmed by their books and anxious every tax season. He saw the same pattern again and again: good businesses making decisions without clear numbers, and no one taking the time to explain what those numbers meant.',
      'He founded AZN Accounting LLC to change that. What began as bookkeeping and tax preparation for a handful of local clients grew, through referrals and long-term relationships, into a full-service firm offering accounting, financial reporting and fractional CFO advisory.',
      'Today, as CEO, Justin leads the team and still works directly with clients. His approach is simple: accurate work, plain-language advice and a firm that treats every client’s business like its own.',
    ],
    skills: [
      'Tax planning & preparation',
      'Financial statement analysis',
      'Cash flow forecasting',
      'Budgeting',
      'QuickBooks Online',
      'Fractional CFO advisory',
      'Business strategy',
    ],
    socials: {
      linkedin: 'https://www.linkedin.com/in/...',
      facebook: 'https://www.facebook.com/...',
      instagram: 'https://www.instagram.com/...',
      tiktok: 'https://www.tiktok.com/@...',
    },
  },
  {
    slug: 'kristelle-moyano',
    name: 'Kristelle Moyano',
    title: 'Junior Accountant',
    photo: '/images/kristelle-moyano.jpg',
    // SAMPLE CONTENT: placeholder intro, bio, experience and skills. Replace with Kristelle's real details.
    intro:
      'I keep clients’ books accurate and up to date, so every report is ready when it is needed. I love turning messy records into clean numbers.',
    bio: [
      'Kristelle Moyano is a Junior Accountant at AZN Accounting LLC, supporting bookkeeping, reconciliations and month-end close for the firm’s clients.',
      'Kristelle is detail-oriented and focused on getting the numbers right the first time.',
    ],
    experience: [
      {
        role: 'Junior Accountant',
        company: 'AZN Accounting LLC',
        period: '2024 – Present',
        highlights: [
          'Records and categorizes client transactions',
          'Prepares bank and credit card reconciliations',
          'Supports month-end close and financial statement preparation',
        ],
      },
      {
        role: 'Accounting Intern',
        company: 'Sample Accounting Office',
        period: '2023 – 2024',
        highlights: ['Assisted with data entry, AP/AR tracking and filing'],
      },
    ],
    skills: [
      // 'AI Integrated Accounting Firm',
      'Bookkeeping',
      'Bank reconciliations',
      'Accounts payable & receivable',
      'QuickBooks Online',
      // 'Microsoft Excel',
    ],
    socials: {
      linkedin: 'https://www.linkedin.com/in/...',
      facebook: 'https://www.facebook.com/...',
      instagram: 'https://www.instagram.com/...',
      tiktok: 'https://www.tiktok.com/@...',
    },
  },
];

export function getTeamMemberBySlug(slug: string | undefined): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}
