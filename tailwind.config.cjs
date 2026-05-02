/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#e8625a',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
