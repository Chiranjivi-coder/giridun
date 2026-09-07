/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        emerald: {
          950: '#032014',
          900: '#064e3b',
          800: '#065f46',
          700: '#047857',
        },
        gold: {
          50: '#fffbf0',
          100: '#fef5d6',
          200: '#fce9a8',
          300: '#f9d671',
          400: '#f5be3c',
          500: '#d99718',
          600: '#b87311',
          700: '#925211',
          800: '#774114',
          900: '#633615',
        }
      }
    },
  },
  plugins: [],
}