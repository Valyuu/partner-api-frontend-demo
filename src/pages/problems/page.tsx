import { FC, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { ProblemQuestion } from '~/components'
import { NAVIGATION_BRANDS_PAGE_ENABLED, NavigationDestination, QUERY_LANGUAGE, QuestionSection } from '~/constants'
import { useGetProblemQuestions } from '~/queries'
import {
  productSelectionState,
  progressBarState,
  questionResultsState,
  questionSectionState,
  stepButtonsState,
} from '~/stores'

export const ProblemsPage: FC = () => {
  const {
    attribute: attributeStepCount,
    guidance: guidanceStepCount,
    condition: conditionStepCount,
  } = useSnapshot(questionSectionState.questionCount)

  const currentStep = (NAVIGATION_BRANDS_PAGE_ENABLED ? 4 : 3) + attributeStepCount + guidanceStepCount

  const navigate = useNavigate()

  const { modelId } = useSnapshot(productSelectionState)

  const { [QuestionSection.Problem]: problemResults, isFunctional } = useSnapshot(questionResultsState)

  const currentValue = [...problemResults]

  const { data, isLoading, isError } = useGetProblemQuestions({
    lang: QUERY_LANGUAGE,
    modelId: modelId!,
    enabled: !!modelId,
  })

  useLayoutEffect(() => {
    if (!modelId) {
      setTimeout(() => navigate(NavigationDestination.Models))
      return
    }

    if (isFunctional === true) {
      setTimeout(() => navigate({ pathname: NavigationDestination.Conditions as const, search: '?index=0' }))
      return
    } else if (isFunctional === undefined) {
      setTimeout(() => navigate({ pathname: NavigationDestination.Guidances as const, search: '?index=0' }))
      return
    }

    questionSectionState.current = QuestionSection.Problem
    questionSectionState.index = 0

    progressBarState.currentStep = currentStep
  }, [location.pathname, location.search])

  const goToPreviousPage = () => {
    if (window.history.length > 1) {
      navigate(NavigationDestination.HistoryBack)
    } else {
      navigate({ pathname: NavigationDestination.Guidances as const, search: `?index=${conditionStepCount - 1}` })
    }
  }

  const goToNextPage = () => {
    navigate(NavigationDestination.Confirmation as const)
  }

  useLayoutEffect(() => {
    Object.assign(stepButtonsState, {
      prev: {
        hidden: false,
        disabled: false,
        onClick: goToPreviousPage,
      },
      next: {
        hidden: false,
        disabled: !currentValue?.length,
        onClick: () => {
          if (!currentValue?.length) {
            return
          }
          goToNextPage()
        },
      },
    })
  }, [currentValue, location.pathname, location.search, data])

  if (isLoading) {
    return <div className="text-center">Vragen laden...</div>
  }

  if (isError) {
    return <div className="text-center text-red-500">Fout bij het laden van vragen</div>
  }

  const handleProblemSelect = (problems: string[]) => {
    questionResultsState[QuestionSection.Problem] = problems
  }

  return (
    <div className="p-4">
      <ProblemQuestion data={data?.data} currentValue={currentValue} onSelect={handleProblemSelect} />
    </div>
  )
}
