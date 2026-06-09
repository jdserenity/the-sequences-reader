import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: { '@content': path.resolve(__dirname, '../content') },
  },
  server: {
    port: Number(process.env.PORT) || 4321,
    strictPort: false,
    fs: { allow: ['..'] },
  },
  test: { include: ['src/**/*.test.ts'] },
});
