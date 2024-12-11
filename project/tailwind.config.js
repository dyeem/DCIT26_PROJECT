const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        'xsm': '360px',
        'sm': '480px',
        'md': '768px',
        'lg': '976px',
        'bwlnx': '1156px',
        'xl': '1440px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
        merriweather: ['Merriweather', 'serif'],
        serif: ['"Noto Serif"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        lora: ['"Lora"', 'serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        noto: ['"Noto Serif"', 'serif']
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
    require('@tailwindcss/forms'),
  ],
}