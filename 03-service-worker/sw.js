//Service Worker life cycle

//install
self.addEventListener('install', (event) => {
  //Download the assets
  //Create the cache
  console.log('Installing Service Worker');

  const installation = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('SW: Installation complete');
      self.skipWaiting();
      resolve();
    }, 3000);
  });

  event.waitUntil(installation);

  //avoid skip waiting this is not recommended
});

//When service worker is activated and takes control of the page

self.addEventListener('activate', (event) => {
  //Delete the old cache
  console.log('SW: Active and ready to control the page');
});

//handle of HTTP requests
self.addEventListener('fetch', (event) => {
  //execute caching strategy
//   console.log('SW: Fetching something...', event.request.url);

//   if (event.request.url.includes('https://reqres.in/')) {
//     const resp = new Response(
//       `{ok: false, message: 'Benito is messing with you!'}`
//     );
//     event.respondWith(resp);
//   }
});

//SYNC Event (background sync) when the user is offline and the user is online again
self.addEventListener('sync', (event) => {
    console.log('We have a connection');
    console.log(event);
    console.log(event.tag);
    
});

// PUSH: Handles push notifications
self.addEventListener('push', (event) => {
    console.log('Push notification received');
    });