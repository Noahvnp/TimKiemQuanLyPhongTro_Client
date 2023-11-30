/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
      },
      backgroundColor: {
        // primary: "#F5F5F5",c
        primary: "#eff6ff",
        // secondary1: "#1266dd",c
        // secondary1: "#083344",
        secondary1: "#0369a1",
        secondary2: "#f73859",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-70": "rgba(0,0,0,0.7)",
      },
      maxWidth: {
        600: "600px",
        1100: "1100px",
      },
      minWidth: {
        400: "400px",
        200: "200px",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
    },
  },
  plugins: [],
};
