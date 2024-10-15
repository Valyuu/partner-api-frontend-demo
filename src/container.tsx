import '~/assets/styles/index.css'
import '~/assets/styles/font.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { ContainerLayout } from '~/components'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="relative flex h-screen w-screen items-center justify-center bg-[#4C4C4C] text-base text-white">
      <ContainerLayout />
    </div>
  </StrictMode>
)
