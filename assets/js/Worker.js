const static2HAAS = "2HAAS-v1"
const assets = [
  "/",
  "/index.html",
  "assets/css/main.css",
  "assets/js/app.js",
  "assets/img/off.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(static2HAAS).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
