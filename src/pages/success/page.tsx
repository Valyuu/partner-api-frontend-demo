import { FC, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { NavigationDestination } from '~/constants'
import { cartStore, progressBarStore, setFooterComponents } from '~/stores'
import { sendCreateTradeInEvent } from '~/utils'

import { SuccessPageContent } from './content'

export const SuccessPage: FC = () => {
  const navigate = useNavigate()
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
          setTimeout(() => {
            cartStore.splice(0, cartStore.length)
            navigate('/' + NavigationDestination.Category)
          }, 100)
        },
      },
    })
  }, [])
  return <SuccessPageContent />
}
