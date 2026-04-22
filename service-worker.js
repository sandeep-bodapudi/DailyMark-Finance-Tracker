<<<<<<< HEAD
const CACHE_NAME = "dailymark-v2";
=======
const CACHE_NAME = "dailymark-v1";
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42

const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/style.css",
  "/js/app.js",
  "/js/db.js",
  "/js/dashboard.js",
  "/js/tasks.js",
  "/js/money.js",
  "/js/transactions.js",
  "/js/backup.js",
  "/js/notifications.js",
<<<<<<< HEAD
  "/js/pwa.js",
=======
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
<<<<<<< HEAD
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
=======
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
<<<<<<< HEAD
    caches.match(event.request).then(response => response || fetch(event.request))
=======
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
  );
});
