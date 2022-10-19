/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'custom': ['Khand Regular', 'Khand Light', 'Khand Medium', 'Khand Bold', 'Khand SemiBold']
  },
  },
  plugins: [],
  darkMode: 'class'
}
