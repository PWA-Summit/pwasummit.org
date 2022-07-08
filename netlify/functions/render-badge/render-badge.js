const handler = async (event) => {
  /**
   * Renders image in Cloudinary
   * @param {object} providerInstance Cloudinary instance
   * @param {string} baseImagePath Background image path
   * @param {object} overlayConfig Overlay configuration
   * @return {string} Generated image url
   */
  function uploadImage(providerInstance, baseImagePath, overlayConfig) {
    return new Promise((resolve, reject) => {
      providerInstance.uploader.upload(baseImagePath, overlayConfig, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  }

  try {
    if (!event.body) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'No request data sent',
        }),
      };
    }

    const cloudinary = require('cloudinary').v2;

    const body = JSON.parse(event.body);

    const ticketId = body.reference || 'TEST-1';
    const firstName = body.first_name || 'Firstname';
    const lastName = body.last_name || 'Lastname';

    let ticketType = 'Attendee';

    switch (body.release_title) {
      case 'Speaker ticket':
        ticketType = 'Speaker';
        break;
      case 'Organizer ticket':
        ticketType = 'Organizer';
        break;
      case 'Getting Started with Progressive Web Apps Workshop, October 5':
        ticketType = 'Trainee';
        break;
    }

    const eventName = 'pwasummit';
    const eventYear = '2022';
    const baseImagePath = 'netlify/functions/render-badge/assets/badge-bg.png';

    if (!process.env.NETLIFY) require('dotenv').config();

    cloudinary.config({
      cloud_name: eventName,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const overlayConfig = {
      folder: `${eventName}/${eventYear}`,
      unique_filename: false,
      filename_override: ticketId,
      public_id: ticketId,
      overwrite: true,
      access_mode: 'public',
      invalidate: true,
      tags: [eventName, eventYear, [firstName, lastName].join(' '), ticketId, ticketType],
      transformation: [
        { width: 1200 },
        {
          color: '#FFFFFF',
          overlay: {
            font_family: 'Work Sans',
            font_size: firstName.length > 11 || lastName.length > 11 ? 63 : 73,
            font_weight: 'medium',
            text: [firstName, lastName].join('%0A').toUpperCase(),
            text_align: 'center',
          },
          width: 650,
          crop: 'fit',
        },
        { flags: 'layer_apply', gravity: 'north', y: 0.47 },
        {
          color: '#FFFFFF',
          overlay: {
            font_family: 'Work Sans',
            font_size: 50,
            font_weight: 'regular',
            text: ticketType,
            text_align: 'center',
          },
        },
        { flags: 'relative', width: '0.3', crop: 'limit' },
        { flags: 'layer_apply', gravity: 'north', y: 0.63 },
      ],
    };

    const result = await uploadImage(cloudinary, baseImagePath, overlayConfig);

    return {
      statusCode: 200,
      body: result.secure_url,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.toString(),
      }),
    };
  }
};

module.exports = { handler };
