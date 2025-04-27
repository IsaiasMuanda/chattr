import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", // Tema claro
      "dark",  // Tema escuro
      "cupcake", // Exemplo de tema extra do DaisyUI
    ],
  },
};
