import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { dependencies as deps } from './package.json';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 9000,
  },
  dev: {
    assetPrefix: 'http://localhost:9000',
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      if (config.output) {
        config.output.uniqueName = 'host';
      }
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'host',
          filename: 'remoteEntry.js',
          shared: [
            {
              react: {
                eager: true,
                singleton: true,
                requiredVersion: deps.react,
              },
              'react-dom': {
                eager: true,
                singleton: true,
                requiredVersion: deps['react-dom'],
              },
              '@repo/auth': {
                eager: true,
                singleton: true,
                requiredVersion: deps['@repo/auth'],
                import: '@repo/auth',
              },
              '@repo/echo': {
                eager: true,
                singleton: true,
                requiredVersion: deps['@repo/echo'],
                import: '@repo/echo',
              },
            },
          ],
        }),
      ]);
    },
  },
});
