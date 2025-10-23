import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import headfireVite from './plugins/vite-plugin-headfire'

export default defineConfig({
  plugins: [react(), headfireVite()],
  server: {
    port: 5174,
    open: true
  }
})
