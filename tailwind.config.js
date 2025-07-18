/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          blue: '#4FC3F7', // main accent blue
          teal: '#43E6C0', // accent teal/green
          dark: '#10141A', // main background
          card: '#1A2230', // card background
          white: '#FFFFFF',
          muted: '#B0B8C1', // muted text
        },
      },
    },
  },
  plugins: [],
} 