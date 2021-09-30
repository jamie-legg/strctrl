const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Raleway', ...defaultTheme.fontFamily.sans]
    },
    neumorphismSize: {
      xs: '0.05em',
      sm: '0.1em',
      default: '0.2em',
      lg: '0.4em',
      xl: '0.8em',
    },
    extend: {
        boxShadow: {
          inner: 'inset 15px 15px 22px 0px #000'
        },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-neumorphism')
  ],
}
