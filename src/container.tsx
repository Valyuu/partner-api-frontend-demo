import '~/assets/styles/index.css'
import '~/assets/styles/font.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { ContainerLayout } from '~/components'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ContainerLayout />
    </QueryClientProvider>
  </StrictMode>
)
