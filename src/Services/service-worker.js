var cacheName = 'APT-v1';
var appShellFiles = [
  '/',
  '/index.html',
  '/bundle.js',
  '/favicon.ico',
  '/assets/fonts/berlin.fnt',
  '/assets/fonts/berlin.png',
  '/assets/sfx/Italian_Mom.mp3',
  '/assets/sfx/Italian_Mom.ogg',
  '/assets/sfx/select_001.mp3',
  '/assets/sfx/select_001.ogg',
  '/assets/icons/icon-32.png',
  '/assets/icons/icon-64.png',
  '/assets/icons/icon-96.png',
  '/assets/icons/icon-128.png',
  '/assets/icons/icon-168.png',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-256.png',
  '/assets/icons/icon-512.png',
  '/assets/background/background.png',
  '/assets/background/pattern.png',  
  '/assets/game/particle.png',  
  '/assets/game/clickme.png',
  '/assets/ui/adr-enaline_Logo.png',
  '/assets/ui/button-back.png',
  '/assets/ui/button-continue.png',
  '/assets/ui/button-credits.png',
  '/assets/ui/button-mainmenu.png',
  '/assets/ui/button-music-off.png',
  '/assets/ui/button-music-on.png',
  '/assets/ui/button-pause.png',
  '/assets/ui/button-restart.png',  
  '/assets/ui/button-settings.png',
  '/assets/ui/button-sound-off.png',
  '/assets/ui/button-sound-on.png',
  '/assets/ui/button-start.png',
  '/assets/ui/banner-coin.png',
  '/assets/ui/loader.png',
  '/assets/ui/loading-background.png',
  '/assets/ui/logo_adr-enaline_vintage.png',
  '/assets/ui/overlay.png',
  '/assets/ui/title.png',
  '/assets/fork.png'  
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});