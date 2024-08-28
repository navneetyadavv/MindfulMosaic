import { createThemes } from "tw-colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: "12px",
      base: "14px",
      xl: "16px",
      "2xl": "20px",
      "3xl": "28px",
      "4xl": "38px",
      "5xl": "50px",
    },

    extend: {
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        gelasio: ["'Gelasio'", "serif"],
      },
      boxShadow: {
        custom: "1px 2px 30px -11px rgba(76, 159, 227)",
      },
      scale: {
        102: "1.02",
      },
      height: {
        '128': '32rem',
      }
    },
  },
  plugins: [
    createThemes({
      light: {
        white: "#FFFFFF",
        black: "#010409",
        grey: "#F3F3F3",
        "dark-grey": "#6B6B6B",
        red: "#FF4E4E",
        transparent: "transparent",
        twitter: "#1DA1F2",
        purple: "rgba(76, 159, 227)",
        lightGrey: "#D0D7DE",
        blue: "#4493F8",
        darkBlue: "#316A99",

      },
      dark: {
        white: "#010409",
        black: "#F3F3F3",
        grey: "#2A2A2A",
        "dark-grey": "#E7E7E7",
        red: "#991F1F",
        transparent: "transparent",
        twitter: "#0E71A8",
        purple: "rgba(49, 106, 153)",
        "black-blue": "#0d1117",
        darkGrey: "#30363D",
        blue: "#4493F8",
        darkBlue: "#316A99",

      },
    }),
  ],
};
