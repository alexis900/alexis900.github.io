# alexis900.github.io

Portfolio de Alejandro Martín Pérez, reconstruido desde cero con [Astro](https://astro.build).

## Estructura

- `src/pages/[lang]/index.astro` — página principal por idioma (`/es/`, `/ca/`, `/en/`).
- `src/pages/[lang]/legal.astro` — aviso legal y privacidad (`/es/legal/`, `/ca/legal/`, `/en/legal/`).
- `src/components/` — secciones de la página (hero, stack, proyectos, sobre mí, contacto).
- `src/data/i18n.js` — todo el texto en los tres idiomas y la lista de proyectos.
- `src/styles/global.css` — estilos globales y las fuentes `@font-face` auto-hospedadas.
- `public/fonts/` — fuentes WOFF2 y sus licencias OFL (sin peticiones a Google Fonts).
- `public/favicon.svg` — favicon.
- `privacy-audit-report.md` — auditoría de privacidad (informe de solo lectura).
- `.github/workflows/deploy.yml` — publicación automática en GitHub Pages al hacer push a `main`.

La raíz (`/`) redirige a `/es/` mediante la configuración de Astro.

## Desarrollo

```bash
npm install
npm run dev
```

## Compilación

```bash
npm run build
npm run preview
```

El resultado estático se genera en `dist/`.
