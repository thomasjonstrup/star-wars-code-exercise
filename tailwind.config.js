/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter Variable', 'sans-serif']
      },
      colors: {
        'light-grey': '#F8FAFC',
        'blueish-grey': '#607D8B'
      }
    }
  },
  plugins: []
}
