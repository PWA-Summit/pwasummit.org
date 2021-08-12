import { registerSW } from 'virtual:pwa-register';

registerSW();

window.addEventListener('DOMContentLoaded', async () => {
  const tz = document.getElementById('timezone');
  if (tz) {
    const { TimezoneChanger } = await import('./lib/timezones.js');
    new TimezoneChanger(tz);
  }

  const schedule = document.querySelector('table.schedule');
  if (schedule) {
    const { Schedule } = await import('./lib/schedule.js');
    new Schedule(schedule);
  }
});
