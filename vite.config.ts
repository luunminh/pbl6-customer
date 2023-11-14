import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import checker from 'vite-plugin-checker';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    outDir: 'dist',
  },
  plugins: [
    react(),
    checker({
      typescript: true,
      enableBuild: true,
    }),
  ],
  resolve: {
    alias: {
      '@components': pathResolve('src/modules/components'),
      '@shared': pathResolve('src/modules/shared'),
      '@appConfig': pathResolve('src/appConfig'),
      '@redux': pathResolve('src/redux'),
      '@queries': pathResolve('src/queries'),
      '@customerShared': pathResolve('src/containers/shared'),
      // '@modules': pathResolve('src/modules'),
      src: pathResolve('src'),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  base: '/',
});
