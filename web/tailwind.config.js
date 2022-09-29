/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
    "./index.html",
  ],
  theme: {
    fontFamily:{
      sans:['Inter','sans-serif']
    },
    extend: {
      colors:{
        
      },
      backgroundImage:{
        galaxyBg:"url('/public/background_galaxy.png')",
        nlwGradient:' linear-gradient(89.86deg, #9572FC 30.08%, #43E7AD 60.94%, #E1D55D 10.57%)',
        gameCardGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      }
    },
  },
  plugins: [],
}