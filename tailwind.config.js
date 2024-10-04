/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  ],

  theme: {
    extend: {
      colors: {
        bgsecondary: "#e1dada",
        primary: "#e12727",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pextralight: ["PlusJakartaSans-ExtraLight", "sans-serif"],
        plight: ["PlusJakartaSans-Light", "sans-serif"],
        pregular: ["PlusJakartaSans-Regular", "sans-serif"],
        pmedium: ["PlusJakartaSans-Medium", "sans-serif"],
        pmediumitalic: ["PlusJakartaSans-MediumItalic", "sans-serif"],
        psemibold: ["PlusJakartaSans-SemiBold", "sans-serif"],
        psemibolditalic: ["PlusJakartaSans-SemiBoldItalic", "sans-serif"],
        pbold: ["PlusJakartaSans-Bold", "sans-serif"],
        pblack: ["PlusJakartaSans-ExtraBold", "sans-serif"],
        pbolditalic: ["PlusJakartaSans-BoldItalic", "sans-serif"],
        pextrabolditalic: ["PlusJakartaSans-ExtraBoldItalic", "sans-serif"],
        pextralightitalic: ["PlusJakartaSans-ExtraLightItalic", "sans-serif"],
        plightitalic: ["PlusJakartaSans-LightItalic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
