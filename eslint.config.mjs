import { defineConfig } from 'eslint/config'; //it says unable to resolve path, but remove this and the linter breaks. 8/20/25
import react from 'eslint-plugin-react';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';
// import reactPlugin from 'eslint-plugin-react';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends('eslint:recommended', 'plugin:react/recommended'),
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.{js,jsx}'],

    plugins: {
        react: react,
        import: importPlugin
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: babelParser,
        ecmaVersion: 'latest',
        sourceType: 'module',

        parserOptions: {
            requireConfigFile: false,
            'ecmaVersion': 'latest',
            ecmaFeatures: {jsx: true},
            sourceType: 'module',
            babelOptions: {
                'presets': ['@babel/preset-react']
        },
        },
    },

    settings: {
        react: {
            version: 'detect',
        },
    },

    rules: {
        semi: ['error', 'always'],
        'no-console': 'warn',
        'prefer-template': 'warn',
             'strict': 0,
        'quotes': [2, 'single'],
        'no-else-return': 0,
        'new-cap': ['error', {'capIsNewExceptions': ['Router']}],
        'import/no-unresolved': [2, { 'caseSensitive': false } ],
        'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none' }],
        'no-underscore-dangle': 0,
        'arrow-body-style': 0,
        'one-var': ['error', { 'uninitialized': 'always', 'initialized': 'never' }],
        'one-var-declaration-per-line': ['error', 'initializations'],
        'max-len': ['error', 200],
        'no-extra-parens': 0,
        'no-restricted-syntax': [0, 'DebuggerStatement'],
        'no-debugger': 'warn',
         'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react/react-in-jsx-scope': 2,
        'react/prop-types': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-first-prop-new-line': 0,
        'react/jsx-filename-extension': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'react/jsx-one-expression-per-line':0
    },
}]);