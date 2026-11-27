import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PLAY_STORE_URL, PLAY_TESTING_URL, PRIVACY_PATH, CONTACT_EMAIL } from '../src/content.js';
import { PRIVACY } from '../src/privacy/content.js';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const config = JSON.parse(read('public/staticwebapp.config.json'));

test('requisito 17: el botón de la tienda abre la ficha oficial de Google Play', () => {
  const url = new URL(PLAY_STORE_URL);
  assert.equal(url.protocol, 'https:');
  assert.equal(url.hostname, 'play.google.com');
  assert.equal(url.searchParams.get('id'), 'com.pactogg.app');
});

test('requisito 16-17: la landing publica el aviso en la ruta que abre la app', () => {
  assert.equal(PRIVACY_PATH, '/privacidad');
  // Misma versión que BuildConfig.PRIVACY_VERSION de la app y que acepta el usuario al registrarse.
  assert.equal(PRIVACY.version, '2026-10-01');
  const titles = PRIVACY.sections.map(([title]) => title);
  for (const needed of ['Qué datos tratamos', 'Con quién se procesan', 'Cuánto tiempo', 'Tus derechos', 'Cookies y analítica']) {
    assert.ok(titles.some((title) => title.includes(needed)), `falta la sección "${needed}"`);
  }
  const text = JSON.stringify(PRIVACY);
  assert.ok(text.includes('Eliminar mi cuenta'), 'debe explicar cómo eliminar la cuenta');
  assert.ok(text.includes(CONTACT_EMAIL), 'debe dar el correo de contacto');
});

test('el pie de página enlaza el aviso y la eliminación de cuenta', () => {
  const footer = read('src/components/sections.jsx');
  assert.match(footer, /href=\{PRIVACY_PATH\}/);
  assert.match(footer, /#eliminar-cuenta/);
  assert.match(read('src/privacy/Privacy.jsx'), /id="eliminar-cuenta"/);
  assert.match(read('src/main.jsx'), /<Privacy \/>/);
});

test('cabeceras de seguridad globales en Azure Static Web Apps', () => {
  const headers = config.globalHeaders;
  assert.match(headers['Content-Security-Policy'], /default-src 'self'/);
  assert.match(headers['Content-Security-Policy'], /frame-ancestors 'none'/);
  assert.match(headers['Content-Security-Policy'], /object-src 'none'/);
  assert.match(headers['Strict-Transport-Security'], /max-age=\d{7,}/);
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.ok(headers['Permissions-Policy'].includes('camera=()'));
});

test('Analytics solo se carga con consentimiento y sin datos personales', () => {
  const app = read('src/App.jsx');
  assert.match(app, /consent === 'accepted' && GA_MEASUREMENT_ID/);
  assert.match(app, /anonymize_ip: true/);
  assert.match(read('src/content.js'), /VITE_GA_MEASUREMENT_ID/);
});

test('SEO básico: idioma, descripción, favicon, robots y sitemap con el aviso', () => {
  const html = read('index.html');
  assert.match(html, /<html lang="es">/);
  assert.match(html, /name="description"/);
  assert.match(html, /name="googlebot" content="index, follow/);
  assert.match(html, /rel="canonical" href="https:\/\/black-river-065cb1710\.6\.azurestaticapps\.net\//);
  assert.match(html, /<h1>Tus retos entre amigos, en juego<\/h1>/);
  assert.match(html, /WebSite/);
  assert.match(html, /rel="icon"/);
  assert.match(html, /rel="privacy-policy" href="\/privacidad"/);
  const robots = read('public/robots.txt');
  const sitemap = read('public/sitemap.xml');
  assert.match(robots, /Allow: \//);
  assert.doesNotMatch(robots, /Disallow: \/$/m);
  assert.match(robots, /Sitemap: https:\/\/black-river-065cb1710\.6\.azurestaticapps\.net\/sitemap\.xml/);
  assert.match(sitemap, /<lastmod>2026-11-27<\/lastmod>/);
  assert.match(sitemap, /\/privacidad<\/loc>/);
  assert.equal(config.globalHeaders['X-Robots-Tag'].startsWith('index, follow'), true);
});

test('dependencias fijadas a una versión exacta (sin "latest")', () => {
  const pkg = JSON.parse(read('package.json'));
  for (const [name, version] of Object.entries(pkg.dependencies)) {
    assert.match(version, /^\d+\.\d+\.\d+$/, `${name} debe tener versión exacta`);
  }
  assert.match(pkg.version, /^\d+\.\d+\.\d+$/);
});

test('mientras la app está en prueba cerrada, la landing ofrece la liga de testers del mismo paquete', () => {
  const store = new URL(PLAY_STORE_URL);
  const testing = new URL(PLAY_TESTING_URL);
  assert.equal(testing.hostname, 'play.google.com');
  assert.equal(testing.pathname, `/apps/testing/${store.searchParams.get('id')}`);
});
