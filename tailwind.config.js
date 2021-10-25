module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#dcdfff',
          DEFAULT: '#5037e9',
          dark: '#3521b5',
          black: '#09003d',
        },
        white: {
          DEFAULT: '#e8e7ee',
          dark: '#e0dcfc',
          pure: '#ffffff'
        },
        secondary: {
          DEFAULT: '#5b5675',
          light: '#9897a1',
        },
        warning: '#ffc90e',
        'brand-black': '#0a071b'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}
