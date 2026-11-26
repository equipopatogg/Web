import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { registerServiceWorker } from '../src/registerServiceWorker.js';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const config = JSON.parse(read('public/staticwebapp.config.json'));
const route = (path) => config.routes.find((item) => item.route === path);

test('caché frontend: service worker con versión y estrategias por tipo de recurso', () => {
  const sw = read('public/sw.js');
  assert.match(sw, /const VERSION = 'pactogg-landing-v\d+'/);
  assert.match(sw, /request\.mode === 'navigate'/, 'las páginas van primero a la red');
  assert.match(sw, /caches\.match\(request, \{ ignoreVary: true \}\)\.then\(\(hit\) => hit \|\| fetch/, 'los archivos estáticos salen primero de la caché');
  assert.match(sw, /caches\.delete\(key\)/, 'borra cachés de versiones anteriores');
});

test('el service worker nunca guarda la verificación de correo, la API ni otros dominios', () => {
  const sw = read('public/sw.js');
  assert.match(sw, /\/\^\\\/verificar-correo\//);
  assert.match(sw, /\/\^\\\/api\\\/\//);
  assert.match(sw, /url\.origin !== self\.location\.origin\) return/);
  assert.match(sw, /request\.method !== 'GET'\) return/);
});

test('cabeceras de caché: sw.js sin caché, recursos con max-age y verificación no-store', () => {
  assert.equal(route('/sw.js').headers['Cache-Control'], 'no-cache');
  assert.match(route('/assets/*').headers['Cache-Control'], /max-age=\d+/);
  assert.equal(route('/verificar-correo*').headers['Cache-Control'], 'no-store');
  const csp = config.globalHeaders['Content-Security-Policy'];
  assert.match(csp, /worker-src 'self'/);
  assert.match(csp, /manifest-src 'self'/);
});

test('el service worker solo se registra en la compilación publicada', () => {
  const nav = { serviceWorker: { register: () => Promise.resolve() } };
  assert.equal(registerServiceWorker(nav, { PROD: false }), false);
  assert.equal(registerServiceWorker({}, { PROD: true }), false);
  assert.equal(registerServiceWorker(nav, { PROD: true }), true);
  assert.match(read('src/main.jsx'), /registerServiceWorker\(\);/);
});

test('identidad: favicon y manifiesto usan el escudo PactoGG (P blanca + GG cian, borde naranja)', () => {
  const favicon = read('public/favicon.svg');
  const logo = read('src/components/ui.jsx');
  for (const color of ['#FF7A1A', '#F8FAFC', '#22D3EE', '#121A2D']) {
    assert.ok(favicon.includes(color), `favicon sin ${color}`);
    assert.ok(logo.includes(color), `logo sin ${color}`);
  }
  assert.ok(favicon.includes('M26 13h-4v11h4v-4h-3'), 'el favicon debe llevar la G del logo');
  const manifest = JSON.parse(read('public/manifest.webmanifest'));
  assert.equal(manifest.name, 'PactoGG');
  assert.equal(manifest.related_applications[0].id, 'com.pactogg.app');
  assert.match(read('index.html'), /rel="manifest" href="\/manifest.webmanifest"/);
});
