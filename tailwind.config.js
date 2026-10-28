/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary color: dark navy used for backgrounds, headings and buttons
        ink: '#0B1C29',
        'ink-soft': '#3C5568',
        paper: '#F8FAFB',
        // Soft off-white for light sections: neutral, just a touch less bright than pure white
        cloud: '#F3F5F7',
        mist: '#E6EEF2',
        brass: '#B7791F',
        'brass-light': '#F2C14E',
      },
      fontFamily: {
        // One primary font for the whole site. `display` stays as an alias so existing font-display classes still work.
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'page-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'page-in': 'page-in 0.4s ease-out',
      },
    },
  },
  plugins: [],
};
