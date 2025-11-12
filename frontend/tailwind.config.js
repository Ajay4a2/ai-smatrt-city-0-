/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#fffdf3',
          100: '#fff7d6',
          200: '#ffefad',
          300: '#ffe276',
          400: '#ffd43b',
          500: '#facc15',
          600: '#eab308',
          700: '#ca8a04',
          800: '#a16207',
          900: '#713f12',
          950: '#422006'
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706'
        },
        accent: {
          400: '#ffcd38',
          500: '#ffb800',
          600: '#e2a200'
        }
      },
    },
  },
  plugins: [],
};

