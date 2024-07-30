import { FC, useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { snapshot, useSnapshot } from 'valtio'

import { Error, GuidancePageContent, Loading } from '~/components'
import {
  GuidanceQuestionOptions,
  NAVIGATION_BRANDS_PAGE_ENABLED,
  NAVIGATION_SHOW_NEXT_BUTTON_ON_QUESTIONS_PAGES,
  NavigationDestination,
  QUERY_LANGUAGE,
  QuestionSection,
} from '~/constants'
import { useGetGeneralQuestions } from '~/queries'
import {
  productSelectionState,
  progressBarState,
  questionResultsState,
  questionSectionState,
  stepButtonsState,
} from '~/stores'
import { resetStore } from '~/utils'

export const ModelGuidancesPage: FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const sectionIndex = parseInt(searchParams.get('index') ?? '') || 0

  const { attribute: modelAttributeStepCount } = useSnapshot(questionSectionState.questionCount)

  const currentStep = (NAVIGATION_BRANDS_PAGE_ENABLED ? 4 : 3) + modelAttributeStepCount + sectionIndex

  const navigate = useNavigate()

  const { modelId } = useSnapshot(productSelectionState)

  const guidanceResults = useSnapshot(questionResultsState[QuestionSection.Guidance])
  const currentValue = guidanceResults[sectionIndex]

  const { data, isLoading, isError } = useGetGeneralQuestions({
    lang: QUERY_LANGUAGE,
    modelId: modelId!,
    enabled: !!modelId,
  })

  const guidanceCount = data?.data?.guidanceQuestions.length ?? questionSectionState.questionCount.guidance

  const goToNextPage = () => {
    if (sectionIndex < guidanceCount - 1) {
      navigate({
        pathname: NavigationDestination.Guidances as const,
        search: `?index=${sectionIndex + 1}`,
      })
    } else {
      const { isFunctional } = snapshot(questionResultsState)
      questionSectionState.current = isFunctional ? QuestionSection.Condition : QuestionSection.Problem
      questionSectionState.index = 0
      navigate(isFunctional ? NavigationDestination.Conditions : NavigationDestination.Problems)
    }
  }

  useLayoutEffect(() => {
    if (!modelId) {
      setTimeout(() => navigate(NavigationDestination.Models))
      return
    }

    questionSectionState.current = QuestionSection.Guidance
    questionSectionState.index = sectionIndex

    progressBarState.currentStep = currentStep
  }, [location.pathname, location.search])

  useEffect(() => {
    if (data?.data) {
      questionSectionState.questionCount.attribute = data.data.attributeQuestions.length
      questionSectionState.questionCount.guidance = data.data.guidanceQuestions.length
    }
  }, [data])

  useLayoutEffect(() => {
    Object.assign(stepButtonsState, {
      prev: {
        hidden: false,
        disabled: false,
        onClick: () => {
          if (window.history.length > 1) {
            navigate(NavigationDestination.HistoryBack)
          } else {
            if (sectionIndex > 0) {
              navigate({
                pathname: NavigationDestination.Guidances as const,
                search: `?index=${sectionIndex - 1}`,
              })
            } else if (modelAttributeStepCount) {
              navigate({
                pathname: NavigationDestination.ModelAttributes as const,
                search: `?index=${modelAttributeStepCount - 1}`,
              })
            } else {
              navigate(NavigationDestination.Models)
            }
          }
        },
      },
      next: {
        hidden: !NAVIGATION_SHOW_NEXT_BUTTON_ON_QUESTIONS_PAGES,
        disabled: !currentValue,
        onClick: () => {
          if (!guidanceCount) {
            return
          }
          goToNextPage()
        },
      },
    })
  }, [currentValue, location.pathname, location.search, data])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  const handleGuidanceSelect = (value: GuidanceQuestionOptions) => {
    // If it's the last question in the section, get isFunctional value
    if (sectionIndex === guidanceCount - 1) {
      const isFunctional = [...guidanceResults.filter((_, index) => index !== sectionIndex), value].every(
        (result) => result === GuidanceQuestionOptions.Yes
      )
      questionResultsState.isFunctional = isFunctional
    } else {
      // If the answer is no, reset isFunctional, condition and problem results
      if (value === GuidanceQuestionOptions.No) {
        resetStore(NavigationDestination.Guidances)
        // Eliminate the forward navigation history
      }
    }
    questionResultsState[QuestionSection.Guidance][sectionIndex] = value
    if (!NAVIGATION_SHOW_NEXT_BUTTON_ON_QUESTIONS_PAGES) {
      goToNextPage()
    }
  }

  const questionData = data?.data?.guidanceQuestions[sectionIndex]
  return <GuidancePageContent data={questionData} currentValue={currentValue} onSelect={handleGuidanceSelect} />
}
