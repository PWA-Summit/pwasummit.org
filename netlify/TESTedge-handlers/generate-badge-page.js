/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
export function onRequest(event) {
  const url = new URL(event.requestMeta.url);
  const ticketId = url.searchParams.toString();

  const ticketId2 = event.requestMeta.url.search.substring(1);

  const html = `<!DOCTYPE html>
<html lang="en" style="height: 100%;">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>I'm attending PWA Summit, October 6-7</title>
    <link rel="icon" type="image/svg+xml" href="/assets/logo.svg" />
    <meta property="og:title" content="Join me at a free online PWA Summit, October 6-7" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://pwasummit.org/" />
    <meta property="og:image" content="https://res.cloudinary.com/pwasummit/image/upload/pwasummit/2021/${ticketId}.png" />
    <meta
      property="og:description"
      content="This is a digital badge confirming my participation in PWA Summit 2021 - a free, online, single-track conference focused on helping everyone succeed with Progressive Web Apps. Get your ticket here ->"
    />
    <script src='https://js.tito.io/v2' async></script>
  </head>
  <body style="background-color: #ffffff; background-image: url(https://res.cloudinary.com/pwasummit/image/upload/pwasummit/2021/${ticketId2}.png); background-position: center top; background-repeat: no-repeat; background-size: contain;height: 100%;">

  <div style="position: absolute; bottom: 20px; text-align: center">
    <tito-widget event="pwasummit/2021" releases="free-conference-ticket-october-7"
      >Get your free ticket</tito-widget
    >
    <noscript>
      <a href="https://ti.to/pwasummit/2021/preview">Get your free ticket</a>
    </noscript>
  </div>
    
  </body>
</html>`;
  event.replaceResponse(new Response(html));
}
