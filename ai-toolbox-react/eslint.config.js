import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // 미사용 변수 경고 (대문자 시작하는 변수는 제외)
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_'
      }],
      // console.log는 경고, console.warn/error는 허용
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // React Hook 의존성 배열 경고
      'react-hooks/exhaustive-deps': 'warn',
      // 중복된 키 에러
      'no-dupe-keys': 'error',
      // React Fast Refresh 관련 - Context Provider는 제외
      'react-refresh/only-export-components': ['warn', { 
        allowConstantExport: true,
        allowExportNames: ['useToast', 'ToastProvider']
      }],
    },
  },
])
