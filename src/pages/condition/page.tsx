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
  setFooterComponents,
} from '~/stores'

import { ConditionPageContent } from './content'

export const ConditionPage: FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const sectionIndex = parseInt(searchParams.get('index') ?? '') || 0

  const {
    [NavigationDestination.ModelAttribute]: attributeStepCount,
    [NavigationDestination.Problem]: problemStepCount,
  } = useSnapshot(questionSectionStore.questionCount)

  const currentStep = 3 + attributeStepCount + problemStepCount + sectionIndex

  const navigate = useNavigate()

  const { modelId } = useSnapshot(questionResultsStore)

  const { [NavigationDestination.Condition]: conditionResults, isFunctional } = useSnapshot(questionResultsStore)
  const currentValue = conditionResults[sectionIndex]
  const { conditionId, optionId } = currentValue ?? {}

  const { data, isLoading, isError } = useModelQuestions({
    lang: QUERY_LANGUAGE,
    modelId: modelId!,
    enabled: !!modelId,
  })
  useLayoutEffect(() => {
    correctQuestionCounts(data?.data)
  }, [data])

  const conditionCount = data?.data?.conditionQuestions?.length ?? questionSectionStore.questionCount.condition

  const goToPreviousPage = () => {
    if (sectionIndex > 0) {
      navigate({
        pathname: '/' + NavigationDestination.Condition,
        search: `?index=${sectionIndex - 1}`,
      })
    } else {
      navigate('/' + NavigationDestination.Problem)
    }
  }

  const goToNextPage = () => {
    setTimeout(() => {
      if (sectionIndex < conditionCount - 1) {
        navigate({
          pathname: '/' + NavigationDestination.Condition,
          search: `?index=${sectionIndex + 1}`,
        })
      } else {
        navigate('/' + NavigationDestination.AddToCart)
      }
    })
  }

  useLayoutEffect(() => {
    if (!modelId) {
      setTimeout(() => navigate('/' + NavigationDestination.Model))
      return
    }

    if (!isFunctional) {
      setTimeout(() => navigate('/' + NavigationDestination.Problem))
      return
    }

    questionSectionStore.current = NavigationDestination.Condition
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
        invisible: !conditionId || !optionId,
        disabled: !conditionId || !optionId,
        onClick: () => {
          if (conditionCount) {
            goToNextPage()
          }
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

  const handleConditionSelect = (
    selectedCondition: QuestionResultsStoreType[NavigationDestination.Condition][number]
  ) => {
    questionResultsStore[NavigationDestination.Condition][sectionIndex] = selectedCondition
    if (selectedCondition?.conditionId && selectedCondition?.optionId) {
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
