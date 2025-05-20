/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'young-everest': {
          'primary': '#1a4d2e',    // Forest green (primary team color)
          'secondary': '#ff9d00',  // Bright orange (secondary team color)
          'accent': '#ffffff',     // White (accent color)
          'dark': '#0a2514',       // Darker green for shadows
          'light': '#e6f2e9',      // Light green for backgrounds
        }
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
