import { cloneDeep } from 'lodash-es'
import { FC, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'uuid-random'
import { useSnapshot } from 'valtio'

import { Error, Loading } from '~/components'
import { NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useTradeInItemData } from '~/queries'
import {
  cartStore,
  CartStoreItemType,
  footerStore,
  progressBarStore,
  questionResultsStore,
  resetQuestionResultsStore,
  setFooterComponents,
} from '~/stores'

import { AddToCartPageContent } from './content'

export const AddToCartPage: FC = () => {
  const navigate = useNavigate()

  const { modelId } = useSnapshot(questionResultsStore)
  const questionResults = useSnapshot(questionResultsStore)
  const { isFunctional } = questionResults
  const { totalSteps } = useSnapshot(progressBarStore)
  const cartItems = useSnapshot(cartStore)
  const [ineligibleProduct, setIneligibleProduct] = useState<Components.Schemas.V1GetTradeInItemDataOutput>()

  const { data, isLoading, isError } = useTradeInItemData({
    lang: QUERY_LANGUAGE,
    isProductFunctional: isFunctional!,
    modelId: modelId!,
    attributes: questionResults[NavigationDestination.ModelAttribute] as { attributeId: string; optionId: string }[],
    conditions: isFunctional
      ? (questionResults[NavigationDestination.Condition] as {
          conditionId: string
          optionId: string
        }[])
      : [],
    problems: isFunctional ? [] : (questionResults[NavigationDestination.Problem] as string[]),
    enabled: Boolean(modelId && isFunctional !== undefined),
  })

  const cartItemAdded = useRef(false)

  // Add data to the cart
  useLayoutEffect(() => {
    if (data?.data && !cartItemAdded.current) {
      if (footerStore?.nextButton) {
        footerStore.nextButton.disabled = false
      }

      // Hardcoded for now, until we have a way to select the payment plan
      const paymentPlan = data.data.paymentPlans.find((plan) => plan.plan === 'C2B')

      if (paymentPlan) {
        const cartItem: CartStoreItemType = {
          id: uuid(),
          data: {
            variantId: data.data.variantId,
            price: paymentPlan.price,
            plan: paymentPlan.plan,
            ...(data.data.isProductFunctional
              ? { isProductFunctional: true as const, conditionCombinationId: data.data.conditionCombinationId! }
              : { isProductFunctional: false as const, problemIds: data.data.problemIds! }),
          },
          display: {
            name: data.data.name,
            image: data.data.image,
            attributes: [...data.data.attributes, ...data.data.answers],
          },
        }

        cartStore.push(cartItem)
        cartItemAdded.current = true

        // Reset the question result to prevent the user from seeing the empty cart add to cart page
        setTimeout(() => {
          resetQuestionResultsStore(NavigationDestination.Summary)
        }, 200)

        navigate('/' + NavigationDestination.Summary, { replace: true })
      } else {
        setIneligibleProduct(cloneDeep(data.data))
        resetQuestionResultsStore(NavigationDestination.AddToCart)
      }
    }
  }, [data])

  useLayoutEffect(() => {
    progressBarStore.currentStep = totalSteps
  }, [totalSteps])

  useLayoutEffect(() => {
    setFooterComponents({
      poweredBy: false,
      prevButton: undefined,
      nextButton: {
        disabled: true,
        textOverride: cartItems.length ? 'Naar inruiloverzicht' : 'Nieuw apparaat inruilen',
        onClick: () => {
          navigate('/' + (cartItems.length ? NavigationDestination.Summary : NavigationDestination.Category))
        },
      },
    })
  }, [])

  if (!modelId || isFunctional === undefined) {
    if (!ineligibleProduct) {
      navigate('/' + NavigationDestination.Category, { replace: true })
      return null
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return <AddToCartPageContent data={ineligibleProduct} />
}
