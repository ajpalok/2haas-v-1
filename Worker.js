---
---

const static2HAAS = '2HAAS-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/page-2/',
  '/page-3/',
  '/search/',
  '/categories/',
  '/contact/',
  '/contact/message-sent/',
  '/staff/',
  '{{site.baseurl | prepend: site.url}}/assets/css/main.css',
  '{{site.baseurl | prepend: site.url}}/assets/img/off.jpg',
  '{{site.baseurl | prepend: site.url}}/assets/img/404.gif',
  '{{site.baseurl | prepend: site.url}}/assets/img/loading.gif',
  '{{site.baseurl | prepend: site.url}}/assets/img/contact.jpg',
  '{{site.baseurl | prepend: site.url}}/assets/img/blog-image.png',
  '{{site.baseurl | prepend: site.url}}/assets/img/message.gif',
  '{{site.baseurl | prepend: site.url}}/assets/js/search-script.js'
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
