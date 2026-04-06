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
        ink: '#1C1C1E',
        mist: '#F7F3EE',
        matcha: '#3D6B4F',
        gold: '#B8963E',
        stone: '#8C8880',
        snow: '#FFFFFF',
        'mist-dark': '#EDE8E1',
        'ink-soft': '#2C2C2E',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        jp: '2px',
      },
      boxShadow: {
        jp: '0 2px 12px rgba(28, 28, 30, 0.08)',
        'jp-hover': '0 4px 24px rgba(28, 28, 30, 0.14)',
      },
    },
  },
  plugins: [],
}
export default config
