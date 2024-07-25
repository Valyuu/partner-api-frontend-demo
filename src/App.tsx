import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import * as pageExports from '~/pages'

import { MainLayout } from './layouts'

const pageRoutes = Object.entries(pageExports)
  .filter(([key]) => key.endsWith('Route'))
  .map(([, page]) => page)

const queryClient = new QueryClient()

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
      </QueryClientProvider>
    </BrowserRouter>
  )
}
export default App
