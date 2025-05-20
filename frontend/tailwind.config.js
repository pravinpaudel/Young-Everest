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
          'primary': '#214662',    // Deep mountain blue
          'secondary': '#e8952f',  // Mountain sunrise orange
          'accent': '#ffffff',     // Snow white
          'dark': '#0c2231',       // Night sky blue
          'light': '#e8f0f6',      // Ice blue light
          'stone': '#8c8987',      // Mountain rock gray
          'ice': '#c9dbe5',        // Glacier ice
          'summit': '#f5f7fa'      // Summit snow
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
