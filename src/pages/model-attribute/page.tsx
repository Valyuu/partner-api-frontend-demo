import { FC, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { Error, Loading } from '~/components'
import { NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useModelQuestions } from '~/queries'
import {
  correctQuestionCounts,
  progressBarStore,
  questionResultsStore,
  QuestionResultsStoreType,
  questionSectionStore,
  resetQuestionResultsStore,
  setFooterComponents,
} from '~/stores'
import { getFilteredAttributeData } from '~/utils'

import { ModelAttributePageContent } from './content'

export const ModelAttributePage: FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const sectionIndex = parseInt(searchParams.get('index') ?? '') || 0

  const currentStep = 3 + sectionIndex

  const navigate = useNavigate()

  const { modelId } = useSnapshot(questionResultsStore)

  const attributeResults = useSnapshot(questionResultsStore[NavigationDestination.ModelAttribute])
  const currentValue = attributeResults[sectionIndex]
  const { attributeId, optionId } = currentValue ?? {}

  const { data, isLoading, isError } = useModelQuestions({
    lang: QUERY_LANGUAGE,
    modelId: modelId!,
    enabled: !!modelId,
  })
  useLayoutEffect(() => {
    correctQuestionCounts(data?.data)
  }, [data])

  const attributeCount =
    data?.data?.attributeQuestions.length ?? questionSectionStore.questionCount[NavigationDestination.ModelAttribute]

  const goToPreviousPage = (replace = false) => {
    if (sectionIndex > 0) {
      navigate(
        {
          pathname: '/' + NavigationDestination.ModelAttribute,
          search: `?index=${sectionIndex - 1}`,
        },
        { replace }
      )
    } else {
      navigate('/' + NavigationDestination.Model)
    }
  }

  const goToNextPage = (replace = false) => {
    if (sectionIndex < attributeCount - 1) {
      navigate({
        pathname: '/' + NavigationDestination.ModelAttribute,
        search: `?index=${sectionIndex + 1}`,
      })
    } else {
      questionSectionStore.current = NavigationDestination.Problem
      questionSectionStore.index = 0
      navigate('/' + NavigationDestination.Problem, { replace })
    }
  }

  useLayoutEffect(() => {
    if (!modelId) {
      setTimeout(() => navigate('/' + NavigationDestination.Model))
      return
    }

    if (data?.data && !data.data.isEligibleForTradeIn) {
      setTimeout(() => navigate('/' + NavigationDestination.AddToCart))
      return
    }

    questionSectionStore.current = NavigationDestination.ModelAttribute
    questionSectionStore.index = sectionIndex

    progressBarStore.currentStep = currentStep
  }, [location.pathname, location.search])

  useLayoutEffect(() => {
    setFooterComponents({
      poweredBy: false,
      prevButton: {
        onClick: goToPreviousPage,
      },
      nextButton: {
        invisible: !attributeId || !optionId,
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
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  const handleModelAttributeSelect = (
    selectedAttribute: QuestionResultsStoreType[NavigationDestination.ModelAttribute][number]
  ) => {
    // If the attributeId and optionId are not the same as previously selected ones, reset the  questionResults
    if (attributeId === selectedAttribute.attributeId && optionId !== selectedAttribute.optionId) {
      // Reset the store
      resetQuestionResultsStore(NavigationDestination.ModelAttribute)
    }

    questionResultsStore[NavigationDestination.ModelAttribute][sectionIndex] = selectedAttribute
    if (selectedAttribute?.attributeId && selectedAttribute?.optionId) {
      goToNextPage()
    }
  }

  // Normalize data, make sure that if an attribute+option combination has no records in attributeCombinations, it's not shown
  const attributeCombinations = data?.data?.attributeCombinations

  // If there is only one combination and it has no choices, it means that the variantId is available
  if (attributeCombinations?.length === 1 && attributeCombinations[0].choices.length === 0) {
    // By replacing the current page with the next one, we prevent the user from going back to the current page
    goToNextPage(true)
    return null
  }

  const attributeQuestions = data?.data?.attributeQuestions
  if (!attributeCombinations || !attributeQuestions) {
    return null
  }
  const questionData = getFilteredAttributeData({
    attributeQuestions,
    sectionIndex,
    attributeResults: attributeResults as { attributeId: string; optionId: string }[],
    attributeCombinations,
  })

  return (
    <ModelAttributePageContent data={questionData} currentValue={currentValue} onSelect={handleModelAttributeSelect} />
  )
}
