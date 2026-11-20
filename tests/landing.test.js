import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PLAY_STORE_URL, PRIVACY_PATH, CONTACT_EMAIL } from '../src/content.js';
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
  assert.match(html, /rel="icon"/);
  assert.match(html, /rel="privacy-policy" href="\/privacidad"/);
  assert.match(read('public/robots.txt'), /Sitemap:/);
  assert.match(read('public/sitemap.xml'), /\/privacidad<\/loc>/);
});

test('dependencias fijadas a una versión exacta (sin "latest")', () => {
  const pkg = JSON.parse(read('package.json'));
  for (const [name, version] of Object.entries(pkg.dependencies)) {
    assert.match(version, /^\d+\.\d+\.\d+$/, `${name} debe tener versión exacta`);
  }
  assert.match(pkg.version, /^\d+\.\d+\.\d+$/);
});
