/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#151312",
        light: {
          100: '#d6c7ff',
          200: '#a8b5db',
          300: '#9ca4ab',
        },
        dark: {
          100: '#2212fd3',
          200: '#0f0d23'
        },
        accent: '#ab8bff'
      }
    },
  },
  plugins: [],
};
