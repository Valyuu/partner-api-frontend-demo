import { set } from 'lodash-es'
import { FC, useEffect, useLayoutEffect } from 'react'
import { NavigationType, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { ModelAttributeQuestion } from '~/components'
import {
  NAVIGATION_BRANDS_PAGE_ENABLED,
  NAVIGATION_SHOW_NEXT_BUTTON_ON_QUESTIONS_PAGES,
  NavigationDestination,
  QUERY_LANGUAGE,
  QuestionSection,
} from '~/constants'
import { QuestionResultsStateType } from '~/interfaces'
import { useGetGeneralQuestions } from '~/queries'
import {
  productSelectionState,
  progressBarState,
  questionResultsState,
  questionSectionState,
  stepButtonsState,
} from '~/stores'
import { getVariantIdFromAttributeResults, resetStore } from '~/utils'

export const ModelAttributesPage: FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const sectionIndex = parseInt(searchParams.get('index') ?? '') || 0

  const currentStep = (NAVIGATION_BRANDS_PAGE_ENABLED ? 4 : 3) + sectionIndex

  const navigate = useNavigate()

  const navType = useNavigationType()

  const { modelId } = useSnapshot(productSelectionState)

  const attributeResults = useSnapshot(questionResultsState[QuestionSection.Attribute])
  const currentValue = attributeResults[sectionIndex]
  const { attributeId, optionId } = currentValue ?? {}

  const { data, isLoading, isError } = useGetGeneralQuestions({
    lang: QUERY_LANGUAGE,
    modelId: modelId!,
    enabled: !!modelId,
  })

  const attributeCount = data?.data?.attributeQuestions.length ?? questionSectionState.questionCount.attribute

  const goToPreviousPage = () => {
    if (window.history.length > 1) {
      navigate(NavigationDestination.HistoryBack)
    } else {
      if (sectionIndex > 0) {
        navigate({
          pathname: NavigationDestination.ModelAttributes as const,
          search: `?index=${sectionIndex - 1}`,
        })
      } else {
        navigate(NavigationDestination.Models)
      }
    }
  }

  const goToNextPage = () => {
    if (sectionIndex < attributeCount - 1) {
      navigate({
        pathname: NavigationDestination.ModelAttributes as const,
        search: `?index=${sectionIndex + 1}`,
      })
    } else {
      questionSectionState.current = QuestionSection.Guidance
      questionSectionState.index = 0
      navigate({ pathname: NavigationDestination.Guidances as const, search: `?index=0` })
    }
  }

  useLayoutEffect(() => {
    if (!modelId) {
      setTimeout(() => navigate(NavigationDestination.Models))
      return
    }

    questionSectionState.current = QuestionSection.Attribute
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
        onClick: goToPreviousPage,
      },
      next: {
        hidden: !NAVIGATION_SHOW_NEXT_BUTTON_ON_QUESTIONS_PAGES,
        disabled: !attributeId || !optionId,
        onClick: () => {
          if (!attributeCount) {
            return
          }
          goToNextPage()
        },
      },
    })
  }, [attributeId, optionId, location.pathname, location.search, data])

  if (isLoading) {
    return <div className="text-center">Vragen laden...</div>
  }

  if (isError) {
    return <div className="text-center text-red-500">Fout bij het laden van vragen</div>
  }

  const handleModelAttributeSelect = (
    selectedAttribute: QuestionResultsStateType[QuestionSection.Attribute][number]
  ) => {
    // If it's the last question in the section, get variantId
    if (sectionIndex === attributeCount - 1) {
      const variantId = getVariantIdFromAttributeResults({
        attributeResults: set([...attributeResults], sectionIndex, selectedAttribute),
        generalData: data!.data,
      })
      if (!variantId) {
        throw new Error('VariantId not found!')
      }
      productSelectionState.variantId = variantId
    } else {
      // If the attributeId and optionId are not the same as previously selected ones, reset the variantId and questionResults
      if (attributeId === selectedAttribute.attributeId && optionId !== selectedAttribute.optionId) {
        resetStore(NavigationDestination.ModelAttributes)
      }
    }
    questionResultsState[QuestionSection.Attribute][sectionIndex] = selectedAttribute
    if (
      selectedAttribute?.attributeId &&
      selectedAttribute?.optionId &&
      !NAVIGATION_SHOW_NEXT_BUTTON_ON_QUESTIONS_PAGES
    ) {
      goToNextPage()
    }
  }

  // Normalize data, make sure that if an attribute+option combination has no records in attributeCombinations, it's not shown
  const attributeCombinations = data?.data?.attributeCombinations

  // If there is only one combination and it has no choices, it means that the variantId is available
  if (
    attributeCombinations?.length === 1 &&
    attributeCombinations[0].choices.length === 0 &&
    attributeCombinations[0].variantId
  ) {
    const variantId = attributeCombinations[0].variantId
    productSelectionState.variantId = variantId
    if (navType === NavigationType.Pop) {
      setTimeout(goToPreviousPage)
    } else {
      setTimeout(goToNextPage)
    }
    return null
  }
  const attributeQuestions = data?.data?.attributeQuestions
  if (!attributeCombinations || !attributeQuestions) {
    return null
  }
  const selectedAttributesWithoutCurrent = attributeResults.filter((_, index) => index !== sectionIndex)
  const currentQuestion = attributeQuestions[sectionIndex]
  const questionData = {
    ...currentQuestion,
    options: currentQuestion.options.filter((option) => {
      const selectedAttributesWithCurrentOption = [
        ...selectedAttributesWithoutCurrent,
        { attributeId: currentQuestion.id, optionId: option.id },
      ]
      // Has at least one combination, which means variableId is available
      return attributeCombinations.some((combination) => {
        // Every selectedAttribute should be in the combination
        return selectedAttributesWithCurrentOption.every((selectedAttribute) => {
          return combination.choices.some(
            (choice) =>
              choice.attributeId === selectedAttribute.attributeId && choice.optionId === selectedAttribute.optionId
          )
        })
      })
    }),
  }

  return (
    <div className="p-4">
      <ModelAttributeQuestion data={questionData} currentValue={currentValue} onSelect={handleModelAttributeSelect} />
    </div>
  )
}
