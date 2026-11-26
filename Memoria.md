# Memoria — Landing PactoGG

Bitácora de decisiones de la landing (SDD). Se actualiza en cada cambio.

## Estado
- Versión 1.0.0, desplegada en Azure Static Web Apps (`black-river-065cb1710`).
- Specs: `specs/001-landing` (spec, plan y tareas).
- Pruebas: `npm test` (verificación de correo + landing).

## Decisiones
| ID | Decisión | Fecha |
|---|---|---|
| W-D1 | Hosting en Azure Static Web Apps (gratis) con despliegue desde GitHub Actions | 2026-11 |
| W-D2 | GA4 solo con consentimiento explícito y `anonymize_ip`; el Measurement ID se inyecta como variable del repositorio | 2026-11 |
| W-D3 | Página `/verificar-correo` para el enlace del correo de verificación del backend (F2-D75) | 2026-11-16 |
| W-D4 | Aviso de privacidad en `/privacidad` con la misma fuente que la app y el documento Word; la app lo abre desde `BuildConfig.PRIVACY_URL` | 2026-11-19 |
| W-D5 | Botón de Google Play con la ficha `com.pactogg.app` por defecto | 2026-11-19 |
| W-D6 | Cabeceras de seguridad globales y dependencias con versión exacta | 2026-11-19 |
| W-D7 | Service worker propio (sin Workbox, sin dependencias nuevas): caché primero para recursos con huella y red primero para páginas; versión en `VERSION` para invalidar | 2026-11-26 |
| W-D8 | `npm audit` (alto/crítico rompe) y CodeQL como SAST de la landing | 2026-11-26 |

## Pendiente
- Measurement ID real de GA4 en las variables del repositorio (T8).
