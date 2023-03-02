//detect when there is no internet connection or when the user is offline
self.addEventListener('fetch', (event) => {
  //   const offlineResponse = new Response(`
  //     <h1>Welcome to my PWA weboage</h1>

  //     <p>Sorry, you are offline</p>
  //     <p>But you can still see the content</p>
  // `);

//   const offlineResponse = new Response(
//     `
// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>My PWA</title>

//   </head>
//   <body class="container p-3">
//   <h1>Offline mode</h1>
//   </body>
// </html>

//   `,
//     {
//       headers: {
//         'Content-Type': 'text/html',
//       },
//     }
//   );

const offlineResponse = fetch('pages/offline.html');

  const response = fetch(event.request).catch(() => offlineResponse);

  event.respondWith(response);
});
