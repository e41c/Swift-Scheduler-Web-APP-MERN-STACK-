/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Roboto"', 'sans-serif'],
        'serif': ['"Playfair Display"', 'serif'],
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
}

