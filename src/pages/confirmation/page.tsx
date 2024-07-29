import { isFunction } from 'lodash-es'
import { FC, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { NavigationDestination, QUERY_LANGUAGE, QuestionSection } from '~/constants'
import { useGetVariantPrice } from '~/queries'
import { productSelectionState, questionResultsState } from '~/stores'

export const ConfirmationPage: FC = () => {
  const navigate = useNavigate()

  const questionResults = useSnapshot(questionResultsState)
  const { isFunctional } = questionResults
  const { variantId } = useSnapshot(productSelectionState)

  questionResults.condition

  const getVariantPriceInput = {
    lang: QUERY_LANGUAGE,
    variantId: variantId!,
    isProductFunctional: isFunctional!,
    conditions: isFunctional
      ? (questionResults[QuestionSection.Condition] as {
          conditionId: string
          optionId: string
        }[])
      : [],
    problems: isFunctional ? [] : (questionResults[QuestionSection.Problem] as string[]),
    enabled: Boolean(variantId && isFunction !== undefined),
  }
  const { data, isLoading, isError } = useGetVariantPrice(getVariantPriceInput)

  useLayoutEffect(() => {
    if (!variantId) {
      setTimeout(() => navigate(NavigationDestination.Models))
      return
    }
    // navigationState.buttons.prev.hidden = false
    // navigationState.buttons.prev.disabled = false
    // navigationState.buttons.prev.navigateTo = window.history.length
    //   ? {
    //       destination: NavigationDestination.HistoryBack,
    //       index: undefined,
    //     }
    //   : isFunctional
    //     ? {
    //         destination: NavigationDestination.Conditions,
    //         index: questionResults[QuestionSection.Condition].length - 1,
    //       }
    //     : {
    //         destination: NavigationDestination.Problems,
    //         index: undefined,
    //       }
    // navigationState.buttons.next.hidden = true
    // navigationState.progress.currentStep = Object.values(stepCount).reduce((acc, val) => acc + val, 0)
  }, [])

  return (
    <div className="p-4">
      Answers:
      <pre>{JSON.stringify(questionResults)}</pre>
    </div>
  )
}
