// Service worker de la landing de PactoGG: caché a nivel frontend.
// - Archivos con huella de Vite (/assets/*-[hash].*) e imágenes: primero caché (no cambian).
// - Páginas HTML: primero red y, sin conexión, la última copia guardada.
// - Nunca guarda la verificación de correo, la API ni Google Analytics.
const VERSION = 'pactogg-landing-v1';
const SHELL = ['/', '/privacidad', '/favicon.svg', '/manifest.webmanifest', '/assets/tournament-hero.png'];
const NEVER_CACHE = [/^\/verificar-correo/, /^\/api\//];

// Los JS/CSS de Vite llevan huella en el nombre: se leen del index.html publicado.
async function precache() {
  const cache = await caches.open(VERSION);
  await cache.addAll(SHELL);
  const html = await (await cache.match('/')).text();
  const built = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+\.(?:js|css))"/g)].map((match) => match[1]);
  await cache.addAll(built);
}

self.addEventListener('install', (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (NEVER_CACHE.some((rule) => rule.test(url.pathname))) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request, { ignoreVary: true }).then((hit) => hit || caches.match('/', { ignoreVary: true }))),
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreVary: true }).then((hit) => hit || fetch(request).then((response) => {
      if (response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(VERSION).then((cache) => cache.put(request, copy));
      }
      return response;
    })),
  );
});
