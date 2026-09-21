import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // O index.html do projeto está em html/, não na raiz
  root: 'html',

  build: {
    // A pasta de saída da build (relativa ao root acima)
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'html/index.html')
    }
  },

  server: {
    open: true
  }
});
