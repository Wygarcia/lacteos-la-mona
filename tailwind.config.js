/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        leche: "#fffaf0",       // color de fondo suave
        primario: "#f97316",    // naranja suave
        acento: "#16a34a",      // verde pasto
        vaca: "#4b5563"         // gris oscuro
      },
      fontFamily: {
        titulo: ["'Fredoka'", "cursive"], // Corregido: era 'Fredoka One'
        cuerpo: ["'Segoe UI'", "sans-serif"]
      },
      animation: {
        rebote: "bounce 1s infinite",
        fade: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
    },
  },
  plugins: [],
}
