import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config for React with Chakra UI support
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpg', '**/*.JPG'],
})
