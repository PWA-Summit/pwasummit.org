const { defineConfig } = require('vite');
const { eleventyPlugin } = require('vite-plugin-eleventy');
const { VitePWA: pwa } = require('vite-plugin-pwa');

module.exports = defineConfig({
  root: 'src',
  clearScreen: false,
  server: {
    open: true,
  },
  build: {
    outDir: '../public',
    emptyDir: true,
  },
  plugins: [
    eleventyPlugin(),
    pwa({
      strategies: 'injectManifest',
      srcDir: '',
      filename: 'sw.js',
      manifest: {
        name: 'PWA Summit',
        background_color: '#108484',
        theme_color: '#108484',
        display: 'minimal-ui',
        icons: [
          {
            src: '/images/icons/maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/images/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
