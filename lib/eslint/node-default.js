import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export const nodeESLintConfig = [
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ignores: ["build/**", "node_modules/**"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node 
    } 
  },
  tseslint.configs.recommended,
];
