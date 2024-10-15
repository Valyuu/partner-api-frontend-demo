import '~/assets/styles/index.css'
import '~/assets/styles/font.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
