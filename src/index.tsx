import '~/assets/styles/index.css'
import '~/assets/styles/font.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import { MainLayout } from '~/layouts'
import * as pageExports from '~/pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      {Object.entries(pageExports)
        .filter(([key]) => key.endsWith('Route'))
        .map(([, page]) => (
          <Route path={page.path} element={<page.component />} key={page.path} />
        ))}
    </Route>
  )
)

// Conditional import and render for ReactQueryDevtools
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      }))
    )
  : () => null

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
      <Suspense fallback={null}>
        {import.meta.env.DEV && (
          <div className="opacity-30 transition-all hover:opacity-100">
            <ReactQueryDevtools />
          </div>
        )}
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
)
