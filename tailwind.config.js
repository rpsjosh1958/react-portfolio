module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      mob: "375px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
      laptopl: "1440px",
    },
    extend: {
      fontFamily: {
        geist: ["Geist", "system-ui", "sans-serif"],
        "geist-mono": ["'Geist Mono'", "monospace"],
        display: ["'Instrument Serif'", "serif"],
      },
      colors: { acc: "#EB5E0B", ink: "#f3f1ed", mute: "#8d8a84", card: "#0e0e0e", card2: "#151515" },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(24px)", filter: "blur(6px)" }, to: { opacity: "1", transform: "none", filter: "none" } },
        beat: { "0%,100%": { boxShadow: "0 0 0 0 rgba(235,94,11,.6)" }, "60%": { boxShadow: "0 0 0 7px transparent" } },
      },
      animation: { rise: "rise 1s both", beat: "beat 2.4s infinite" },
    },
  },
  plugins: [],
};
