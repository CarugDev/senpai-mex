import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          ink: '#1a1a2e',
          mist: '#f8f4ef',
          matcha: '#4a7c59',
          gold: '#c9a84c',
          clay: '#c4724a',
          snow: '#ffffff',
          'mist-dark': '#ede8e1',
          'ink-light': '#2d2d44',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'jp': '2px',
      },
      boxShadow: {
        'jp': '0 2px 12px rgba(26, 26, 46, 0.08)',
        'jp-hover': '0 4px 24px rgba(26, 26, 46, 0.14)',
      },
    },
  },
  plugins: [],
}
export default config
