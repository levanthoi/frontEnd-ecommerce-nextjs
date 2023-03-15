/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f53d2d',
        secondary: '#ff6633',
        white: '#fff',
        black: '#2d343a',
        gray: '#929292',
        hover: '#ffc107',
        yellow: '#ffad00',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [],
};
