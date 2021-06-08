import { offlineFallback, pageCache, staticResourceCache, imageCache } from 'workbox-recipes';
import { setDefaultHandler } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

const precache = self.__WB_MANIFEST;

setDefaultHandler(new NetworkOnly());

const html = precache.filter((f) => f.url.endsWith('.html')).map((f) => f.url);
const resources = precache
  .filter((f) => f.url.endsWith('.css') || f.url.endsWith('.js'))
  .map((f) => f.url);
const images = precache
  .filter((f) => f.url.endsWith('.svg') || f.url.endsWith('.png') || f.url.endsWith('.jpg'))
  .map((f) => f.url);

pageCache({
  warmCache: html,
});

staticResourceCache({
  warmCache: resources,
});

imageCache({
  warmCache: images,
});

offlineFallback({
  pageFallback: '/offline.html',
});
