import { get, set } from 'idb-keyval';

/**
 * Makes timezones awesome
 */
export class TimezoneChanger {
  /**
   * @param {DOMElement} changer - The timezone changer element.
   */
  constructor(changer) {
    this.changer = changer;
    this.times = Array.from(document.querySelectorAll('[data-time]')).map((el) => ({
      el,
      date: new Date(el.dataset.time),
      format: JSON.parse(el.dataset.format),
    }));
    this.dates = Array.from(document.querySelectorAll('[data-date]')).map((el) => ({
      el,
      date: new Date(el.dataset.date),
      format: JSON.parse(el.dataset.format),
    }));

    if (changer) {
      changer.addEventListener('change', this.changeTZ.bind(this));
    }

    this.init();
  }

  /**
   * Gets the user's stored timezone
   */
  async init() {
    const offset = new Date().getTimezoneOffset();
    const local = `Local (GMT${offset > 0 ? '+' : '-'}${Math.floor(offset / 60)
      .toString()
      .padStart(2, 0)}:${Math.floor(offset % 60)
      .toString()
      .padStart(2, 0)})`;

    const tz = await get('timezone');

    // If there's a changer, set the local timezone
    if (this.changer) {
      for (const opt of this.changer.options) {
        if (opt.value === 'local') {
          opt.textContent = local;
        }
        if (opt.value === tz) {
          opt.selected = true;
        }
      }
    }

    if (tz) {
      this.updateForTimezone(tz);
    } else {
      this.updateForTimezone();
    }
  }

  /**
   * @param {string} timeZone - The timezone to update to.
   * @return {void}
   */
  updateForTimezone(timeZone) {
    for (const t of this.times) {
      t.el.textContent = t.date.toLocaleTimeString('en-US', Object.assign(t.format, { timeZone }));
    }
    for (const d of this.dates) {
      d.el.textContent = d.date.toLocaleDateString('en-US', Object.assign(d.format, { timeZone }));
    }
  }

  /**
   * @param {Event} e - The change event.
   */
  changeTZ(e) {
    e.preventDefault();
    const { value } = e.target;

    if (value === 'local') {
      this.updateForTimezone();
    } else {
      this.updateForTimezone(value);
    }

    set('timezone', value);
  }
}
