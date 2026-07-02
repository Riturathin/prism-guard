const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  sourcemap: false,
  minify: false,
  external: [],
}).catch(() => process.exit(1));