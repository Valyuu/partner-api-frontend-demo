import { FC, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { NavigationDestination } from '~/constants'
import { cartStore, progressBarStore, setFooterComponents, tocStore } from '~/stores'

import { SummaryPageContent } from './content'

export const SummaryPage: FC = () => {
  const navigate = useNavigate()

  const cart = useSnapshot(cartStore)
  const cartItemCount = cart.length
  const { tocChecked } = useSnapshot(tocStore)

  const { totalSteps } = useSnapshot(progressBarStore)

  useEffect(() => {
    return () => {
      tocStore.showErrors = false
    }
  }, [])

  useLayoutEffect(() => {
    progressBarStore.currentStep = totalSteps
  }, [totalSteps])

  useLayoutEffect(() => {
    setFooterComponents({
      poweredBy: true,
      prevButton: undefined,
      nextButton: {
        textOverride: cartItemCount ? 'Bevestigen' : 'Product toevoegen',
        onClick: () => {
          if (cartItemCount) {
            if (tocChecked) {
              navigate('/' + NavigationDestination.Success)
              return
            } else {
              tocStore.showErrors = false
              setTimeout(() => {
                tocStore.showErrors = true
              })
              return
            }
          } else {
            navigate('/' + NavigationDestination.Category)
          }
        },
      },
    })
  }, [tocChecked, cartItemCount])

  return <SummaryPageContent />
}
