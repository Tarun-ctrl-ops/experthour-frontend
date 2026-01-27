/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linkedin: {
          DEFAULT: "#0A66C2",
          dark: "#004182",
          light: "#E8F3FF",
        },
        surface: "#F3F6F8",
      },
      maxWidth: {
        app: "1200px",
      },
    },
  },
  plugins: [],
};



