/**
 * Service Worker (sw.js) - Observatório Complexo do Lins
 * Suporte a Funcionamento Offline, Cache de Mapas e PWA Instalável no Celular
 */

const CACHE_NAME = 'lins-gis-pwa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data/lins_data.js',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap'
];

// 1. Evento Install: Pré-carrega o cache essencial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA Service Worker] Caching app shell & static assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. Evento Activate: Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[PWA Service Worker] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Evento Fetch: Estratégia Cache-First com Fallback para Rede
self.addEventListener('fetch', (event) => {
  // Ignora requisições de API em tempo real (Open-Meteo) para permitir dados novos quando online
  if (event.request.url.includes('api.open-meteo.com') || event.request.url.includes('viacep.com.br') || event.request.url.includes('nominatim.openstreetmap.org')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
