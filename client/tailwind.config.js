/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      green: "#00AA45",
      light_green: "#E2F5EA",
      dark_green: "#219653",
      black: "#212121",
      gray: "#6A737D",
      light_gray: "#E1E4E8",
      dark_gray: "#959DA5",
      white: "#FFFFFF",
      light_white: "#FAFBFC",
      dark_white: "#F6F8FA",
      red: "#EB5757",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
