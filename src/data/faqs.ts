export interface Faq {
  question: string;
  /** One entry per block: a string is a paragraph, an array of strings is a bullet list */
  answer: (string | string[])[];
}

/** All of these show on the FAQs page; the first few also preview on the home page. Add or reorder freely. */
export const faqs: Faq[] = [
  {
    question: 'What accounting services do you offer?',
    answer: [
      'We provide comprehensive accounting solutions tailored to the needs of small and growing businesses. Our services include:',
      [
        'Bookkeeping and general accounting',
        'Payroll processing and support',
        'Financial statement preparation',
        'Bank and credit card reconciliations',
        'Accounts payable and accounts receivable management',
        'Monthly, quarterly, and annual financial reporting',
        'Accounting cleanup and catch-up services',
        'Financial analysis and business advisory support',
      ],
      'Our goal is to simplify your accounting processes so you can focus on growing your business.',
    ],
  },
  {
    question: 'What makes your accounting firm different?',
    answer: [
      'Our firm brings over 13 years of combined public and corporate accounting experience, including 7 years at CPA firms specializing in audit and taxation, over 4 years with publicly traded companies listed on the NASDAQ Global Market, and 2 years with private equity-backed companies.',
      'We bring corporate-level accounting knowledge, financial reporting practices, and attention to detail to businesses of all sizes.',
      'Unlike traditional bookkeeping services, we focus not only on maintaining accurate financial records but also on helping business owners understand their financial performance and make informed decisions.',
    ],
  },
  {
    question: 'What types of businesses do you work with?',
    answer: [
      'We work with startups, entrepreneurs, small businesses, and growing companies across various industries.',
      'Whether you are launching a new business, managing daily financial operations, or expanding your company, we provide accounting solutions tailored to your business needs.',
    ],
  },
  {
    question: 'Do I need an accountant if I already use QuickBooks or other accounting software?',
    answer: [
      'Yes! While accounting software helps organize financial transactions, it does not replace professional accounting expertise.',
      'Our team helps ensure your financial records are accurate, properly categorized, reconciled, and maintained in accordance with applicable accounting principles.',
      'We help you get the most out of your accounting software while reducing errors and improving financial visibility.',
    ],
  },
  {
    question: 'Can you help if my bookkeeping is behind or disorganized?',
    answer: [
      'Absolutely! We understand that managing a business can be demanding, and bookkeeping may sometimes fall behind.',
      'We offer catch-up and cleanup accounting services to help organize your financial records, reconcile accounts, correct errors, and bring your books up to date.',
      'Once your records are organized, we can provide ongoing monthly bookkeeping services to keep everything running smoothly.',
    ],
  },
  {
    question: 'Do you offer monthly bookkeeping and accounting packages?',
    answer: [
      'Yes! We offer ongoing accounting and bookkeeping services tailored to your business size, transaction volume, and reporting requirements.',
      'Our services can include monthly reconciliations, financial statement preparation, general ledger maintenance, and ongoing accounting support.',
      'We work with each client to determine the most appropriate service package for their business.',
    ],
  },
  {
    question: 'Can you manage payroll for my business?',
    answer: [
      'Yes! We provide payroll support services to help businesses manage employee compensation, payroll records, and related accounting activities.',
      'Depending on your business needs, we can assist with payroll processing, payroll reconciliations, and coordination with payroll service providers.',
      'Our goal is to help ensure payroll is processed accurately and on time.',
    ],
  },
  {
    question: "Can you help me understand my company's financial performance?",
    answer: [
      'Absolutely! We believe accounting should provide more than just numbers.',
      'We help business owners understand their financial statements, monitor expenses, evaluate profitability, and identify opportunities for improvement.',
      'Drawing on our experience with publicly traded and private equity-backed companies, we bring valuable financial reporting and analysis practices to support better business decisions.',
    ],
  },
  {
    question: 'Is my financial information kept confidential?',
    answer: [
      "Yes. Protecting our clients' financial information is a priority.",
      'We handle sensitive business and financial information with professionalism, discretion, and confidentiality. We use appropriate safeguards and secure methods for handling and sharing financial records.',
    ],
  },
  {
    question: 'How much do your accounting services cost?',
    answer: [
      'Our pricing depends on the size of your business, the complexity of your accounting needs, transaction volume, and the services required.',
      'We believe in transparent pricing and customized solutions so you only pay for the services your business needs.',
      'Contact us for a consultation and personalized quote.',
    ],
  },
  {
    question: 'Do you work with businesses remotely?',
    answer: [
      'Yes! Our accounting services can be provided remotely, allowing us to support businesses regardless of location.',
      'Through cloud-based accounting software and secure communication channels, we can efficiently manage your accounting needs without requiring in-person meetings.',
    ],
  },
  {
    question: 'How do I get started?',
    answer: [
      'Getting started is simple!',
      'Contact us to schedule an initial consultation. We will discuss your business, review your accounting needs, and recommend services that best fit your goals.',
      'Whether you need ongoing bookkeeping, payroll support, or more comprehensive accounting assistance, we are here to help you build a stronger financial foundation.',
    ],
  },
];
