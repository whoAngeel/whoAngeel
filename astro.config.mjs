// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://whoangeel.github.io',
  base: '/whoAngeel',
  // i18n: Spanish is the default locale and lives at the root (no /es/ prefix);
  // English lives under /en/. Locale list is mirrored in src/i18n/index.ts.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-MX', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
