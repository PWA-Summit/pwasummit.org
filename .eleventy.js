const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const markdown = require('./lib/markdown');
const slugify = require('slugify');

function formatDate(date, options = {}) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  if (!('timeZone' in options)) {
    options.timeZone = 'UTC';
  }

  return date.toLocaleDateString(options.locale || 'en-US', options);
}

function formatTime(date, options = {}) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return date.toLocaleTimeString(options.locale || 'en-US', options);
}

module.exports = function (eleventy) {
  eleventy.addPlugin(eleventyNavigationPlugin);
  eleventy.setLibrary('md', markdown);

  eleventy.addFilter('spanner', (text) =>
    text
      .split('')
      .map((i) => `<span>${i}</span>`)
      .join(''),
  );

  eleventy.addFilter('speakers', (session, speakers) =>
    // Sometimes the data for a session's speakers includes an ID, sometimes it's just the ID
    session.speakers.map((s) => speakers.find((s2) => s2.id === s.id || s2.id === s)),
  );

  eleventy.addFilter('date', formatDate);

  eleventy.addFilter('time', formatTime);

  eleventy.addFilter('md', (text) => markdown.render(text));

  eleventy.addFilter('slugify', (text) =>
    slugify(text, { lower: true, remove: /[_*+~.()'"!:@]/g, strict: true }),
  );

  eleventy.addShortcode(
    'date',
    (date, options = {}) =>
      `<span data-date="${date}" data-format='${JSON.stringify(options)}'>${formatDate(
        date,
        options,
      )}</span>`,
  );

  eleventy.addShortcode(
    'time',
    (date, options = {}) =>
      `<span data-time="${date}" data-format='${JSON.stringify(options)}'>${formatTime(
        date,
        options,
      )}</span>`,
  );

  eleventy.addShortcode('timezone', () => `<span data-timezone="UTC">UTC</span>`);

  return {
    dir: {
      input: 'src',
      output: 'src',
      data: '../_data',
      includes: '../templates/_includes',
      layouts: '../templates/_layouts',
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateEngineOverride: 'njk',
  };
};
