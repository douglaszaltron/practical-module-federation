import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 9000,
  },
  dev: {
    assetPrefix: 'http://localhost:9000',
  },
});
