/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "var(--background-primary)",
        bgSecond: "var(--background-secondary)",
        bgSidebar: "var(--background-sidebar)",
        bgModal: "var(--background-modal)",
        bgButtonPrimary: "var(--bg-button-primary)",
        bgPlayer: "var(--bg-player)",
        bgHoverDrawer: "var(--bg-hover-drawer)",

        sidebarText: "var(--text-sidebar)",
        primaryText: "var(--text-primary)",
        secondText: "var(--text-second)",
        hoverItem: "var(--hover-text-item)",
        hoverBgItem: "var(--hover-bg-item)",
        borderLight: "var(--border-color-light)",
        borderTopPlayer: "var(--border-top-player)",
      },
    },
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
