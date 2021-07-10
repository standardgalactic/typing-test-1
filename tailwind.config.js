const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  ...(isProd && { mode: 'jit' }),
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
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
