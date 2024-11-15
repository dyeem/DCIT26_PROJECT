/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        'xsm': '360px', // Custom extra-small breakpoint
        'ipad': '768px'
      },
      
    },
  },
  content: [
    './src/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
  ],
  plugins: [
    require('daisyui'),
  ],
}