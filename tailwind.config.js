module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        boxShadow: {
          inner: 'inset 15px 15px 22px 0px #000'
        },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
