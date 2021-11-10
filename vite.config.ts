import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: 'mockServiceWorker.js',
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [{ find: '@/', replacement: '/src/' }],
  },
})
