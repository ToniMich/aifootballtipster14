import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // The server proxy has been removed.
  // When running 'netlify dev', the proxy rules in 'netlify.toml'
  // will be used instead. This is the recommended setup.
})
