import { TfiClose } from 'react-icons/tfi'
import { useSnapshot } from 'valtio'

import { Button, Progress } from '~/components'
import { progressBarStore } from '~/stores'
import { sendCloseEvent } from '~/utils'

export const Header = () => {
  const { currentStep, totalSteps } = useSnapshot(progressBarStore)

  return (
    <>
      <h1>Toestel inruilen</h1>
      <Progress value={(currentStep / totalSteps) * 100} className="absolute inset-x-0 bottom-0" />
      <Button size="icon" className="absolute right-7 top-7 size-8 rounded-sm bg-[#e6f5fd]" onClick={sendCloseEvent}>
        <TfiClose className="fill-black text-black" size={14} />
      </Button>
    </>
  )
}
