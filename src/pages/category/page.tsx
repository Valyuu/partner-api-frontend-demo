import { FC, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import smartphoneImg from '~/assets/images/category/smartphone.svg'
import smartwatchImg from '~/assets/images/category/smartwatch.svg'
import tabletImg from '~/assets/images/category/tablet.svg'
import { NavigationDestination, QUERY_LANGUAGE } from '~/constants'
import { useModels } from '~/queries'
import { progressBarStore, questionResultsStore, resetQuestionResultsStore, setFooterComponents } from '~/stores'

import { CategoryPageContent } from './content'

const categoriesFromEnv = import.meta.env.ALLOWED_CATEGORIES

export const CategoryPage: FC = () => {
  const navigate = useNavigate()
  const { categoryId } = useSnapshot(questionResultsStore)

  const currentStep = 1

  useLayoutEffect(() => {
    progressBarStore.currentStep = categoryId ? currentStep : 0

    setFooterComponents({
      poweredBy: false,
      prevButton: undefined,
      nextButton: {
        disabled: !categoryId,
        onClick: () => {
          navigate('/' + NavigationDestination.Model)
        },
      },
    })
  }, [categoryId])

  const [prefetchQueries, setPrefetchQueries] = useState(false)
  // Cache the brands or models results if the categoryId is selected

  useModels({
    lang: QUERY_LANGUAGE,
    categoryId: categoryId!,
    enabled: !!categoryId && prefetchQueries,
  })

  const handleCategorySelect = (selectedCategoryId?: string) => {
    questionResultsStore.categoryId = selectedCategoryId
    setPrefetchQueries(true)

    // If the categoryId is not the same as the selectedCategoryId, reset the modelId
    if (categoryId !== selectedCategoryId) {
      // Reset the store
      resetQuestionResultsStore(NavigationDestination.Category)
    }
  }

  const data = [
    {
      id: categoriesFromEnv.smartphone,
      name: 'Telefoon',
      image: smartphoneImg,
      icon: '',
    },
    {
      id: categoriesFromEnv.tablet,
      name: 'Tablet',
      image: tabletImg,
      icon: '',
    },
    {
      id: categoriesFromEnv.smartwatch,
      name: 'Smartwatch',
      image: smartwatchImg,
      icon: '',
    },
  ]

  return <CategoryPageContent data={data} currentValue={categoryId} onSelect={handleCategorySelect} />
}
