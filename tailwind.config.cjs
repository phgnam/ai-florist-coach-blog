/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      colors: {
        'green-deep': '#1a3028',
        'green-mid': '#2d5040',
        'green-light': '#e8f2ec',
        cream: '#fdf8f0',
        'cream-dark': '#f5ede0',
        rose: {
          DEFAULT: '#c4697e',
          light: '#f2d9df',
        },
        gold: {
          DEFAULT: '#b8935a',
          light: '#f0e4cc',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
