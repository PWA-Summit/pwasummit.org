const cache = require('@11ty/eleventy-cache-assets');

// Get Sessionize data for use throughout the site
module.exports = async function () {
  // Speaker data
  const speakers = await cache('https://sessionize.com/api/v2/enu18kuh/view/Speakers', {
    duration: '1d',
    type: 'json',
  });

  const sessions = await cache('https://sessionize.com/api/v2/enu18kuh/view/Sessions', {
    duration: '1d',
    type: 'json',
  });

  console.log(sessions[0].groupName);

  // Event schedule
  const schedule = (
    await cache('https://sessionize.com/api/v2/enu18kuh/view/GridSmart', {
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
    sessions: sessions[0].sessions.filter((s) => !exclude.includes(s.title.toLowerCase())),
  };
};
