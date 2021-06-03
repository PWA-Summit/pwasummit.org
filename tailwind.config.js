const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: ['./dist/**/*.html', './src/**/*.css'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'header-bg': "url('./img/header-bg.png')",
        'header-fx': "url('./img/header-fx.png')",
      }),
      colors: {
        primary: colors.violet,
        secondary: colors.teal,
      },
    },
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
