import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Required for GitHub Pages
  base: "/hospital-appointment-website/",

  server: {
    allowedHosts: true,
  },
});