/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#224c87",
        accent: "#da3832",
        neutral: "#919090"
      },
      fontFamily: {
        sans: ["Montserrat", "Arial", "Verdana", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

