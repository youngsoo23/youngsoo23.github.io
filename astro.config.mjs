import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/lib/site.ts';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // 도메인 루트(https://youngsoo23.github.io)에 배포하므로 base는 설정하지 않는다.
  site: SITE_URL,

  compressHTML: true,

  markdown: {
    shikiConfig: { theme: 'css-variables' },
  },

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
