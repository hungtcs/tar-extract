import { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeExternals } from "rollup-plugin-node-externals";

export default {
  input: "./lib/index.ts",
  output: [
    {
      dir: "./dist/",
      format: "esm",
      entryFileNames: "index.js",
    },
    {
      dir: "./dist/",
      format: "cjs",
      entryFileNames: "index.cjs",
    },
  ],
  plugins: [typescript({ tsconfig: "tsconfig.lib.json" }), nodeExternals()],
} satisfies RollupOptions;
