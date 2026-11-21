/** Design tokens from "Academic Prestige & Global Leadership" (Stitch DESIGN.md) */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#101D35', 700: '#18365D', 600: '#234D82' },
        royal: '#234D82',
        gold: { DEFAULT: '#C5A46D', dark: '#8A6D3B', soft: 'rgba(197,164,109,0.12)' },
        canvas: '#FAFAF7',
        tint: { DEFAULT: '#F0F3FF', 2: '#E8EEFC' },
        ink: '#252B35',
        muted: '#737B87',
        line: '#E5E7EB',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: { control: '12px', card: '16px' },
      boxShadow: {
        card: '0 8px 24px rgba(16, 29, 53, 0.06)',
        modal: '0 20px 40px rgba(16, 29, 53, 0.12)',
      },
      maxWidth: { page: '1280px' },
      letterSpacing: { eyebrow: '0.12em' },
    },
  },
  plugins: [],
};
