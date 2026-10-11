import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base keeps the build portable: it works at a domain root (Vercel)
// and from any sub-folder.
export default defineConfig({
  base: './',
  plugins: [react()],
});
