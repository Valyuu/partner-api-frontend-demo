import { Outlet } from 'react-router-dom'

import { Card, CardContent, CardFooter, CardHeader, Footer, Header } from '~/components'

export const MainLayout = () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Card className="mx-auto flex h-[42rem] w-[48rem] flex-col">
        <CardHeader className="w-full bg-blue-500 text-white">
          <Header />
        </CardHeader>
        <CardContent className="grow overflow-y-auto pt-6 scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-stone-300 scrollbar-thumb-rounded-full">
          <Outlet />
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-200">
          <Footer />
        </CardFooter>
      </Card>
    </main>
  )
}
