import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      indent: ["error", 2, { SwitchCase: 1 }],
      "linebreak-style": 0,
      quotes: ["error", "double"],
      semi: "error",
    },
  },
  pluginJs.configs.recommended,
];
