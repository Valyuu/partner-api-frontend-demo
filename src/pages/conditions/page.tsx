import { FC, useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { ConditionPageContent, Error, Loading } from '~/components'
import {
  NAVIGATION_BRANDS_PAGE_ENABLED,
  NAVIGATION_SHOW_NEXT_BUTTON_ON_QUESTIONS_PAGES,
  NavigationDestination,
  QUERY_LANGUAGE,
  QuestionSection,
} from '~/constants'
import { QuestionResultsStateType } from '~/interfaces'
import { useGetModelQuestions } from '~/queries'
import {
  productSelectionState,
  progressBarState,
  questionResultsState,
  questionSectionState,
  stepButtonsState,
} from '~/stores'

export const ModelConditionsPage: FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const sectionIndex = parseInt(searchParams.get('index') ?? '') || 0

  const { attribute: attributeStepCount, guidance: guidanceStepCount } = useSnapshot(questionSectionState.questionCount)

  const currentStep = (NAVIGATION_BRANDS_PAGE_ENABLED ? 4 : 3) + attributeStepCount + guidanceStepCount + sectionIndex

  const navigate = useNavigate()

  const { modelId } = useSnapshot(productSelectionState)

  const { [QuestionSection.Condition]: conditionResults, isFunctional } = useSnapshot(questionResultsState)
  const currentValue = conditionResults[sectionIndex]
  const { conditionId, optionId } = currentValue ?? {}

  const { data, isLoading, isError } = useGetModelQuestions({
    lang: QUERY_LANGUAGE,
    modelId: modelId!,
    enabled: !!modelId,
  })

  const conditionCount = data?.data?.conditionQuestions?.length ?? questionSectionState.questionCount.condition

  const goToPreviousPage = () => {
    if (window.history.length > 1) {
      navigate(NavigationDestination.HistoryBack)
    } else {
      if (sectionIndex > 0) {
        navigate({
          pathname: NavigationDestination.Conditions as const,
          search: `?index=${sectionIndex - 1}`,
        })
      } else {
        navigate({ pathname: NavigationDestination.Guidances as const, search: `?index=${guidanceStepCount - 1}` })
      }
    }
  }

  const goToNextPage = () => {
    if (sectionIndex < conditionCount - 1) {
      navigate({
        pathname: NavigationDestination.Conditions as const,
        search: `?index=${sectionIndex + 1}`,
      })
    } else {
      navigate(NavigationDestination.Confirmation)
    }
  }

  useLayoutEffect(() => {
    if (!modelId) {
      setTimeout(() => navigate(NavigationDestination.Models))
      return
    }

    if (isFunctional === false) {
      setTimeout(() => navigate(NavigationDestination.Problems))
      return
    } else if (isFunctional === undefined) {
      setTimeout(() => navigate({ pathname: NavigationDestination.Guidances as const, search: '?index=0' }))
      return
    }

    questionSectionState.current = QuestionSection.Condition
    questionSectionState.index = sectionIndex

    progressBarState.currentStep = currentStep
  }, [location.pathname, location.search])

  useEffect(() => {
    if (data?.data) {
      questionSectionState.questionCount.condition = data.data?.conditionQuestions.length
    }
  }, [data])

  useLayoutEffect(() => {
    Object.assign(stepButtonsState, {
      prev: {
        hidden: false,
        disabled: false,
        onClick: goToPreviousPage,
      },
      next: {
        hidden: !NAVIGATION_SHOW_NEXT_BUTTON_ON_QUESTIONS_PAGES,
        disabled: !conditionId || !optionId,
        onClick: () => {
          if (!conditionCount) {
            return
          }
          goToNextPage()
        },
      },
    })
  }, [conditionId, optionId, location.pathname, location.search, data])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  const handleConditionSelect = (selectedCondition: QuestionResultsStateType[QuestionSection.Condition][number]) => {
    questionResultsState[QuestionSection.Condition][sectionIndex] = selectedCondition
    if (
      selectedCondition?.conditionId &&
      selectedCondition?.optionId &&
      !NAVIGATION_SHOW_NEXT_BUTTON_ON_QUESTIONS_PAGES
    ) {
      goToNextPage()
    }
  }

  return (
    <ConditionPageContent
      data={data?.data?.conditionQuestions?.[sectionIndex]}
      currentValue={currentValue}
      onSelect={handleConditionSelect}
    />
  )
}
