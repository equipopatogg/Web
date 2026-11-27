# PactoGG — Landing page

Landing de PactoGG en **React 19 + Vite 8**, publicada en **Azure Static Web Apps**:
https://black-river-065cb1710.6.azurestaticapps.net

| Ruta | Qué muestra |
|---|---|
| `/` | Presentación, "Ver cómo funciona" y botón a Google Play (`com.pactogg.app`) |
| `/privacidad` | Aviso de privacidad y manejo de datos (versión 2026-10-01). La app lo abre desde `BuildConfig.PRIVACY_URL` |
| `/privacidad#eliminar-cuenta` | Cómo eliminar la cuenta y los datos |
| `/verificar-correo?token=…` | Verificación del correo de la cuenta (llama a `POST /api/v1/auth/verify-email`) |

## Estructura

```text
src/
├── App.jsx                # Landing y aviso de consentimiento de Analytics
├── main.jsx               # Elige la página según la ruta
├── content.js             # URL de Play, Measurement ID de GA4, correo y ruta del aviso
├── components/            # Header, hero, footer, panel "cómo funciona" y UI base
├── privacy/               # Aviso de privacidad (content.js) y su página (Privacy.jsx)
└── verification/          # Página de verificación de correo
public/                    # Imágenes, favicon, sw.js, manifest, robots.txt, sitemap.xml y staticwebapp.config.json
tests/                     # Pruebas con node:test (npm test)
specs/001-landing/         # Spec, plan y tareas (SDD)
```

## Configuración

Variables de GitHub Actions (`Settings → Secrets and variables → Actions → Variables`), se inyectan solo al compilar:

- `VITE_GA_MEASUREMENT_ID`: Measurement ID de GA4 de la propiedad creada con `equipopatogg@gmail.com`. Configurado como variable del repositorio: `G-JZR6RB7KX8` (el ID es público; viaja en el JavaScript publicado).
- `VITE_PLAY_STORE_URL` (opcional): por defecto `https://play.google.com/store/apps/details?id=com.pactogg.app`.
- `VITE_API_BASE_URL`: URL HTTPS del backend para la verificación de correo.

Analytics se carga **solo** después de que el visitante acepta; no se envían nombres, correos ni identificadores de cuenta.

## Comandos

```bash
npm ci
npm test        # pruebas (node:test)
npm run build   # genera dist/
```

## CI/CD

`.github/workflows/azure-static-web-apps-*.yml`: en cada push a `main` corre `npm ci && npm test` y despliega `dist/` a Azure Static Web Apps; en los PR crea un entorno de vista previa.

## Seguridad

`public/staticwebapp.config.json` aplica a todo el sitio CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` y `Permissions-Policy`. La verificación de correo usa solo HTTPS, `credentials: 'omit'`, `no-referrer` y no guarda el token en el historial.

## Versiones

Versión semántica en `package.json` (ver `CHANGELOG.md`) y dependencias fijadas a versión exacta con `package-lock.json`.

## Caché a nivel frontend

- `public/sw.js` (service worker, solo en la compilación publicada): JS/CSS con huella e imágenes salen primero de la caché; las páginas van primero a la red y, sin conexión, se muestra la última copia de inicio y `/privacidad`. Nunca guarda `/verificar-correo`, la API ni Google Analytics. Para invalidar, se sube `VERSION`.
- `staticwebapp.config.json`: `sw.js` con `no-cache`, `/assets/*` con `max-age` de 7 días, `/privacidad` 1 hora y `/verificar-correo` `no-store`.

## Seguridad en CI

`.github/workflows/security.yml`: `npm audit --audit-level=high` (rompe con vulnerabilidades altas o críticas), pruebas, compilación y CodeQL (SAST de JavaScript) en cada PR, en `main` y cada lunes.
