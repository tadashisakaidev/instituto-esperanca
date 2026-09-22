import { defineConfig } from 'vite';

export default defineConfig({
  // Todo o projeto agora é a raiz — index.html, css/, js/, img/ e
  // html/templates/ vivem no mesmo nível, sem pasta "html" intermediária
  // para o index.html.
  root: '.',

  build: {
    outDir: 'dist',
    emptyOutDir: true
  },

  server: {
    open: true
  }
});