/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e4af00",
        disabled: "#e4c96b",
        secondary: "#FF7D7D"
      }
    },
  },
  plugins: [],
}