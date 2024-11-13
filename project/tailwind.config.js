const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
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