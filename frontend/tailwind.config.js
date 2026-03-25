/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quantum-blue': {
          50: '#e6f1ff',
          100: '#bddaff',
          200: '#94c2ff',
          300: '#6ba9ff',
          400: '#4291ff',
          500: '#1975ff',
          600: '#0062ff',
          700: '#0052d9',
          800: '#0042b3',
          900: '#00348c',
        },
      }
    },
  },
  plugins: [],
}