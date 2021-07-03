module.exports = {
  mode: 'JIT',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Karla'],
        serif: ['Karla'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
