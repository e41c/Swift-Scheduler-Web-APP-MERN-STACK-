import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import postcss from './postcss.config.js'
export default defineConfig({
  plugins: [react()],

  css:{
    postcss

  },
  server:{
    proxy:{
      '/auth': {
        // target: 'http://localhost:3000',
        target: 'https://capstone-ii-group26-1.onrender.com',
        changeOrigin: true,
        secure: false,
    },
    '/api': {
      // target: 'http://localhost:3000',
      target: 'https://capstone-ii-group26-1.onrender.com',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, '') // remove the /api prefix before forwarding
    },

    }
  }
})
