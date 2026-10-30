export interface Company {
  name: string;
  /** Image in public/images/companies. Without it the card shows a dashed placeholder. */
  logo?: string;
}

/** Family of companies: shown 4 per row on desktop (company page and home page). */
// TODO: PLACEHOLDER. Sample logos (company-1..4.svg); replace with the real companies and their logos.
export const companies: Company[] = [
  { name: 'Company 1', logo: '/images/companies/company-1.svg' },
  { name: 'Company 2', logo: '/images/companies/company-2.svg' },
  { name: 'Company 3', logo: '/images/companies/company-3.svg' },
  { name: 'Company 4', logo: '/images/companies/company-4.svg' },
];
