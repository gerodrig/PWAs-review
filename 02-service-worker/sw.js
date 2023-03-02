// self.addEventListener('fetch', event => {

//     if(event.request.url.includes('.jpg')){

//         console.log(event.request.url);

//         let imageRequest = fetch('img/main-upside-down.jpg');

//         event.respondWith(imageRequest);
//     }
// });

// self.addEventListener('fetch', event => {
//     if(event.request.url.includes('.css')){
//         let response = new Response(`
//             body {
//                 background-color: red !important;
//                 color: pink;
//             }
//         `, {
//             headers: {
//                 'Content-Type': 'text/css'
//             }
//         });

//         event.respondWith(response);
//     }
// });

self.addEventListener('fetch', (event) => {
  const response = fetch(event.request).then((res) => {
    return res.ok ? res : fetch('img/main.jpg');

  });
  event.respondWith(response);
});
