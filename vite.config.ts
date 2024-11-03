import { resolve } from 'node:path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import { z } from 'zod'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  const env = z
    .object({
      API_BASE_URL: z.string().url(),
      API_AUTH_KEY: z.string().uuid(),
      ALLOWED_CATEGORIES: z.string().refine(
        (val) => {
          try {
            const parsed = JSON.parse(val)
            return z
              .object({
                smartphone: z.string().uuid(),
                tablet: z.string().uuid(),
                smartwatch: z.string().uuid(),
              })
              .safeParse(parsed).success
          } catch {
            return false
          }
        },
        { message: 'Invalid ALLOWED_CATEGORIES format' }
      ),
    })
    .parse(loadEnv(mode, process.cwd(), ''))

  return {
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
      },
    },
    publicDir: 'public',
    define: {
      'import.meta.env.API_BASE_URL': JSON.stringify(env.API_BASE_URL),
      'import.meta.env.API_AUTH_KEY': JSON.stringify(env.API_AUTH_KEY),
      'import.meta.env.ALLOWED_CATEGORIES': env.ALLOWED_CATEGORIES,
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          ...(isProduction ? {} : { container: resolve(__dirname, 'container.html') }),
        },
      },
      sourcemap: !isProduction,
    },
  }
})
