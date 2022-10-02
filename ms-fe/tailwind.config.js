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
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "7rem",
      "10xl": "8rem",
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
