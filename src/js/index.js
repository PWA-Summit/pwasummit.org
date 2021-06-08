import { registerSW } from 'virtual:pwa-register';

registerSW();

if (import.meta.hot) {
  import.meta.hot.on('eleventy-update', () => {});
}
