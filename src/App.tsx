import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import * as pageExports from '~/pages'

import { MainLayout } from './layouts'

const pageRoutes = Object.entries(pageExports)
  .filter(([key]) => key.endsWith('Route'))
  .map(([, page]) => page)

const queryClient = new QueryClient()

// Conditional import and render for ReactQueryDevtools
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      }))
    )
  : () => null

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<MainLayout />}>
            {pageRoutes.map((page) => (
              <Route path={page.path} element={<page.component />} key={page.path} />
            ))}
          </Route>
        </Routes>
        <Suspense fallback={null}>{import.meta.env.DEV && <ReactQueryDevtools />}</Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
export default App
