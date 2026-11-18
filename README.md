# alexis900.github.io

Portfolio de Alejandro Martín Pérez, reconstruido desde cero con [Astro](https://astro.build).

## Estructura

- `src/pages/[lang]/index.astro` — página única por idioma (`/es/`, `/ca/`, `/en/`).
- `src/components/` — secciones de la página (hero, stack, proyectos, sobre mí, contacto).
- `src/data/i18n.js` — todo el texto en los tres idiomas y la lista de proyectos.
- `src/styles/global.css` — estilos globales.
- `public/favicon.svg` — favicon.
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
