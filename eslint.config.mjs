import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/App.jsx",
    "src/main.jsx",
    "src/App.css",
    "src/index.css",
    "vite.config.js",
    "tailwind.config.js",
    "index.html",
  ]),
]);

export default eslintConfig;
