const cache = require('@11ty/eleventy-cache-assets');

// Get Sessionize data for use throughout the site
module.exports = async function () {
  // Speaker data
  const { speakers, sessions } = await cache('https://sessionize.com/api/v2/8y9131l1/view/All', {
    duration: '1d',
    type: 'json',
  });

  // Event schedule
  const schedule = (
    await cache('https://sessionize.com/api/v2/8y9131l1/view/GridSmart', {
      duration: '1d',
      type: 'json',
    })
  ).map((day) => {
    // Sessionize doesn't include timezone information, so we need to add it. All are PDT
    day.date = day.date.replace('T00:00:00Z', 'T07:00:00Z');
    return day;
  });

  const exclude = ['welcome', 'closing remarks', 'q&a', 'break'];

  return {
    speakers,
    schedule,
    // Filter out breaks and Q&A
    sessions: sessions.filter((s) => !exclude.includes(s.title.toLowerCase())),
  };
};
