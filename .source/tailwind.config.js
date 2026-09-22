/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B2B5C", // Deep blue from logo
        secondary: "#D49A36", // Gold/Orange from logo
      }
    },
  },
  plugins: [],
}
