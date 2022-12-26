/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      },
      screens: {
        sm: "375px",
        md: "835px",
        lg: "1260px",
        xl: "1900px",
      },
    },
  },
  plugins: [],
};
