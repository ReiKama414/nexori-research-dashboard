import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** GitHub Pages project site: https://reikama414.github.io/nexori-research-dashboard/ */
const repoBase = '/nexori-research-dashboard/';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? repoBase : '/',
  plugins: [react()],
}));