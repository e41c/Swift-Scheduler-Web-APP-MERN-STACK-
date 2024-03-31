// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Define environment variables
  define: {
    'process.env': {
      VITE_PROD_BASE_URL: JSON.stringify('https://capstone-ii-group26.onrender.com'),
      REACT_APP_BACKEND_URL: JSON.stringify(process.env.REACT_APP_BACKEND_URL || 'https://capstone-ii-group26.onrender.com')
    },
  },

  server: {
    proxy: {
      // Proxy requests to '/auth' and '/api' to the backend server
      '/auth': {
        target: 'http://localhost:3000', // Local backend URL
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:3000', // Local backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove the '/api' prefix before forwarding
      },
    },
  },
});
