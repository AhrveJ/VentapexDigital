export const site = {
  name: 'AZN Accounting LLC',
  url: 'https://www.example.com',
  description: 'Tax preparation, accounting and fractional CFO services for individuals and growing businesses.',
  // email: 'hello@example.com',
  phone: '(555) 010-2030',
  address: '100 Main Street, Suite 200, Anytown, USA',
  /** Contact form API (server/contact_app.py), set in .env */
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '/api/contact',
  /** reCAPTCHA v2 checkbox SITE key, set in .env. The secret key never goes here. */
  recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '',
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
} as const;
