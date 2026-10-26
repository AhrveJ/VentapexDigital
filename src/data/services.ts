import type { Service } from '@/types/service';

/**
 * To add a service page: add an object here. Routing, nav, SEO tags
 * and the home-page card all pick it up automatically.
 */
export const services: Service[] = [
  {
    slug: 'bookkeeping',
    name: 'Bookkeeping',
    summary: 'Accurate, reconciled books every month, so your numbers are always ready when you need them.',
    heroTitle: 'Bookkeeping Services',
    heroLead:
      'Reliable, organized, and accurate financial records are the foundation of every successful business. Our bookkeeping services help ensure that your financial transactions are properly recorded, categorized, and reconciled.',
    pricing: { label: 'Monthly retainer', startingAt: 499, period: 'month' },
    highlights: [
      'Transaction recording and categorization',
      'Bank and credit card reconciliations',
      'AP and AR tracking',
      'Payroll processing coordination',
    ],
    badge: 'Popular choice',
    seo: {
      title: 'Bookkeeping Services for Small and Mid-Sized Businesses',
      description:
        'Monthly bookkeeping, reconciliations, AP/AR tracking and sales tax support. Retainers start at $499 per month.',
    },
    sections: [
      {
        type: 'table',
        title: 'Monthly pricing tiers',
        columns: ['Business size', 'Monthly transactions', 'Starting monthly fee'],
        rows: [
          ['Small Business', '1–500', '$499'],
          ['Mid-Sized Business', '501–4,000', '$999'],
          ['High-Volume Business', '4,001+', '$1,999'],
        ],
        note: 'Final pricing may vary based on transaction volume, account complexity, payroll requirements, and the overall scope of work.',
      },
      {
        type: 'list',
        title: 'Services include',
        items: [
          'Transaction recording and categorization',
          'Bank and credit card reconciliations',
          'Accounts payable and accounts receivable tracking',
          'Monthly bookkeeping and ledger maintenance',
          'Sales tax tracking and reporting support',
          'Payroll processing coordination',
          'Receipt management and supporting documentation',
        ],
      },
    ],
  },
  {
    slug: 'accounting-financial-reporting',
    name: 'Accounting & Financial Reporting',
    summary: 'Financial statements, ledger reviews and close support, ready for tax time and audits.',
    heroTitle: 'Accounting & Financial Reporting Services',
    heroLead:
      'Our accounting services go beyond transaction recording to help businesses maintain reliable financial statements, accurate general ledger balances, and organized financial records. We support month-end and year-end close processes and help prepare your books for tax preparation and external audits.',
    pricing: { label: 'Monthly retainer', startingAt: 749, period: 'month' },
    highlights: [
      'Monthly financial statements',
      'General ledger review and reconciliations',
      'Month-end and year-end close support',
      'Coordination with CPAs and auditors',
    ],
    seo: {
      title: 'Accounting & Financial Reporting Services',
      description:
        'Monthly financial statements, general ledger review, reconciliations and close support for businesses. Retainers start at $749 per month.',
    },
    sections: [
      {
        type: 'list',
        title: 'Services include',
        items: [
          'Monthly financial statement preparation',
          'General ledger review and account reconciliations',
          'Adjusting and correcting journal entries',
          'Trial balance review and reconciliation',
          'Month-end and year-end close support',
          'Financial reporting and account analysis',
          'Accounting cleanup and catch-up projects',
          'Coordination with external CPAs, tax professionals, and auditors',
        ],
      },
      {
        type: 'highlight',
        title: 'Additional project-based services',
        body: 'Historical bookkeeping cleanup, multi-period catch-up accounting, and complex reconciliation projects are quoted separately based on the volume of work, number of periods involved, and complexity of the records.',
      },
    ],
  },
  {
    slug: 'fractional-cfo',
    name: 'Fractional CFO & Advisory',
    summary: 'Strategic financial insight and oversight without the cost of a full-time CFO.',
    heroTitle: 'Fractional CFO & Strategic Financial Advisory',
    heroLead:
      'Our fractional CFO services provide businesses with strategic financial insight and ongoing financial oversight without the cost of hiring a full-time Chief Financial Officer.',
    pricing: { label: 'Monthly retainer', startingAt: 1999, period: 'month' },
    highlights: [
      'Strategic planning and forecasting',
      'Cash flow and liquidity management',
      'Budgeting and budget-to-actual analysis',
      'KPI development and monitoring',
    ],
    seo: {
      title: 'Fractional CFO & Strategic Financial Advisory',
      description:
        'Fractional CFO services for forecasting, cash flow, budgeting and financial oversight. Retainers start at $1,999 per month.',
    },
    sections: [
      {
        type: 'text',
        title: 'How we help',
        body: [
          'We help business owners understand their financial performance, plan for future growth, manage cash flow, and make data-driven decisions.',
        ],
      },
      {
        type: 'list',
        title: 'Services include',
        items: [
          'Strategic financial planning and forecasting',
          'Cash flow forecasting and liquidity management',
          'Budget development and budget-to-actual analysis',
          'Profitability and pricing analysis',
          'Cost optimization and expense management',
          'Financial KPI development and performance monitoring',
          'Financial oversight, reporting, and accountability',
          'Management reporting and decision-making support',
        ],
      },
      {
        type: 'highlight',
        title: 'Scope and reporting',
        body: "Service scope and reporting frequency will be tailored to the client's business needs and agreed upon engagement terms.",
      },
    ],
  },
  {
    slug: 'tax-preparation',
    name: 'Tax Preparation',
    summary: 'Personal and business returns, filed accurately and e-filed for you.',
    heroTitle: 'Business and personal tax returns',
    highlights: [
      'Every return prepared by a CPA or EA',
      'Electronic filing included',
      'Individuals, corporations and LLCs',
      'Secure document sharing',
    ],
    heroLead:
      'Spend your time on the work you do best. We handle your tax compliance quickly, carefully and in line with the rules.',
    seo: {
      title: 'Tax Preparation for Individuals and Businesses',
      description:
        'Certified professionals prepare personal and business tax returns, with e-filing included and secure document sharing.',
    },
    sections: [
      {
        type: 'list',
        title: 'Our ethics',
        intro:
          'You should be able to sign and file your return without lingering doubt. That starts with a preparer whose standards are written down.',
        items: [
          'We aim to legitimately lower your tax bill over the long term.',
          'We never overstate expenses, underreport income or take an unsupported position.',
          'We do not fear audits. We prepare every return to hold up in one.',
          'We will not take a position against your interest just to reduce audit risk.',
          'Where a position is supported by relevant case law but differs from IRS guidance, we explain the risk and the financial impact before you decide.',
        ],
      },
      {
        type: 'highlight',
        title: 'We prepare returns for',
        body: 'Individuals, C and S corporations, LLCs, partnerships and sole proprietors.',
      },
      {
        type: 'list',
        title: 'What is included',
        items: [
          'Fast, personal service',
          'Electronic filing included',
          'Every return prepared by a CPA or Enrolled Agent',
          'Secure document sharing for clients who are far away',
        ],
      },
    ],
  },
];

export const getServiceBySlug = (slug?: string) => services.find((s) => s.slug === slug);
