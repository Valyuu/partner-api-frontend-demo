import { isNil } from 'lodash-es'
import { FC, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { Error, Loading } from '~/components'
import { NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useModelQuestions } from '~/queries'
import {
  correctQuestionCounts,
  progressBarStore,
  questionResultsStore,
  questionSectionStore,
  setFooterComponents,
} from '~/stores'

import { ProblemPageContent } from './content'

export const ProblemPage: FC = () => {
  const { [NavigationDestination.ModelAttribute]: attributeStepCount } = useSnapshot(questionSectionStore.questionCount)

  const currentStep = 3 + attributeStepCount

  const navigate = useNavigate()

  const { modelId } = useSnapshot(questionResultsStore)

  const {
    [NavigationDestination.Problem]: problemResults,
    isFunctional,
    [NavigationDestination.ModelAttribute]: attributeResults,
  } = useSnapshot(questionResultsStore)

  const currentValue = { isFunctional, problems: problemResults as string[] }

  const { data, isLoading, isError } = useModelQuestions({
    lang: QUERY_LANGUAGE,
    modelId: modelId!,
    enabled: !!modelId,
  })
  useLayoutEffect(() => {
    correctQuestionCounts(data?.data)
  }, [data])

  useLayoutEffect(() => {
    if (!modelId) {
      setTimeout(() => navigate('/' + NavigationDestination.Model))
      return
    }

    if (
      !isNil(attributeResults) &&
      !isNil(data?.data?.attributeQuestions) &&
      attributeResults.length !== data.data.attributeQuestions.length
    ) {
      setTimeout(() => navigate({ pathname: '/' + NavigationDestination.ModelAttribute, search: '?index=0' }))
      return
    }

    questionSectionStore.current = NavigationDestination.Problem
    questionSectionStore.index = 0

    progressBarStore.currentStep = currentStep
  }, [])

  const goToPreviousPage = () => {
    setTimeout(() => {
      navigate({ pathname: '/' + NavigationDestination.ModelAttribute, search: `?index=${attributeStepCount - 1}` })
    })
  }

  const goToNextPage = () => {
    if (questionResultsStore.isFunctional) {
      navigate({ pathname: '/' + NavigationDestination.Condition, search: '?index=0' })
    } else if (questionResultsStore.isFunctional === false) {
      navigate('/' + NavigationDestination.AddToCart)
    }
  }

  useLayoutEffect(() => {
    setFooterComponents({
      poweredBy: false,
      prevButton: {
        onClick: goToPreviousPage,
      },
      nextButton: {
        disabled: isNil(isFunctional) || (!isFunctional && !problemResults?.length),
        onClick: () => {
          goToNextPage()
        },
      },
    })
  }, [currentValue, isFunctional, problemResults?.length])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  const handleProblemSelect = ({ problems, isFunctional }: { problems: string[]; isFunctional?: boolean }) => {
    questionResultsStore[NavigationDestination.Problem] = problems
    questionResultsStore.isFunctional = isFunctional
  }

  return (
    <ProblemPageContent
      data={data?.data?.problemQuestions}
      currentValue={currentValue}
      onSelect={handleProblemSelect}
    />
  )
}
