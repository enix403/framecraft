/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [require("rippleui")],
  /** @type {import('rippleui').Config} */
  rippleui: {
    // defaultStyle: false,
    // removeThemes: ['dark']
    themes: [
      {
        themeName: "dark",
        colorScheme: "dark",
        colors: {
          backgroundPrimary: "#171717",
          content1: "#ffffff"
        }
      }
    ]
  }
};
