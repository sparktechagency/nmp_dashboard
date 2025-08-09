/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //primary: "#e4af00",
        primary: "#3F67BC",
        disabled: "#e4c96b",
        secondary: "#FF7D7D"
      }
    },
  },
  plugins: [],
}