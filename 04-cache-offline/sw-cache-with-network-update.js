//Variagles
// const CACHE_NAME = 'cache-1';

const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_IMMUTABLE_NAME = 'immutable-v1';
const CACHE_DYNAMIC_LIMIT = 50;

function cleanCache(cacheName, maxItems) {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(cleanCache(cacheName, maxItems));
      }
    });
  });
}
//Save app shell files to cache

// App shell files are files that are required to display the app's basic UI. These files are usually static and don't change often. The app shell files are cached so that the app can be displayed even when the user is offline.

self.addEventListener('install', (event) => {
  const cachePromise = caches.open(CACHE_STATIC_NAME).then((cache) => {
    cache.addAll([
      '/',
      '/index.html',
      '/css/style.css',
      '/img/main.jpg',
      '/js/app.js',
    ]);
  });

  const cacheImmutablePromise = caches
    .open(CACHE_IMMUTABLE_NAME)
    .then((cache) =>
      cache.add(
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
      )
    );
  event.waitUntil(Promise.all([cachePromise, cacheImmutablePromise]));
});

//cache strategy: cache with network fallback

self.addEventListener('fetch', (event) => {

  //? 3 - Network with cache fallback
  // This strategy is used when the app wants to fetch resources from the network, but if the network is not available, the app will fetch the resource from the cache. This strategy is recommended because it can display the app's basic UI even when the user is offline.
  const response = fetch(event.request).then((res) => {
    
    //if the resource is not in the cache, fetch it from the network
    if (!res) return caches.match(event.request);
    console.log('Fetch', res);
    caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
      cache.put(event.request, res);
      cleanCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
    });


    return res.clone();
  }).catch((err) => {
    console.log('Fetch error', err);
    return caches.match(event.request);
  });

  event.respondWith(response);
});
