/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ADFC03",
        "primary-midum": "#DBCBBd",
        secondary: "#E13939",
        tertiary: "#85A3B4",
        "tertiary-midum": "#C8DAE4",
        title: "#172430",
        paragraph: "#3C474E",
        "white-light": "#DBDBDB",
        snow: "#F6F6F6",
        "dark-primary": "#141D26",
        "dark-secondary": "#1E2A35",
        "dark-card-bg": "#1E2A35",
        "bdr-clr": "#E3E5E6",
        "bdr-clr-drk": "#3C474E",
        pink: "#FFC0CB"
      },
      fontFamily: {
        primary: ["Be Vietnam Pro", "sans-serif"],
        secondary: ["July it", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
