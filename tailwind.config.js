/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}',
    './node_modules/astro-boilerplate-components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Chinese is the default CJK shape; Japanese is opt-in via jp-display-*.
        'real-sans': ['Inter', '"Noto Sans SC"', '"Microsoft YaHei"', '"PingFang SC"', 'sans-serif'],
        'real-mono': ['"JetBrains Mono"', 'Consolas', 'Courier New', '"Noto Sans SC"', '"Microsoft YaHei"', 'monospace'],
        'fiction-serif': ['Georgia', '"Noto Serif SC"', '"Source Han Serif SC"', '"Songti SC"', 'SimSun', 'serif'],
        'fiction-sans': ['"Noto Sans SC"', '"Microsoft YaHei"', '"PingFang SC"', 'sans-serif'],
        fiction: ['Georgia', '"Noto Serif SC"', '"Source Han Serif SC"', '"Songti SC"', 'SimSun', 'serif'],
        'readable-mono': ['"JetBrains Mono"', 'Consolas', 'Courier New', '"Noto Sans SC"', '"Microsoft YaHei"', 'monospace'],
        zh: ['Inter', '"Noto Sans SC"', '"Microsoft YaHei"', '"PingFang SC"', 'sans-serif'],
        // Japanese display fonts are only for explicitly marked Japanese text.
        'jp-display-sans': ['"Noto Sans JP"', '"Hiragino Sans"', '"Yu Gothic"', 'sans-serif'],
        'jp-display-serif': ['"Noto Serif JP"', '"Yu Mincho"', '"Hiragino Mincho ProN"', 'serif'],
      },
      colors: {
        // Real: Deep Cyber/Tech Theme
        real: {
          bg: '#020b18',        // Very dark blue background
          surface: '#0a192f',   // Deep tech blue panel background
          surfaceHover: '#112240',
          text: '#e6f1ff',      // Bright legible text
          muted: '#8892b0',     // Muted text
          accent: '#00f5ff',    // Neon Cyan
          accentSecondary: '#b026ff', // Neon Purple
          glow: 'rgba(0, 245, 255, 0.2)',
        },
        // Fiction: Warm Magical/Twilight Theme
        fiction: {
          bg: '#1a0b16',        // Very dark warm purple
          surface: '#2d1b36',   // Rich twilight purple panel background
          surfaceHover: '#3b2346',
          text: '#fdf8f5',      // Warm off-white
          muted: '#bda6c4',     // Muted purple-grey
          accent: '#ffd700',    // Bright Gold
          accentSecondary: '#ff3366', // Magenta/Pink
          gold: '#ffd700',
          ink: '#fdf8f5',
          glow: 'rgba(255, 215, 0, 0.2)',
        },
      },
      backgroundImage: {
        'real-gradient': 'linear-gradient(135deg, #020b18 0%, #0a192f 100%)',
        'fiction-gradient': 'linear-gradient(135deg, #1a0b16 0%, #2d1b36 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
