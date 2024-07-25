import { FC, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { ModelQuestion } from '~/components'
import { NAVIGATION_BRANDS_PAGE_ENABLED, NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useGetModels } from '~/queries'
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
      // If the modelId is not the same as the selectedModelId, reset the variantId
      resetStore(NavigationDestination.Models)
    }
  }

  const { data, isLoading, isError } = useGetModels({
    lang: QUERY_LANGUAGE,
    categoryId: categoryId!,
    brandId: brandId!,
    enabled: (NAVIGATION_BRANDS_PAGE_ENABLED ? !!brandId : true) && !!categoryId,
  })

  if (isLoading) {
    return <div className="text-center">Modellen laden...</div>
  }

  if (isError) {
    return <div className="text-center text-red-500">Fout bij het laden van modellen</div>
  }

  return <ModelQuestion data={data?.data} currentValue={modelId} onSelect={handleModelSelect} />
}
