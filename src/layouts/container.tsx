import { useLayoutEffect, useState } from 'react'

import { Button } from '~/components'

const textArt = `\x1b[38;2;50;50;251m
  ██╗   ██╗ █████╗ ██╗  ██╗   ██╗██╗   ██╗██╗   ██╗
  ██║   ██║██╔══██╗██║  ╚██╗ ██╔╝██║   ██║██║   ██║
  ██║   ██║███████║██║   ╚████╔╝ ██║   ██║██║   ██║
  ╚██╗ ██╔╝██╔══██║██║    ╚██╔╝  ██║   ██║██║   ██║
   ╚████╔╝ ██║  ██║███████╗██║   ╚██████╔╝╚██████╔╝
    ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝    ╚═════╝  ╚═════╝ 
  \x1b[0m`

export const ContainerLayout = () => {
  const [showIframe, setShowIframe] = useState(false)

  const handleMessage = (event: MessageEvent) => {
    if (event?.data?.eventType === 'valyuuCancelTradeIn') {
      setShowIframe(false)
      console.log(textArt)
      console.log(event.data)
    } else if (event?.data?.eventType === 'valyuuCreateTradeIn') {
      alert('Next button clicked, cart items have been logged to console')
      setShowIframe(false)
      console.log(textArt)
      console.log(event.data)
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <main className="relative flex h-screen w-screen items-center justify-center bg-[#4C4C4C] text-base text-white">
      {showIframe ? (
        <iframe
          key={showIframe ? 'show' : 'hide'}
          src="/"
          className="h-[40.9375rem] w-[47.5rem] overflow-hidden rounded-3xl bg-transparent"
        />
      ) : (
        <div>
          <Button onClick={() => setShowIframe(true)}>Open Trade-In</Button>
        </div>
      )}
    </main>
  )
}
