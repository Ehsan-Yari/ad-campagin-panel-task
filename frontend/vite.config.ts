import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

const PORT = 8081;

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: PORT,
    host: true,
    proxy: { '/api': 'http://localhost:4000' },
  },
  preview: { port: PORT, host: true },
});
