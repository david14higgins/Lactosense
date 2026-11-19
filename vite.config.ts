import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Set VITE_BASE when serving from a sub-path (e.g. GitHub Pages project site).
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
})
