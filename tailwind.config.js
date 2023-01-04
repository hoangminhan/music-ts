/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      tablet: "769px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
