# PactoGG — Landing page

Landing responsive de PactoGG construida con React y componentes reutilizables.

## Estructura

```text
files/
├── public/
│   └── assets/
│       └── tournament-hero.png
├── src/
│   ├── components/
│   │   ├── panels.jsx       # Contenido de modales y demos
│   │   ├── sections.jsx     # Header, hero, accesos y footer
│   │   └── ui.jsx           # Botones, iconos, badges y componentes base
│   ├── App.jsx              # Composición principal y estado de modales
│   ├── content.js           # Contenido editable y datos de ejemplo
│   └── styles.css           # Tokens visuales, responsive y accesibilidad
└── README.md
```

## Notas de producto

- La imagen del torneo está en `public/assets/tournament-hero.png`.
- Los datos visualizados son de ejemplo.
- Los puntos son virtuales y no tienen valor monetario.
- La evidencia admite foto o enlace permitido; no se contempla subida de video.
- La IA propone estructuras, pero la persona revisa y edita antes de publicar.
- El correo de contacto configurado es `equipopatogg@gmail.com`.

## Requisitos para integrarlo

Este directorio contiene el código fuente de la landing. Para ejecutarlo hace falta integrarlo en un proyecto React/Vite con las dependencias del equipo. No se agregaron archivos de configuración ni infraestructura para respetar el alcance actual.
