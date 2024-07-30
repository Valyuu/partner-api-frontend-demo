import { FC, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { CategoryPageContent, Error, Loading } from '~/components'
import { NAVIGATION_BRANDS_PAGE_ENABLED, NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useGetCategories } from '~/queries'
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
