import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 9001,
  },
  dev: {
    assetPrefix: 'http://localhost:9001',
    hmr: false,
    liveReload: false,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      if (config.output) {
        config.output.uniqueName = 'hostBuild';
      }
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'hostBuild',
          remotes: {
            remote: 'remote@http://localhost:3001/remoteEntry.js',
          },
          shared: {
            react: {
              eager: true,
              singleton: true,
            },
            'react-dom': {
              eager: true,
              singleton: true,
            },
            '@repo/auth': {
              eager: true,
              singleton: true,
            },
          },
        }),
      ]);
    },
  },
});
