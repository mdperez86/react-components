import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

//NEW
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      // NEW
      typescript({ tsconfig: "./tsconfig.rollup.json" }),
      peerDepsExternal(),

      resolve(),
      commonjs(),

      // NEW
      terser(),
    ],
  },
  {
    input: "./tailwind.config.ts",
    output: [
      {
        file: "dist/cjs/tailwind.config.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      // NEW
      typescript({ tsconfig: "./tsconfig.rollup.json" }),
      peerDepsExternal(),

      resolve(),
      commonjs(),

      // NEW
      terser(),
    ],
  },
  {
    input: "dist/cjs/types/src/index.d.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [dts({ tsconfig: "./tsconfig.rollup.json" })],
  },
];
