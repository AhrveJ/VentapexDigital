/** Each section type maps to one component in components/sections. */
export type ServiceSection =
  | { type: 'text'; title: string; body: string[] }
  | { type: 'list'; title: string; intro?: string; items: string[] }
  | { type: 'highlight'; title: string; body: string }
  | { type: 'table'; title: string; intro?: string; columns: string[]; rows: string[][]; note?: string };

/** Optional. Services without pricing (e.g. quoted per project) simply omit it. */
export interface ServicePricing {
  /** Short description of the billing model, e.g. "Monthly retainer" */
  label: string;
  /** Lowest price in USD */
  startingAt: number;
  /** Billing period, e.g. "month" */
  period: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Used on cards and in the nav dropdown */
  summary: string;
  heroTitle: string;
  heroLead: string;
  pricing?: ServicePricing;
  /** Checklist on the home-page card. Falls back to the first list section's items. */
  highlights?: string[];
  /** Ribbon on the home-page card, e.g. "Popular choice". Also gives the card the featured style. */
  badge?: string;
  seo: { title: string; description: string };
  sections: ServiceSection[];
}
