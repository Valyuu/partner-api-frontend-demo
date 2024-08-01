import { FC, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { Error, Loading, ModelPageContent } from '~/components'
import { NAVIGATION_BRANDS_PAGE_ENABLED, NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useGetConditionQuestions, useGetGeneralQuestions, useGetModels, useGetProblemQuestions } from '~/queries'
import { productSelectionState, progressBarState, stepButtonsState } from '~/stores'
import { resetStore } from '~/utils'

export const ModelsPage: FC = () => {
  const navigate = useNavigate()

  const currentStep = NAVIGATION_BRANDS_PAGE_ENABLED ? 3 : 2

  const { brandId, categoryId, modelId } = useSnapshot(productSelectionState)

  useLayoutEffect(() => {
    progressBarState.currentStep = currentStep

    if (!categoryId) {
      setTimeout(() => navigate(NavigationDestination.Categories))
      return
    }

    if (NAVIGATION_BRANDS_PAGE_ENABLED && !brandId) {
      setTimeout(() => navigate(NavigationDestination.Brands))
      return
    }
  }, [])

  useLayoutEffect(() => {
    Object.assign(stepButtonsState, {
      prev: {
        hidden: false,
        disabled: false,
        onClick: () => {
          if (window.history.length > 1) {
            navigate(NavigationDestination.HistoryBack)
          } else {
            if (NAVIGATION_BRANDS_PAGE_ENABLED) {
              navigate(NavigationDestination.Brands)
            } else {
              navigate(NavigationDestination.Categories)
            }
          }
        },
      },
      next: {
        hidden: false,
        disabled: !modelId,
        onClick: () => {
          navigate({ pathname: NavigationDestination.ModelAttributes as const, search: '?index=0' })
        },
      },
    })
  }, [modelId])

  const handleModelSelect = (selectedModelId: string) => {
    productSelectionState.modelId = selectedModelId
    if (selectedModelId !== modelId) {
      // If the modelId is not the same as the selectedModelId, reset the question results
      resetStore(NavigationDestination.Models)
      // Eliminate the forward navigation history
    }

    // Cache the general questions results if the modelId is selected
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetGeneralQuestions({
      lang: QUERY_LANGUAGE,
      modelId: selectedModelId!,
      enabled: !!selectedModelId,
    })
    // Cache the condition questions results if the modelId is selected
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetConditionQuestions({
      lang: QUERY_LANGUAGE,
      modelId: selectedModelId!,
      enabled: !!selectedModelId,
    })
    // Cache the problem questions results if the modelId is selected
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetProblemQuestions({
      lang: QUERY_LANGUAGE,
      modelId: selectedModelId!,
      enabled: !!selectedModelId,
    })
  }

  const { data, isLoading, isError } = useGetModels({
    lang: QUERY_LANGUAGE,
    categoryId: categoryId!,
    brandId: brandId!,
    enabled: (NAVIGATION_BRANDS_PAGE_ENABLED ? !!brandId : true) && !!categoryId,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return <ModelPageContent data={data?.data} currentValue={modelId} onSelect={handleModelSelect} />
}
