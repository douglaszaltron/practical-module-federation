import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

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
			if (config.output) {
				config.output.uniqueName = "remote";
			}
			appendPlugins([
				new ModuleFederationPlugin({
					name: "remote",
					filename: "remoteEntry.js",
					exposes: {
						"./App": "./src/mfe.tsx",
					},
					shared: {
						react: {
							singleton: true,
						},
						"react-dom": {
							singleton: true,
						},
						"@repo/auth": {
							singleton: true,
						},
					},
				}),
			]);
		},
	},
});
