import { useSnapshot } from 'valtio'

import { Progress } from '~/components'
import { progressBarStore } from '~/stores'

export const Header = () => {
  const { currentStep, totalSteps } = useSnapshot(progressBarStore)

  return (
    <>
      <h1>Toestel inruilen</h1>
      <Progress value={(currentStep / totalSteps) * 100} className="absolute inset-x-0 bottom-0" />
    </>
  )
}
