import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'thankslyh'
  },
  resolve: {
    alias: {
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@api": resolve(__dirname, "./src/api"),
      "@router": resolve(__dirname, "./src/router"),
      "@views": resolve(__dirname, "./src/views"),
      "@utils": resolve(__dirname, "./src/utils")
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4396'
      }
    }
  }
})
