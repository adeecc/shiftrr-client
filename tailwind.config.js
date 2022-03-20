module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif'],
      mono: ['Roboto Mono', 'ui-monospace'],
    },
    extend: {
      colors: {
        accent: {
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
