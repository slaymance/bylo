import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        background_color: 'white',
        icons: [
          {
            src: '/bylo-mobile.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/bylo-mobile.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      registerType: 'autoUpdate',
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
