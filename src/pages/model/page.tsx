import { FC, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { Error } from '~/components'
import { NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useModelQuestions, useModels } from '~/queries'
import { progressBarStore, questionResultsStore, resetQuestionResultsStore, setFooterComponents } from '~/stores'

import { ModelPageContent } from './content'

export const ModelPage: FC = () => {
  const navigate = useNavigate()

  const currentStep = 2

  const { categoryId, modelId } = useSnapshot(questionResultsStore)

  const goToPreviousPage = () => {
    navigate('/' + NavigationDestination.Category)
  }

  const goToNextPage = () => {
    navigate({ pathname: '/' + NavigationDestination.ModelAttribute, search: '?index=0' })
  }

  useLayoutEffect(() => {
    progressBarStore.currentStep = currentStep

    if (!categoryId) {
      setTimeout(() => navigate('/' + NavigationDestination.Category))
      return
    }
  }, [])

  useLayoutEffect(() => {
    setFooterComponents({
      poweredBy: false,
      prevButton: {
        onClick: goToPreviousPage,
      },
      nextButton: {
        disabled: !modelId,
        onClick: goToNextPage,
      },
    })
  }, [modelId])

  const [prefetchQueries, setPrefetchQueries] = useState(false)
  // Cache the model questions results if the modelId is selected
  useModelQuestions({
    lang: QUERY_LANGUAGE,
    modelId: modelId!,
    enabled: !!modelId && prefetchQueries,
  })

  const handleModelSelect = (selectedModelId: string) => {
    questionResultsStore.modelId = selectedModelId
    const model = data?.data.find((model) => model.id === selectedModelId)
    questionResultsStore.modelName = model?.name
    questionResultsStore.modelImage = model?.image
    if (selectedModelId !== modelId) {
      // Reset the store
      resetQuestionResultsStore(NavigationDestination.Model)
    }
    setPrefetchQueries(true)
  }

  const { data, isError } = useModels({
    lang: QUERY_LANGUAGE,
    categoryId: categoryId!,
    enabled: !!categoryId,
  })

  if (isError) {
    return <Error />
  }

  return (
    <ModelPageContent data={data?.data} currentValue={modelId} onSelect={handleModelSelect} onConfirm={goToNextPage} />
  )
}
