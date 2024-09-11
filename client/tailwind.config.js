/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#006F46',
        backgroundGreen:'#f0fff0'
    },
    fontFamily: {
      urbanist: ['Urbanist', 'sans-serif'],
    },
    },
  },
  plugins: [],
}
