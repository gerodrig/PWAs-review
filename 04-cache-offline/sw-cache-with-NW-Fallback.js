//Variagles
// const CACHE_NAME = 'cache-1';

const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_IMMUTABLE_NAME = 'immutable-v1';

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

  //? 2. CACHE WITH NETWORK FALLBACK this strategy is used when the app wants to use the cache to fetch resources, but if the resource is not in the cache, the app will fetch the resource from the network. This strategy is recommended because it can display the app's basic UI even when the user is offline.

  const response = caches.match(event.request).then((res) => {
    //if the resource is in the cache, return it
    if (res) return res;
    //if the resource is not in the cache, fetch it from the network
    
    // console.log('Fetch from network', event.request.url);
    return fetch(event.request).then((newRes) => {
      caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
        cache.put(event.request, newRes);
        cleanCache(CACHE_DYNAMIC_NAME, 50);
      });
      return newRes.clone();
    });
  });

  event.respondWith(response);
});
