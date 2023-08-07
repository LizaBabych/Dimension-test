/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        718: "718px",
        106: "106px",
        input: "calc(100% - 24px)",
      },
      height: {
        271: "271px",
      },
      boxShadow: {
        "grey-shadow": "2px 2px 30px 10px rgba(0, 0, 0, 0.2)",
        blue: "0px 3px 0px 0px #3F2ABD",
      },
      borderRadius: {
        10: "10px",
      },
      backgroundColor: {
        lightGrey: "rgba(245, 245, 245, 0.50);",
        lightBlue: "#533BE5",
        darkWhite: "rgba(255, 255, 255, 0.20)",
      },
      textColor: {
        darkCommonGrey: "#6C6F75",
        commonGrey: "#94989E",
      },
      letterSpacing: {
        2: "0.2px",
      },
    },
  },
  plugins: [],
};
