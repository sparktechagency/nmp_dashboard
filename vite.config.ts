import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { visualizer } from "rollup-plugin-visualizer";
 
 
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ],
  server: {
    host: '0.0.0.0'    
  },
  preview: {
    allowedHosts: ['13.61.205.202'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
         react: ["react", "react-dom", "react-router-dom"],
          jodit: ["jodit-react", "jodit"],
          pdf: ["jspdf", "jspdf-autotable"],
          html2canvas: ["html2canvas"]
        },
      },
    },
  },
})