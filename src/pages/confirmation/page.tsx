import { FC, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { ConfirmationPageContent, Error, Loading } from '~/components'
import { NavigationDestination, QUERY_LANGUAGE, QuestionSection } from '~/constants'
import { useGetTradeInItemData } from '~/queries'
import {
  productSelectionState,
  progressBarState,
  questionResultsState,
  questionSectionState,
  stepButtonsState,
} from '~/stores'
import { resetStore } from '~/utils'

export const ConfirmationPage: FC = () => {
  const navigate = useNavigate()

  const [tocAgreed, setTocAgreed] = useState(false)

  const { condition: conditionStepCount } = useSnapshot(questionSectionState.questionCount)
  const { modelId } = useSnapshot(productSelectionState)
  const questionResults = useSnapshot(questionResultsState)
  const { isFunctional } = questionResults
  const { totalSteps } = useSnapshot(progressBarState)

  const { data, isLoading, isError } = useGetTradeInItemData({
    lang: QUERY_LANGUAGE,
    isProductFunctional: isFunctional!,
    modelId: modelId!,
    attributes: questionResults[QuestionSection.Attribute] as { attributeId: string; optionId: string }[],
    conditions: isFunctional
      ? (questionResults[QuestionSection.Condition] as {
          conditionId: string
          optionId: string
        }[])
      : [],
    problems: isFunctional ? [] : (questionResults[QuestionSection.Problem] as string[]),
    enabled: Boolean(modelId && isFunctional !== undefined),
  })

  useLayoutEffect(() => {
    if (!modelId) {
      setTimeout(() => navigate(NavigationDestination.Models))
      return
    }

    progressBarState.currentStep = totalSteps
  }, [totalSteps])

  useLayoutEffect(() => {
    Object.assign(stepButtonsState, {
      prev: {
        hidden: false,
        disabled: false,
        onClick: () => {
          if (window.history.length > 1) {
            navigate(NavigationDestination.HistoryBack)
          } else if (isFunctional) {
            navigate({
              pathname: NavigationDestination.Conditions as const,
              search: `?index=${conditionStepCount - 1}`,
            })
          } else {
            navigate(NavigationDestination.Problems)
          }
        },
      },
      next: {
        hidden: false,
        disabled: !tocAgreed || !data,
        onClick: () => {
          alert('Data collected for createTradeIn has been logged to the console.')
          console.log({
            variantId: data?.data.variantId,
            price: data?.data.price,
            isProductFunctional: data?.data.isProductFunctional,
            conditionCombinationId: data?.data.conditionCombinationId,
            problemIds: data?.data.problemIds,
          })
        },
      },
    })
  }, [conditionStepCount, isFunctional, tocAgreed, data])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  const removeTradeInItem = () => {
    resetStore()
    navigate(NavigationDestination.Categories)
  }

  return <ConfirmationPageContent data={data?.data} setTocAgreed={setTocAgreed} removeTradeInItem={removeTradeInItem} />
}
