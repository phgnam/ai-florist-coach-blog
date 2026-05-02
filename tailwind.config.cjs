/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Jost', 'system-ui', 'sans-serif'],
      },
      colors: {
        blush: {
          DEFAULT: '#E8A4B0',
          dark:    '#C47A8A',
          light:   '#F5E6EA',
          mid:     '#EDA8B8',
        },
        ivory: {
          DEFAULT: '#FAF5EE',
          dark:    '#F0E0E6',
          mist:    '#FDF0F2',
        },
        mauve: {
          DEFAULT: '#4A2D35',
          mid:     '#6B4A52',
        },
        taupe: '#9E8A80',
        gold: {
          DEFAULT: '#C8956A',
          light:   '#F0E2D0',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
