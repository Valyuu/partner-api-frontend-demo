import '~/assets/styles/index.css'
import '~/assets/styles/font.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MainLayout } from '~/components'
import * as pageExports from '~/pages'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: Object.entries(pageExports)
      .filter(([key]) => key.endsWith('Route'))
      .map(([, page]) => ({
        path: page.path,
        element: <page.component />,
      })),
  },
])

// Conditional import and render for ReactQueryDevtools
const ReactQueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      }))
    )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
      <Suspense fallback={null}>
        {!import.meta.env.PROD && (
          <div className="opacity-30 transition-all hover:opacity-100">
            <ReactQueryDevtools />
          </div>
        )}
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
)
