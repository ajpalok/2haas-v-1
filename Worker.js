const static2HAAS = '2HAAS-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/page-2/',
  '/page-3/',
  '/search/',
  '/categories/',
  '/contact/',
  '/staff/',
  '/assets/css/main.css',
  '/assets/img/off.jpg',
  '/assets/img/404.gif',
  'https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@1,700&family=Galada&family=Roboto:wght@500&display=swap',
];
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(static2HAAS).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
