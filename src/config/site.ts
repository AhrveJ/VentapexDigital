export const site = {
  name: 'Vantapex Digital',
  url: 'https://www.example.com',
  description: 'Tax preparation, accounting and fractional CFO services for individuals and growing businesses.',
  email: 'hello@example.com',
  phone: '(555) 010-2030',
  address: '100 Main Street, Suite 200, Anytown, USA',
  /**
   * Where the contact form posts (e.g. a Formspree or Web3Forms URL).
   * Leave empty and the form opens the visitor's email app instead.
   */
  formEndpoint: '' as string,
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
} as const;
