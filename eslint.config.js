import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import unicorn from "eslint-plugin-unicorn";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    plugins: {
      unicorn,
      "@typescript-eslint": tseslint.plugin
    },
    rules: {
      ...prettierConfig.rules,
      
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-explicit-any": "error",
      
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/number-literal-case": "off",
      "unicorn/prefer-modern-dom-apis": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-optional-catch-binding": "error",
      "unicorn/no-for-loop": "error",
      "unicorn/numeric-separators-style": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          "allowList": {
            "acc": true,
            "env": true,
            "i": true,
            "j": true,
            "props": true,
            "Props": true
          }
        }
      ]
    }
  }
]);