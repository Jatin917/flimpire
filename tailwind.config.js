/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        black: '10px 10px 35px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.5)',
        white: '10px 10px 35px -3px rgba(255, 255, 255, 0.7), 0 4px 6px -2px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
