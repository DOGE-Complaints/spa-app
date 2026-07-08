import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    // Railway (and reverse proxies) send the public Host header to vite preview.
    // Without this, production shows "Blocked request. This host is not allowed."
    // SPA public URL is NOT a VITE_* / .env var — it is assigned by Railway DNS.
    allowedHosts: ['.up.railway.app', '.railway.app', 'localhost', '127.0.0.1'],
  },
})
