// ESLint 9 "flat" config.
// Replaces .eslintrc.json + eslint-config-vazco 6 (which only supports
// ESLint <= 8). The vazco rules are kept below, same severities.
import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    ignores: [
      'build/',
      'coverage/',
      // Old Jest + puppeteer e2e tests, to be rewritten (was not linted before).
      'e2e/',
    ],
  },

  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  // New JSX transform: no need to import React in every file.
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  // Turn off rules that conflict with Prettier (formatting is Prettier's job).
  // Placed before our rules so they can re-enable e.g. `curly` (as vazco did).
  prettier,

  {
    plugins: {
      import: importPlugin,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // --- Rules from eslint-config-vazco 6 ---
      camelcase: ['warn', { properties: 'never' }],
      complexity: ['warn', 12],
      'consistent-return': 'warn',
      curly: ['error', 'all'],
      eqeqeq: 'error',
      'func-names': 'warn',
      'guard-for-in': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external', 'internal'],
            ['index', 'parent', 'sibling'],
            ['unknown'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
      'new-cap': ['error', { newIsCap: true, capIsNew: false }],
      'no-bitwise': 'error',
      'no-class-assign': 'error',
      'no-const-assign': 'error',
      'no-duplicate-imports': 'error',
      'no-else-return': 'error',
      'no-eq-null': 'error',
      'no-inner-declarations': ['error', 'both'],
      'no-lonely-if': 'error',
      'no-self-compare': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-call': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-spread': 'warn',
      yoda: ['warn', 'never'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/display-name': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/jsx-key': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-access-state-in-setstate': 'error',
      'react/no-this-in-sfc': 'error',
      'react/self-closing-comp': 'error',
      'react/sort-comp': 'error',

      // --- Project settings (from the old .eslintrc.json) ---
      'no-console': 'off',
      'jsx-a11y/no-autofocus': 'off',

      // --- Off for now, to be fixed later (`any` is used in 23 files) ---
      '@typescript-eslint/no-explicit-any': 'off',
      // src/lib/vm.ts uses `@ts-nocheck`; other ts-comments are still checked.
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-nocheck': false }],
    },
  },
])
