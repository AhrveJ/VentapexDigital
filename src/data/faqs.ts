export interface Faq {
  question: string;
  answer: string;
}

/** Shown in the "Common questions" section on the home page. Add or reorder freely. */
export const faqs: Faq[] = [
  {
    question: 'What does bookkeeping with you include?',
    answer:
      'Transaction recording and categorization, bank and credit card reconciliations, AP and AR tracking, and payroll coordination. Retainers start at $499 per month, depending on your monthly transaction volume.',
  },
  {
    question: 'What is a fractional CFO?',
    answer:
      'A senior finance lead on a part-time retainer. You get forecasting, cash flow planning and strategic advice without the cost of a full-time CFO. Retainers start at $1,999 per month.',
  },
  {
    question: 'Can I hire you for just one thing?',
    answer:
      'Yes. Many clients start with a single service, like tax preparation or a one-time cleanup of their books, and add more only if it makes sense for them.',
  },
  {
    question: 'How is tax preparation priced?',
    answer:
      'Every return is quoted individually based on its complexity. We confirm the price with you before any work begins, so there are no surprises.',
  },
];
