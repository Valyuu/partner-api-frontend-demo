import { FC, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { CategoryPageContent, Error, Loading } from '~/components'
import { NAVIGATION_BRANDS_PAGE_ENABLED, NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useGetBrands, useGetCategories, useGetModels } from '~/queries'
import { productSelectionState, progressBarState, stepButtonsState } from '~/stores'
import { resetStore } from '~/utils'

export const CategoriesPage: FC = () => {
  const navigate = useNavigate()
  const { categoryId } = useSnapshot(productSelectionState)

  const currentStep = 1

  useLayoutEffect(() => {
    progressBarState.currentStep = currentStep
  }, [])

  useLayoutEffect(() => {
    Object.assign(stepButtonsState, {
      prev: { hidden: true, disabled: true, onClick: () => {} },
      next: {
        hidden: false,
        disabled: !categoryId,
        onClick: () => {
          navigate(NAVIGATION_BRANDS_PAGE_ENABLED ? NavigationDestination.Brands : NavigationDestination.Models)
        },
      },
    })
  }, [categoryId])

  const handleCategorySelect = (selectedCategoryId?: string) => {
    productSelectionState.categoryId = selectedCategoryId
    // If the categoryId is not the same as the selectedCategoryId, reset the brandId and modelId
    if (categoryId !== selectedCategoryId) {
      resetStore(NavigationDestination.Categories)
      // Eliminate the forward navigation history
    }
    // Cache the brands or models results if the categoryId is selected
    if (NAVIGATION_BRANDS_PAGE_ENABLED) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useGetBrands({
        enabled: !!selectedCategoryId,
        categoryId: selectedCategoryId!,
        lang: QUERY_LANGUAGE,
      })
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useGetModels({
        lang: QUERY_LANGUAGE,
        categoryId: selectedCategoryId!,
        enabled: !!selectedCategoryId,
      })
    }
  }

  const { data, isLoading, isError } = useGetCategories({ lang: QUERY_LANGUAGE })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return <CategoryPageContent data={data?.data} currentValue={categoryId} onSelect={handleCategorySelect} />
}
