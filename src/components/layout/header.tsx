import { useSnapshot } from 'valtio'

import { CardTitle, Progress } from '~/components'
import { progressBarState } from '~/stores'

export const Header = () => {
  const { currentStep, totalSteps } = useSnapshot(progressBarState)

  return (
    <>
      <CardTitle className="text-2xl font-bold">Ruil Je Gebruikte Elektronica In</CardTitle>
      <p className="text-sm">Powered by Valyuu</p>
      <Progress value={(currentStep / totalSteps) * 100} />
    </>
  )
}
