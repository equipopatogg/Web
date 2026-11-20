# Plan 001 — Landing page

- **Stack:** React 19 + Vite 8, sin enrutador: `main.jsx` elige la página por `location.pathname` y Azure Static Web Apps reescribe las rutas a `index.html` (`navigationFallback`).
- **Aviso:** `src/privacy/content.js` es la misma fuente del aviso de la app y del documento Word; `Privacy.jsx` lo muestra.
- **Configuración:** `src/content.js` lee `VITE_*` al compilar y tiene valores por defecto públicos (URL de Play).
- **Seguridad:** cabeceras globales en `public/staticwebapp.config.json`.
- **CI/CD:** workflow de Azure Static Web Apps: `npm ci`, `npm test` y despliegue.
