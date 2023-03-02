//?Cache with network fallback strategy

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

self.addEventListener('install', (event) => {
  const cachePromise = caches.open(CACHE_STATIC_NAME).then((cache) => {
    return cache.addAll([
      '/',
      '/index.html',
      '/css/style.css',
      '/img/main.jpg',
      '/js/app.js',
      '/img/no-img.jpg',
      '/pages/offline.html',
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

self.addEventListener('activate', (event) => {
    const cachePromise = caches.keys().then((keys) => {
        return Promise.all(
            keys.map((key) => {
                if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME && key !== CACHE_IMMUTABLE_NAME) {
                    return caches.delete(key);
                }
            })
        );
    });
    event.waitUntil(cachePromise);
});

self.addEventListener('fetch', (event) => {
  //Cache with network fallback strategy
  const responsePromise = caches.match(event.request).then((res) => {
    if (res) return res;
    console.log('Not found in cache', event.request.url);

    return fetch(event.request,{cache: "no-store"} )
      .then((newRes) => {
        caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
            console.log(cache);
          cache.put(event.request, newRes);
          cleanCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
        });
        return newRes.clone();
      })
      .catch((err) => {
        if(event.request.headers.get('accept').includes('text/html')){
            return caches.match('/pages/offline.html');
        }
        });
    });
  event.respondWith(responsePromise);
});
