/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#10283A',
        'ink-soft': '#3C5568',
        paper: '#F8FAFB',
        mist: '#E6EEF2',
        brass: '#B7791F',
        'brass-light': '#F2C14E',
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
