module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      oswald: ["Oswald", "sans-serif"],
    },
    letterSpacing: {
      wider: "0.25em",
      widest: ".15em",
      giant: "0.3em",
    },
    extend: {
      colors: { darkgray: "#21222d", customgray: "#2f3136", customyellow: "#ffb600" },
    },
  },
  variants: {
    extend: {
      scale: ["active"],
    },
  },
  plugins: [],
}
