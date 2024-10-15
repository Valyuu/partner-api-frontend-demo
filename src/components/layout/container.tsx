import { useLayoutEffect, useState } from 'react'
import { TfiClose } from 'react-icons/tfi'

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
        <div className="relative h-[40.9375rem] w-[47.5rem] overflow-hidden rounded-3xl bg-white">
          <iframe key={showIframe ? 'show' : 'hide'} src="/" className="size-full bg-transparent" />
          <Button
            size="icon"
            className="group absolute right-7 top-7 z-50 size-8 rounded-sm bg-[#e6f5fd] hover:bg-[#e6f5fd]"
            onClick={() => setShowIframe(false)}
          >
            <TfiClose className="fill-black text-black group-hover:stroke-[0.2px]" size={14} />
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => setShowIframe(true)}>Open Trade-In</Button>
        </div>
      )}
    </main>
  )
}
