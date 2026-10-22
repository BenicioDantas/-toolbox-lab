/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          900: '#121212',
          800: '#1a1a1a',
          700: '#242424',
        },
        electricPurple: '#a855f7',
        electricCyan: '#06b6d4',
      },
    },
  },
  plugins: [],
}
