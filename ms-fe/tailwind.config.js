module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xsm: "425px",
      // => @media (min-width: 425px) { ... }
      msm: "525px",
      // => @media (min-width: 525px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }
      lmd: "800px",
      lmdmax: { max: "800px" },
      // => @media (min-width: 850px) { ... }
      xmd: "850px",
      // => @media (min-width: 850px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }
      mlg: "1024px",
      // => @media (min-width: 1024px) { ... }

      lp: "1440px",
      // => @media (min-width: 1440px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "4k": "2559px",
      // => @media (min-width: 2560px) { ... }
    },
    fontSize: {
      xs: ".75vw",
      sm: ".875vw",
      tiny: ".875vw",
      base: "1vw",
      lg: "1.125vw",
      xl: "1.25vw",
      "2xl": "1.5vw",
      "3xl": "1.875vw",
      "4xl": "2.25vw",
      "5xl": "3vw",
      "6xl": "4vw",
      "7xl": "5vw",
      "8xl": "6vw",
      "9xl": "7vw",
      "10xl": "8vw",
    },
    extend: {
      height: {
        128: "45vw",
        100: "30vw",
      },
      width: {
        128: "44vw",
      },
      colors: {
        gold: "#9b7e54",
        "gold-light": "#ab9a81",
        "btn-white": "#e4e4e0",
        "undeliner-gray": "#b5b6b6",
        "btn-gray": "#7c7d80",
        "gray-dark": "#646567",
        "info-white": "#ece9e7",
      },
    },
  },
  plugins: [],
};
