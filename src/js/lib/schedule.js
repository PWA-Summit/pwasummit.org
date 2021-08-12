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

    // Add event listener to determine if speakers should be shown
    window
      .matchMedia('(max-width: 467px)')
      .addEventListener('change', this.toggleSpeakers.bind(this));

    this.toggleSpeakers();
  }

  /**
   * Toggles speaker visiblity
   */
  toggleSpeakers() {
    const width = window.innerWidth;
    console.log(this.days);

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
}
