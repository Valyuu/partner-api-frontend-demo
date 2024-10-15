import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Card, CardContent, CardFooter, CardHeader, Footer, Header } from '~/components'

export const MainLayout = () => {
  const { pathname } = useLocation()

  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    contentRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <main className="h-screen w-screen bg-transparent">
      <Card className="flex size-full flex-col overflow-hidden border-none">
        <CardHeader className="relative w-full px-10 py-[1.875rem]">
          <Header />
        </CardHeader>
        <CardContent
          ref={contentRef}
          className="grow overflow-y-auto px-10 py-[1.875rem] scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-stone-300 scrollbar-thumb-rounded-full"
        >
          <Outlet />
        </CardContent>
        <CardFooter className="relative flex justify-between gap-5 border-t border-gray-200 px-10 py-[1.875rem]">
          <Footer />
        </CardFooter>
      </Card>
    </main>
  )
}
