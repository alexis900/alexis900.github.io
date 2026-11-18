import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alexis900.github.io',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  redirects: {
    '/': '/es/',
  },
});
