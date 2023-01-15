module.exports = {
  //prettier-ignore
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    ],
  theme: {
    letterSpacing: {
      wider: '0.25em',
      widest: '.15em',
      giant: '0.3em',
    },
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
      },
      colors: { darkgray: '#21222d', customgray: '#2f3136', customyellow: '#ffb600', customdarkgray: '#181a1e' },
    },
  },
  variants: {
    extend: {
      scale: ['active'],
    },
  },
  plugins: [],
};
