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
        neutral: "#919090",
        surface: {
          50: '#1e293b',
          100: '#162032',
          200: '#0f172a',
          300: '#0b1120' // deepest base
        }
      },
      fontFamily: {
        sans: ["Montserrat", "Arial", "Verdana", "ui-sans-serif", "system-ui"]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'glass-hover': '0 8px 32px 0 rgba(34, 76, 135, 0.4)'
      }
    }
  },
  plugins: []
};

