/**
 * Manages schedule view
 */
export class Schedule {
  /**
   * @param {DOMElement} schedule - The schedule element.
   */
  constructor(schedule) {
    this.schedule = schedule;
    this.days = [...schedule.querySelectorAll('.schedule--day')];
    this.sessions = schedule.querySelectorAll('tr[data-starts][data-ends]');

    // Add event listener to determine if speakers should be shown
    window
      .matchMedia('(max-width: 467px)')
      .addEventListener('change', this.toggleSpeakers.bind(this));
    this.toggleSpeakers();

    // Update the schedule every 5 minutes
    setInterval(this.everyFive, 60000);
    this.trackSchedule();
  }

  /**
   * Toggles speaker visibility
   */
  toggleSpeakers() {
    const width = window.innerWidth;

    if (width <= 467) {
      for (const day of this.days) {
        day.setAttribute('colspan', 2);
      }
    } else {
      for (const day of this.days) {
        day.setAttribute('colspan', 3);
      }
    }
  }

  /**
   * Execute code every 5th minute
   */
  everyFive() {
    const date = new Date();
    if (date.getMinutes() % 5 == 0) {
      this.trackSchedule(date.getTime());
    }
  }

  /**
   * Tracks current schedule item
   * @param {Date} now - The current time
   */
  trackSchedule(now) {
    now = now || new Date().getTime();
    // Uncomment for testing:
    // now = 1633636800500;
    for (const session of this.sessions) {
      const start = this.enforceDate(session.dataset.starts);
      const end = this.enforceDate(session.dataset.ends);
      if (now >= start && now <= end) {
        session.setAttribute('aria-current', 'time');
      } else {
        session.removeAttribute('aria-current');
      }
    }
  }

  /**
   * Coerces the Dates to a consistent format
   * @param {Date} date - The date to coerce
   * @return {Number} timestamp
   */
  enforceDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.getTime();
  }
}
