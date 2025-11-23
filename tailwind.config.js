/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ff7a00',
          dark: '#e66700'
        },
        tealish: '#18b2a7'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(90deg, rgba(8,178,166,0.9) 0%, rgba(58,123,213,0.85) 50%, rgba(148,67,255,0.6) 100%)'
      }
    }
  },
  plugins: []
}
