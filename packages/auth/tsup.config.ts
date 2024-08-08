import { type Options, defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
	entryPoints: ["src/index.ts"],
	clean: true,
	dts: true,
	format: ["cjs"],
	external: ["react"],
	banner: {
		js: "'use client'",
	},
	...options,
}));
