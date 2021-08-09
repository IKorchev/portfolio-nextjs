const colors = require("tailwindcss/colors")
module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: "white",
      transparent: "transparent",
      black: "black",
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
    },
    extend: {
    },
  },
  variants: {
    extend: {
      scale: ["active"],
    },
  },
  plugins: [],
}
