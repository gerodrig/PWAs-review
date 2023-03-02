if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}

// if (window.caches) {
//   caches.open('test-1');
//   caches.open('test-2');

//   // caches.has('test-1').then(console.log);

//   // caches.delete('test-1').then(console.log);

//   caches.open('cache-v1.1').then((cache) => {
//     cache.add('/index.html');

//     cache
//       .addAll(['/index.html', '/css/style.css', '/img/main.jpg'])
//       .then(() => {
//         // cache.delete('/css/style.css');
//         cache.put('/index.html', new Response('Hello world'));
//       });

//     // cache.match('/index.html').then(response => {
//     //   response.text().then(console.log);
//     // });
//   });

//   caches.keys().then((keys) => {
//     console.log(keys);
//   });
// }
