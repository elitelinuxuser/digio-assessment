/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/global.css"
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#006EBD',
        'primary': '#005FB3',
        'secondary': '#B7B7B7',
        'secondary-text': '#666666',
        'primary-text': '#1F1F1F',
        'secondary-light': '#FCEAD6',
        'secondary-dark': '#F9DC37',
      },
      fontFamily: {
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        'xs': ['0.75rem', '1.25rem'],
        'sm': ['0.875rem', '1.25rem'],
        'base': ['1rem', '1.25rem'],
        'lg': ['1.125rem', '1.5rem'],
        'xl': ['1.25rem', '1.5rem'],
        '1.5xl': ['1.375rem', '1.625rem'],
        '2xl': ['1.5rem', '1.75rem'],
        '3xl': ['1.75rem', '2.25rem'],
        '4xl': ['2.25rem', '2.5rem'],
        '6xl': ['3.5rem', '4.125rem'],
        '7xl': ['4rem', '4.75rem'],
      },
    },
  },
  plugins: [],
}
