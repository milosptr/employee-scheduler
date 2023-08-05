import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import laravel from 'laravel-vite-plugin'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  plugins: [
    reactRefresh(),
    tailwindcss(),
    laravel({
      input: ['resources/js/index.css', 'resources/js/main.jsx'],
      refresh: true
    })
  ],
  server: {
    open: true
  }
})
