import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import postcss from './postcss.config.js'
export default defineConfig({
  plugins: [react()],
  css:{
    postcss

  }
})
