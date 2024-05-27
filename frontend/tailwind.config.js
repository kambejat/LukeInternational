/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",    
  ],
  theme: {
    extend: {
      'golden-dream': {
        '50': '#fcfbea',
        '100': '#f8f7c9',
        '200': '#f3ed95',
        '300': '#ebdd59',
        '400': '#e6cf3d',
        '500': '#d4b41e',
        '600': '#b78d17',
        '700': '#926716',
        '800': '#79521a',
        '900': '#68441b',
        '950': '#3c240c',
    },
    
    },
  },
  plugins: [],
}

