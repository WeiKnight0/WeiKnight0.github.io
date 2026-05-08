/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}',
    './node_modules/astro-boilerplate-components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'readable-mono': ['Consolas', 'Courier New', 'monospace'],
        fiction: ['Georgia', 'Times New Roman', 'Songti SC', 'serif'],
        jp: ['"Yu Gothic"', '"Hiragino Sans"', '"Noto Sans JP"', 'sans-serif'],
        'jp-serif': [
          '"Yu Mincho"',
          '"Hiragino Mincho ProN"',
          '"Noto Serif JP"',
          '"MS Mincho"',
          'serif',
        ],
      },
      colors: {
        fiction: {
          ink: '#f8efe2',
          gold: '#d8b76a',
          wine: '#8f2f4b',
          night: '#160d1f',
          violet: '#3b214c',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
