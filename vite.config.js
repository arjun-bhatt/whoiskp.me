 
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [ 
    eslint(),],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
});
