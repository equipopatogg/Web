// Registra el service worker solo en la compilación publicada (no en `vite dev`).
export function registerServiceWorker(nav = globalThis.navigator, env = import.meta.env ?? {}) {
  if (!env.PROD || !nav || !('serviceWorker' in nav)) return false;
  globalThis.addEventListener?.('load', () => {
    nav.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
  });
  return true;
}
