import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    coverage: {
      provider: 'istanbul', // Utilise 'c8' pour la couverture, d'autres options existent
      reporter: ['text', 'json', 'html'], // Choisissez les formats de rapport
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['**/browser.ts'], // Spécifiez les fichiers à inclure
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
    },
  },
});
