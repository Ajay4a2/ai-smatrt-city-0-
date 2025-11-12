/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Replace slate family with earthy tortoise tones
        slate: {
          50: '#f3f6f4',
          100: '#e5eee7',
          200: '#cbdccf',
          300: '#a8c0ac',
          400: '#7fa28b',
          500: '#5d826b',
          600: '#446756',
          700: '#345146',
          800: '#253c33',
          900: '#16261f',
          950: '#0d1813'
        },
        moss: {
          400: '#4f7a5e',
          500: '#3c6349',
          600: '#2f503b'
        },
        bronze: {
          400: '#b48a58',
          500: '#98723f',
          600: '#7b5a30'
        },
        accent: {
          400: '#a0d6b4',
          500: '#6fbf92',
          600: '#4f9d74'
        }
      },
    },
  },
  plugins: [],
};
