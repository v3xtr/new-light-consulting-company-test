import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "cmd/app/index.ts",
    "application/**/*.{ts,js}",
    "domain/**/*.{ts,js}",
    "infrastructure/**/*.{ts,js}",
    "shared/**/*.{ts,js}",
    "services/**/*.{ts,js}",
    "prisma.config.ts"
  ],
  outDir: "dist",
  format: ["esm"],
  platform: "node",
  target: "es2020",
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  bundle: true,
  minify: false,
  tsconfig: "tsconfig.json",
  shims: false,
  skipNodeModulesBundle: true,
  env: {
    NODE_ENV: "production",
  },
  outExtension() {
    return { js: ".mjs" };
  },
});
