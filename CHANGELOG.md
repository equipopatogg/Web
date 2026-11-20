# Cambios

Formato: versión semántica (mayor.menor.parche). Cada despliegue a `main` publica la versión de `package.json`.

## 1.0.0 — 2026-11-19
- Página `/privacidad` con el aviso de privacidad y manejo de datos (misma versión 2026-10-01 que acepta la app) y sección para eliminar la cuenta.
- Botón de Google Play con la ficha oficial `com.pactogg.app` por defecto.
- Cabeceras de seguridad globales (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy).
- Dependencias fijadas a versión exacta; favicon, `robots.txt` y `sitemap.xml`.
- Pruebas de la landing (`tests/landing.test.js`).

## 0.2.0 — 2026-11-16
- Página `/verificar-correo` para el enlace de verificación de cuenta, con pruebas.

## 0.1.0 — 2026-11
- Landing inicial, consentimiento de Google Analytics y despliegue en Azure Static Web Apps.
