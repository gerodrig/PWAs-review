//imports
importScripts('js/libs/sw-utils.js');

//Define cache names

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

//Define app shell. This is the minimum set of files that the app needs to work
const APP_SHELL = [
  // '/', //root only in localhost
  'index.html',
  'css/style.css',
  'img/favicon.ico',
  'img/avatars/hulk.jpg',
  'img/avatars/ironman.jpg',
  'img/avatars/spiderman.jpg',
  'img/avatars/thor.jpg',
  'img/avatars/wolverine.jpg',
  'js/app.js',
];

const APP_SHELL_INMUTABLE = [
  //add here the files that are not going to change
  'https://fonts.googleapis.com/css?family=Quicksand:300,400',
  'https://fonts.googleapis.com/css?family=Lato:400,300',
  'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
  'css/animate.css',
  'js/libs/jquery.js',
];

//Install service worker and cache app shell
self.addEventListener('install', (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  const cacheInmutable = caches
    .open(INMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

//Activate service worker and delete old caches
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
  let response;
  if (e.request.url.includes('/api')) {
    //return response
    response = handleApiMessages(DYNAMIC_CACHE, e.request);
  } else {
    response = caches.match(e.request).then((res) => {
      if (res) {
        updateStaticCache(STATIC_CACHE, e.request, APP_SHELL_INMUTABLE);
        return res;
      }

      //NETWORK FALLBACK
      // console.log(e.request.url);
      return fetch(e.request).then((newRes) => {
        return updateDynamicCache(DYNAMIC_CACHE, e.request, newRes);
      });
    });
  }

  e.respondWith(response);
});

//Network with cache fallback /update
async function handleApiMessages(dynamicCache, req) {
  try {
    const response = await fetch(req);

    if (response.ok) {
      updateDynamicCache(dynamicCache, req, response.clone());

      return response.clone();
    }

    return caches.match(req);
  } catch (error) {
    return caches.match(req);
  }
}
