//Variagles
const CACHE_NAME = 'cache-1';

//Save app shell files to cache

// App shell files are files that are required to display the app's basic UI. These files are usually static and don't change often. The app shell files are cached so that the app can be displayed even when the user is offline.

self.addEventListener('install', (event) => {
  const cachePromise = caches.open( CACHE_NAME  ).then((cache) => {
    cache.addAll([
      '/',
      '/index.html',
      '/css/style.css',
      '/img/main.jpg',
      'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
      '/js/app.js',
    ]);
  });
  event.waitUntil(cachePromise);
});

//cache strategy: cache with network fallback

self.addEventListener('fetch', (event) => {
  //?1.CACHE ONLY cache only strategy refers to the case where the app only uses the cache to fetch resources. If the resource is not in the cache, the app will not be able to display the resource. This strategy is not recommended because it can lead to a bad user experience.

  // event.respondWith(caches.match(event.request));

  //? 2. CACHE WITH NETWORK FALLBACK this strategy is used when the app wants to use the cache to fetch resources, but if the resource is not in the cache, the app will fetch the resource from the network. This strategy is recommended because it can display the app's basic UI even when the user is offline.

  const response = caches.match(event.request).then((res) => {
    //if the resource is in the cache, return it
    if (res) return res;
    //if the resource is not in the cache, fetch it from the network
    console.log('Fetch from network', event.request.url);
    return fetch(event.request).then((newRes) => {
      caches.open(CACHE_NAME ).then((cache) => {
        cache.put(event.request, newRes);
      });
      return newRes.clone();
    });
  });

  event.respondWith(response);
});
