// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Red Hat Display', ...defaultTheme.fontFamily.sans],
        kaushan: ['Kaushan Script', ...defaultTheme.fontFamily.serif],
      },
      colors:{
        primary: '#161616',
        secondary: '#2f2f2f',
        red: '#e40806',
        white: '#ffffff',
      }
    }
  },
  plugins: [],
};
