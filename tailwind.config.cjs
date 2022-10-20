/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'blink': 'blinker 1.2s step-end infinite;'
      },
      keyframes: {
        blinker: {
          '50%': {opacity: 0}
        }
      }
    },
  },
  plugins: [],
}
