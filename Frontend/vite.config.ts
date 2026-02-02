import { defineConfig } from 'npm:vite'
import react from 'npm:@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname || '.', "./src"),
    },
  },
})
