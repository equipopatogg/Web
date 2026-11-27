# Spec 001 — Landing page

**Requisitos del docente:** v3 punto 16 (aviso en la app vinculado a la landing) y punto 17 (landing con redirección a la tienda, aviso de privacidad y Google Analytics).

## Criterios de aceptación
| ID | Criterio | Prueba |
|---|---|---|
| LP-AC1 | El botón de la tienda abre `https://play.google.com/store/apps/details?id=com.pactogg.app` | `landing.test.js` — tienda |
| LP-AC2 | `/privacidad` muestra el aviso con la versión 2026-10-01, datos tratados, proveedores, conservación, derechos ARCO, analítica y contacto | `landing.test.js` — aviso |
| LP-AC3 | El pie de página enlaza el aviso y "Eliminar cuenta" | `landing.test.js` — pie |
| LP-AC4 | Google Analytics 4 se carga solo con consentimiento, con IP anonimizada y sin datos personales | `landing.test.js` — analítica |
| LP-AC5 | Todo el sitio responde con CSP, HSTS, X-Frame-Options, nosniff y Permissions-Policy | `landing.test.js` — cabeceras |
| LP-AC6 | `/verificar-correo` verifica el token sin cookies ni referrer y no lo deja en el historial | `verification.test.js` |
| LP-AC7 | Dependencias con versión exacta y versión semántica en `package.json` | `landing.test.js` — versiones |
| LP-AC8 | Caché frontend: service worker (recursos primero de caché, páginas primero de red, sin conexión muestra inicio y `/privacidad`), cabeceras de caché y manifiesto | `cache.test.js` |
| LP-AC9 | Seguridad en CI: `npm audit --audit-level=high` y CodeQL en cada PR y en `main` | `.github/workflows/security.yml` |

## Fuera de alcance
Cuentas de usuario en la web, formularios y cualquier dato personal.
