/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-sarif"],
        quicksand: ["Quicksand", "sans-sarif"],
        barlow: ["Barlow", "sans-sarif"],
        teachers: ["Teachers", "sans-sarif"],
        poppins: ["Poppins", "sans-sarif"],
      },
    },
  },
  plugins: [],
};
