//imports
importScripts('js/libs/sw-utils.js');

//Define Cache Names
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';
const INMUTABLE_CACHE = 'inmutable-cache-v1';

//define App shell
const APP_SHELL = [
  '/', //root
  'index.html',
  'style/base.css',
  'style/bg.png',
  'js/app.js',
  'js/base.js',
  'js/libs/sw-utils.js',
];

const APP_SHELL_INMUTABLE = [
  'https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js',
];

//Install Service Worker and Cache app shell
self.addEventListener('install', (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  const cacheInmutable = caches
    .open(INMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

//Activate Service Worker and Delete old caches
self.addEventListener('activate', (e) => {
  const response = caches.keys().then((keys) => {
    keys.forEach((key) => {
      //delete old static caches
      if (key !== STATIC_CACHE && key.includes('static')) {
        return caches.delete(key);
      }

      //delete old dynamic caches
      if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
        return caches.delete(key);
      }
    });
  });
  e.waitUntil(response);
});

//cache strategy: cache with network fallback
self.addEventListener('fetch', (e) => {
  const response = caches.match(e.request).then((res) => {
    if (res) return res;

    //NETWORK FALLBACK
    //console.log(e.request.url);

    return fetch(e.request).then((newRes) =>
      updateDynamicCache(DYNAMIC_CACHE, e.request, newRes)
    );
  });
  e.respondWith(response);
});
