import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from "vite-plugin-fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fs()],
  server: {
    port: 6970
  },
  optimizeDeps: {
    include: ["@codemirror/state","@codemirror/language", "@codemirror/view"],
  },
})
