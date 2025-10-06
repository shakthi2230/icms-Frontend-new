import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // allow external traffic
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173, // use Cloud Run PORT
    strictPort: true,
    allowedHosts: [
      '.run.app', // allow Cloud Run hostnames
      'localhost'
    ]
  }
})
