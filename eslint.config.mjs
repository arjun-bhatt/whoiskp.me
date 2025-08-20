import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended", "plugin:react/recommended"),

    plugins: {
        react,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: babelParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            requireConfigFile: false,
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        semi: ["error", "always"],
        "no-console": "warn",
        "prefer-template": "warn",
    },
}]);