import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        shell: '#050816',
        panel: '#0a1020',
        card: '#0d1630',
        cardSoft: '#121d3d',
        line: 'rgba(34, 211, 238, 0.16)',
        borderGlow: 'rgba(20, 184, 166, 0.45)',
        muted: '#93a4c3',
        textSoft: '#c8d4ea',
        primary: '#4f8cff',
        cyan: '#22d3ee',
        teal: '#10b981',
        violet: '#8b5cf6',
        amber: '#f59e0b',
        redsoft: '#ef4444',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(20,184,166,0.30), 0 0 18px rgba(34,211,238,0.08)',
        soft: '0 10px 30px rgba(0,0,0,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backgroundImage: {
        gridLines:
          'linear-gradient(rgba(34,211,238,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.10) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
} satisfies Config;
