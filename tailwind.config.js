/** @type {import('tailwindcss').Config} */

import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [
    aspectRatio,
  ],
}