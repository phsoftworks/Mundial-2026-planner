const CACHE_NAME = "wc2026-pro-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

//////////////////////////////
// FUTURO PUSH READY
//////////////////////////////

self.addEventListener("push", event => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "WC2026", {
    body: data.body || "Nuevo partido hoy",
    icon: "/icon-192.png"
  });
});
