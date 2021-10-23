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
        },
        white: {
          DEFAULT: '#e8e7ee',
          pure: '#ffffff'
        },
        secondary: '#5b5675',
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
