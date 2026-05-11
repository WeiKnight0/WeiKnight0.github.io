import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkCodeLanguageMarker from './src/utils/remark-code-language-marker.mjs';
import remarkNoteLinks from './src/utils/remark-note-links.mjs';
import remarkOcNames from './src/utils/remark-oc-names.mjs';

// https://astro.build/config
export default defineConfig({
  // base: '.', // Set a path prefix.
  site: 'https://weiknight0.github.io/', // Use to generate your sitemap and canonical URLs in your final build.
  trailingSlash: 'ignore', // Allow both slash and non-slash URLs
  markdown: {
    remarkPlugins: [remarkMath, remarkOcNames, remarkNoteLinks, remarkCodeLanguageMarker],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'github-light',
    },
  },
  integrations: [react(), tailwind({}), sitemap(), robotsTxt()],
});
