const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        'xsm': '360px', // Custom extra-small breakpoint
        'ipad': '768px'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Poppins as sans-serif font
        merriweather: ['Merriweather', 'serif'], // Merriweather as serif font
      },
    },
    keyframes: {
      slide: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-100%)' },
      },
    },
    animation: {
      slide: 'slide 4s linear infinite',
    },
  },
  content: [
    './src/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
    flowbite.content(),
  ],
  plugins: [
    require('daisyui'),
    flowbite.plugin(),
  ],
}