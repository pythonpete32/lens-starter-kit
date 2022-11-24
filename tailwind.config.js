/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sono)'],
      },
    },
  },
  daisyui: {
    themes: ['dracula'],
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],
}
