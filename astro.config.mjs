import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lumino.rs',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'directory',
  },
});
