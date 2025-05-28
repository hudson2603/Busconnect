/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily:{
      unlock:["Unlock", "serif"],
      inter:["Inter" ,"sans-serif"],
      oxanium: ['Oxanium', 'sans-serif'],
      rubikWetPaint: ['"Rubik Wet Paint"', 'cursive'],
      rethinkSans: ['"Rethink Sans"', 'sans-serif'],
      },
      boxShadow: {
        'top-only': '0 -8px 6px -2px rgba(0,0,0,1)',
      },
      fontSize:{
        "4.5xl":"2.5rem"
      },
      borderWidth:{
        "1.5":"1.5px",
        "1":"1px",
        "3":"3px"
      },
      fontWeight:{
        "extrathin":"25"
      },
      
      spacing:{
        "100px":"6.25rem",
        "400px":"33rem",
        13:"3.25rem",
        88:"22rem",
        172:"32rem",
        200:"41.46rem",
        15:"3.75rem",
        "1000px":"1000px",
      },
      keyframes: {
        slowShadow: {
          '0%, 100%': { boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' },
          '50%': { boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)' },
        },
      },
      marqueeRight: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(100%)' },
      },
      animation: {
        slowShadow: 'slowShadow 2s ease-in-out forwards', // Adjust the duration here
        marqueeRight: 'marqueeRight 15s linear infinite',
      },
    },
  },
  plugins: [],
}

