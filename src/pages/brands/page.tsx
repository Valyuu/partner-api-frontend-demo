import { FC, useLayoutEffect, useState } from 'react'
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

  const [prefetchQueries, setPrefetchQueries] = useState(false)
  // Cache the models results if the brandId is selected
  useGetModels({
    lang: QUERY_LANGUAGE,
    categoryId: categoryId!,
    brandId: brandId,
    enabled: !!brandId && !!categoryId && prefetchQueries,
  })

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
    lang: QUERY_LANGUAGE,
    categoryId: categoryId!,
    enabled: !!categoryId,
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
      // Eliminate the forward navigation history
      navigate('.', { replace: true })
    }
    setPrefetchQueries(true)
  }

  return <BrandPageContent data={data?.data} currentValue={brandId} onSelect={handleBrandSelect} />
}
