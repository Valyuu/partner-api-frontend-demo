// @ts-check

import { fixupPluginRules } from '@eslint/compat'
import eslint from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwindcss from 'eslint-plugin-tailwindcss'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwindcss.configs['flat/recommended'],
  {
    files: ['tailwind.config.js', 'postcss.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // @ts-expect-error-next-line
  prettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      tailwindcss,
      'simple-import-sort': simpleImportSort,
      'react-refresh': reactRefresh,
      // @ts-expect-error-next-line
      'react-hooks': fixupPluginRules(reactHooks),
    },
    ignores: ['dist/**'],
    rules: {
      'no-fallthrough': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...reactHooks.configs.recommended.rules,
    },
  }
)
