/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colors: {
          primary: "#2D336B",   // Main brand color
          secondary: "#A9B5DF", // Hover, highlights, accents
          background: "#FFFFFF", // Default background
        },
      },
    },
  },
  plugins: [],
}

