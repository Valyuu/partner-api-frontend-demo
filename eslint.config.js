import jsEslint from '@eslint/js'
import jsonEslint from '@eslint/json'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwindcss from 'eslint-plugin-tailwindcss'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  jsEslint.configs.recommended,
  jsonEslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwindcss.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      tailwindcss: tailwindcss,
      'simple-import-sort': simpleImportSort,
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
    },
    ignores: ['dist/**', 'node_modules/**'],
    rules: {
      'no-fallthrough': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...reactHooks.configs.recommended.rules,
      'tailwindcss/classnames-order': [
        'error',
        {
          // Add cva and cn as valid class name generators
          validClassNames: ['cva', 'cn'],
        },
      ],
    },
  },
  {
    files: ['tailwind.config.js', 'postcss.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  prettierRecommended
)
