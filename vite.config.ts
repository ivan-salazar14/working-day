import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ColombianBusinessDateAPI',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['express'],
      output: {
        globals: {
          express: 'express'
        }
      }
    }
  }
});