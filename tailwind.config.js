const colors = require("tailwindcss/colors")
module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      oswald: ["Oswald", "sans-serif"],
    },
    colors: {
      white: "white",
      transparent: "transparent",
      black: colors.black,
      trueGray: colors.trueGray,
      gray: colors.coolGray,
      purple: colors.purple,
      pink: colors.pink,
      blue: colors.blue,
      sky: colors.sky,
      indigo: colors.indigo,
      rose: colors.rose,
      violet: colors.violet,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      lime: colors.lime,
      amber: colors.amber,
      orange: colors.orange,
      darkgray: "#050505",
    },
    letterSpacing: {
      wider: "0.25em",
      widest: ".15em",
      giant: "0.3em",
    },
    extend: {},
  },
  variants: {
    extend: {
      scale: ["active"],
    },
  },
  plugins: [],
}
