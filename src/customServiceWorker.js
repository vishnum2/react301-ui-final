self.addEventListener("install", event=>event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event=>
event.waitUntil(self.clients.claim())
);
console.log('Hello service worker started');

workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.precaching.precacheAndRoute([
    'https://yoyo-gift-301-api.herokuapp.com/giftCards'
])

//appshell
workbox.routing.registerRoute("/", workbox.strategies.networkFirst())