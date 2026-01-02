import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves from a subdirectory, so we need to set the base path
  base: process.env.NODE_ENV === 'production' ? '/Frontend-Quiz-app-with-React-and-TypeScript/' : '/',
})
