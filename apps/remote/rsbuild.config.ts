import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
// import { dependencies } from "./package.json";

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3001,
  },
  dev: {
    assetPrefix: "http://localhost:3001",
    hmr: false,
    liveReload: false,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = "remote";
      appendPlugins([
        new ModuleFederationPlugin({
          name: "remote",
          library: {
            type: 'var',
            name: 'remote'
          },
          filename: "remoteEntry.js",
          exposes: {
            "./App": "./src/mfe.tsx",
          },
          shared: {
            react: {
              eager: true,
              singleton: true,
              requiredVersion: '^18.3.1',
            },
            'react-dom': {
              eager: true,
              singleton: true,
              requiredVersion: '^18.3.1',
            },
            '@repo/auth': {
              eager: true,
              singleton: true,
              requiredVersion: '^0.0.1',
            },
          },
        }),
      ]);
    },
  },
});
