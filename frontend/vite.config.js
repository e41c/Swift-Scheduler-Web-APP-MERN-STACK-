import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Define environment variables
  define: {
    'process.env': {},
  },

  server: {
    proxy: {
      // Proxy requests to '/auth' and '/api' to the backend server
      '/auth': {
        target: 'https://capstone-ii-group26.onrender.com', // Local backend URL
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'https://capstone-ii-group26.onrender.com', // Local backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove the '/api' prefix before forwarding
      },
    },
  },

  // Define build-time environment variables
  define: {
    'process.env.REACT_APP_BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL || 'https://capstone-ii-group26.onrender.com'),
  },
});
