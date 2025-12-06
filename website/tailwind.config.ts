import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        // Animation douce et élégante pour les cartes
        'fade-in-up-soft': 'fadeInUpSoft 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUpSoft: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(12px)' // ✅ Mouvement subtil
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
      },
      // ✅ Ajouter scale-102 (Tailwind n'a pas 102 par défaut)
      scale: {
        102: '1.02',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config