import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugin: {
      eslintPluginPrettier,
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
  { languageOptions: { ...globals.browser, ...globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
];
