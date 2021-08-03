import { registerSW } from 'virtual:pwa-register';
import { TimezoneChanger } from './lib/timezones.js';

registerSW();

window.addEventListener('DOMContentLoaded', () => {
  const tz = document.getElementById('timezone');
  new TimezoneChanger(tz);
});
