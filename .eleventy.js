const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const markdown = require('./lib/markdown');

module.exports = function (eleventy) {
  eleventy.addPlugin(eleventyNavigationPlugin);
  eleventy.setLibrary('md', markdown);

  return {
    dir: {
      input: 'pages',
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
