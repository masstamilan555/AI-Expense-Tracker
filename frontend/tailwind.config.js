/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        emblema: ["EmblemaOne", "sans-serif"],
        jaini: ["Jaini", "cursive"], 
        rubik: ["rubik", "cursive"], 
      },
    },
  },
  plugins: [],
}

