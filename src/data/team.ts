export interface TeamMember {
  name: string;
  title: string;
  phone?: string;
  /** Path under /public */
  photo: string;
}

/** First entry is featured on the home page. */
export const team: TeamMember[] = [
  {
    name: 'Justin Tio',
    title: 'Senior Accountant and CEO',
    phone: '610-804-0459',
    photo: '/images/justin-tio.jpg',
  },
  {
    name: 'Kristelle Moyano',
    title: 'Junior Accountant',
    photo: '/images/kristelle-moyano.jpg',
  },
];
