/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Scan all component templates and TypeScript files for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        customOrange: '#dfa974', // You can name it as you like
      }
    },
  },
  plugins: [],
};
