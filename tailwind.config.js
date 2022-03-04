module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      color : {
        gray:{
          300 : '#beafb6a8',
          500 : '#91959fa1',
        }
      },
      boxShadow : {
        '2xl' : '0rem 0rem 11px 13px #91959fa1'
      }
    },
  },
  plugins: [],
}
