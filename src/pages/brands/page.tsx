import { FC, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { BrandPageContent, Error, Loading } from '~/components'
import { NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useGetBrands, useGetModels } from '~/queries'
import { productSelectionState, progressBarState, stepButtonsState } from '~/stores'
import { resetStore } from '~/utils'

export const BrandsPage: FC = () => {
  const navigate = useNavigate()
  const { categoryId, brandId } = useSnapshot(productSelectionState)

  const currentStep = 2

  useLayoutEffect(() => {
    progressBarState.currentStep = currentStep

    if (!categoryId) {
      setTimeout(() => navigate(NavigationDestination.Categories))
      return
    }
  }, [])

  useLayoutEffect(() => {
    // Set step buttons state
    Object.assign(stepButtonsState, {
      prev: {
        hidden: false,
        disabled: false,
        onClick: () => {
          navigate(NavigationDestination.Categories)
        },
      },
      next: {
        hidden: false,
        disabled: !brandId,
        onClick: () => {
          navigate(NavigationDestination.Models)
        },
      },
    })

    // Set progressbar state
  }, [brandId])

  const { data, isLoading, isError } = useGetBrands({
    enabled: !!categoryId,
    categoryId: categoryId!,
    lang: QUERY_LANGUAGE,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  const handleBrandSelect = (selectedBrandId: string) => {
    productSelectionState.brandId = selectedBrandId
    // If the brandId is not the same as the selectedBrandId, reset the modelId
    if (brandId !== selectedBrandId) {
      resetStore(NavigationDestination.Brands)
    }

    // Cache the models results if the brandId is selected
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetModels({
      lang: QUERY_LANGUAGE,
      categoryId: categoryId!,
      brandId: selectedBrandId,
      enabled: !!selectedBrandId && !!categoryId,
    })
  }

  return <BrandPageContent data={data?.data} currentValue={brandId} onSelect={handleBrandSelect} />
}
