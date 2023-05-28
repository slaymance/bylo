import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        '/src/assets/bylo.png',
        '/src/assets/bylo-mobile.png',
        '/public/bylo.ico',
      ],
      manifest: {
        icons: [
          {
            purpose: 'any',
            src: '/src/assets/bylo-mobile.png',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
      registerType: 'autoUpdate',
    }),
  ],
});
