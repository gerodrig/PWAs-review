// imports

//import pouchdb in the service worker because it is not a module and it is not possible to import it in the main.js file
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js');

importScripts('js/sw-db.js');
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
  '/',
  'index.html',
  'css/style.css',
  'img/favicon.ico',
  'img/avatars/hulk.jpg',
  'img/avatars/ironman.jpg',
  'img/avatars/spiderman.jpg',
  'img/avatars/thor.jpg',
  'img/avatars/wolverine.jpg',
  'img/avatars/Mimi.jpg',
  'img/avatars/Benito.jpg',
  'js/app.js',
  'js/camera-class.js',
  'js/sw-utils.js',
  'js/libs/plugins/mdtoast.min.js',
  'js/libs/plugins/mdtoast.min.css',
];

const APP_SHELL_INMUTABLE = [
  'https://fonts.googleapis.com/css?family=Quicksand:300,400',
  'https://fonts.googleapis.com/css?family=Lato:400,300',
  'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js',
];

self.addEventListener('install', (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  const cacheInmutable = caches
    .open(INMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener('activate', (e) => {
  const response = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== STATIC_CACHE && key.includes('static')) {
        return caches.delete(key);
      }

      if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
        return caches.delete(key);
      }
    });
  });

  e.waitUntil(response);
});

self.addEventListener('fetch', (e) => {
  let response;

  if (e.request.url.includes('/api')) {
    // return response????
    response = apiMessages(DYNAMIC_CACHE, e.request);
  } else {
    response = caches.match(e.request).then((res) => {
      if (res) {
        updateStaticCache(STATIC_CACHE, e.request, APP_SHELL_INMUTABLE);
        return res;
      } else {
        return fetch(e.request).then((newRes) => {
          return updateDynamicCache(DYNAMIC_CACHE, e.request, newRes);
        });
      }
    });
  }

  e.respondWith(response);
});

// Async tasks to post message as soon as the connection is available
self.addEventListener('sync', (e) => {
  console.log('SW: Sync');

  if (e.tag === 'new-post') {
    // post to DB when there is connection
    const response = postMessages();

    e.waitUntil(response);
  }
});

//Listen to pushs
self.addEventListener('push', (e) => {
  //   console.log(e);

  const data = JSON.parse(e.data.text());

  const title = data.title;
  const options = {
    body: data.body,
    // icon: 'img/icons/icon-72x72.png',
    icon: `img/avatars/${data.user}.jpg`,
    badge: 'img/favicon.ico',
    image:
      'https://animals.sandiegozoo.org/sites/default/files/2019-04/chinchilla-straw.jpg',
    //mario bros vibration
    vibrate: [125, 75, 125, 75, 125, 75, 125, 75, 125],
    openUrl: '/',
    data: {
      //   url: 'https://google.com',
      url: '/',
      id: data.user,
    },
    actions: [
      { action: 'thor-action', title: 'Thor', icon: 'img/avatars/thor.jpg' },
      {
        action: 'ironman-action',
        title: 'Ironman',
        icon: 'img/avatars/ironman.jpg',
      },
    ],
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclose', (e) => {
  console.log('Notification closed', e);
});

self.addEventListener('notificationclick', (e) => {
  const notification = e.notification;

  const action = e.action;

  console.log({ notification, action });

  const reponse = clients.matchAll().then((clients) => {
    let client = clients.find(c => c.visibilityState === 'visible');

    if (client !== undefined) {
        client.navigate(notification.data.url);
        client.focus();
        } else {
        clients.openWindow(notification.data.url);
    }
    return notification.close();
  });

  e.waitUntil(reponse);
});
