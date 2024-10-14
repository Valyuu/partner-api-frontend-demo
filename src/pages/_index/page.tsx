import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useModelQuestions } from '~/queries'
import {
  cartStore,
  correctQuestionCounts,
  progressBarStore,
  questionResultsStore,
  resetQuestionResultsStore,
  setFooterComponents,
} from '~/stores'

import { IndexPageContent } from './content'

export const IndexPage: FC = () => {
  const navigate = useNavigate()
  const cartItems = useSnapshot(cartStore)
  const {
    modelId,
    modelName,
    modelImage,
    isFunctional,
    [NavigationDestination.ModelAttribute]: modelAttributeResults,
    [NavigationDestination.Condition]: conditionResults,
  } = useSnapshot(questionResultsStore)

  const [currentSection, setCurrentSection] = useState<NavigationDestination>(NavigationDestination.ModelAttribute)
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(0)
  const { totalSteps } = useSnapshot(progressBarStore)

  const { data } = useModelQuestions({
    lang: QUERY_LANGUAGE,
    modelId: modelId!,
    enabled: !!modelId,
  })

  useLayoutEffect(() => {
    correctQuestionCounts(data?.data)
  }, [data])

  useLayoutEffect(() => {
    progressBarStore.currentStep = totalSteps
  }, [totalSteps])

  // Calculate next question of the saved item when we have question counts
  useEffect(() => {
    if (data?.data && modelId && modelName && modelImage) {
      const { attributeQuestions, conditionQuestions } = data.data

      let nextSection: NavigationDestination = NavigationDestination.ModelAttribute
      let nextIndex: number | undefined = 0

      // Calculate current position based on questionResultsStore
      if (isFunctional) {
        // If it's functional, that means it's the last question in the condition section
        if (conditionResults.length < conditionQuestions.length) {
          nextSection = NavigationDestination.Condition
          nextIndex = conditionResults.length
        } else {
          // If all condition questions are answered, go to the add to cart section
          nextSection = NavigationDestination.AddToCart
          nextIndex = undefined
        }
      } else if (modelAttributeResults.length < attributeQuestions.length) {
        // If there are still attribute questions to answer, go to the attribute section
        nextSection = NavigationDestination.ModelAttribute
        nextIndex = modelAttributeResults.length
      } else {
        // If all attribute questions are answered, go to the problem section
        nextSection = NavigationDestination.Problem
        nextIndex = undefined
      }

      if (nextSection !== currentSection || nextIndex !== currentIndex) {
        setCurrentSection(nextSection)
        setCurrentIndex(nextIndex)
      }
    }
  }, [data, modelId, modelName, modelImage, modelAttributeResults, conditionResults, isFunctional])

  // If the user still haven't chosen a model, redirect to the category page. But if there's already a finished cart item, go to the summary page.
  useEffect(() => {
    if (!modelId || !modelName || !modelImage) {
      setTimeout(() => {
        if (cartItems.length) {
          navigate('/' + NavigationDestination.Summary, { replace: true })
        } else {
          navigate('/' + NavigationDestination.Category, { replace: true })
        }
      })
    }
  }, [modelId, modelName, modelImage])

  useLayoutEffect(() => {
    setFooterComponents({
      poweredBy: false,
      prevButton: cartItems.length
        ? {
            textOverride: 'Nieuw apparaat inruilen',
            onClick: () => {
              resetQuestionResultsStore(NavigationDestination.Index)
              navigate('/' + NavigationDestination.Category, { replace: true })
            },
          }
        : undefined,
      nextButton: {
        textOverride: cartItems.length ? 'Naar inruiloverzicht' : 'Nieuw apparaat inruilen',
        onClick: () => {
          if (cartItems.length) {
            navigate('/' + NavigationDestination.Summary, { replace: true })
          } else {
            navigate('/' + NavigationDestination.Category, { replace: true })
            resetQuestionResultsStore(NavigationDestination.Index)
          }
        },
      },
    })
  }, [cartItems])

  if (!modelName || !modelImage) {
    return null
  }

  return (
    <IndexPageContent
      data={{
        name: modelName,
        image: modelImage,
        path: `/${currentSection}${currentIndex !== undefined ? `?index=${currentIndex}` : ''}`,
        replace: true,
      }}
    />
  )
}
