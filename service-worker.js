importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox){
  console.log(`Workbox berhasil dimuat`);
}
else{
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
  { url:"/", revision: '1' },
  { url:"/css/materialize.min.css", revision: '1' },
  { url:"/images/podium.png", revision: '1' },
  { url:"/js/api.js", revision: '1' },
  { url:"/js/db.js", revision: '1' },
  { url:"/js/idb.js", revision: '1' },
  { url:"/js/jquery-2.1.1.min.js", revision: '1' },
  { url:"/js/materialize.min.js", revision: '1' },
  { url:"/js/nav.js", revision: '1' },
  { url:"/pages/home.html", revision: '1' },
  { url:"/pages/saved.html", revision: '1' },
  { url:"/pages/teams.html", revision: '1' },
  { url:"/index.html", revision: '1' },
  { url:"/nav.html", revision: '1' },
  { url:"/team.html", revision: '1' },
  { url:"/cek-worker.js", revision: '1' },
  { url:"/icon-192x192.png", revision: '1' },
  { url:"/icon-512x512.png", revision: '1' },
  { url:"/icon-apple.png", revision: '1' },
  { url:"/manifest.json", revision: '1' }
], {
   ignoreUrlParametersMatching: [/.*/]
});

var CACHE_NAME = "Pages Liligaan";

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: CACHE_NAME
  })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('LILIGAAN', options)
  );
});