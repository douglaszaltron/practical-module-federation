import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

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
          filename: "remoteEntry.js",
          exposes: {
            "./App": "./src/mfe.tsx",
          }, shared: ["react", "react-dom", "@repo/auth"],
        }),
      ]);
    },
  },
});
