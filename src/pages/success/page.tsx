import { FC, useLayoutEffect } from 'react'
import { useSnapshot } from 'valtio'

import { cartStore, progressBarStore, setFooterComponents } from '~/stores'
import { sendCreateTradeInEvent } from '~/utils'

import { SuccessPageContent } from './content'

export const SuccessPage: FC = () => {
  const { totalSteps } = useSnapshot(progressBarStore)
  useLayoutEffect(() => {
    progressBarStore.currentStep = totalSteps
  }, [totalSteps])

  useLayoutEffect(() => {
    setFooterComponents({
      poweredBy: true,
      prevButton: undefined,
      nextButton: {
        textOverride: 'Verder met bestellen',
        onClick: () => {
          sendCreateTradeInEvent()
          cartStore.splice(0, cartStore.length)
        },
      },
    })
  }, [])
  return <SuccessPageContent />
}
