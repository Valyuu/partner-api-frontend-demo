import { NavigationDestination } from '~/constants'
import { createPersistedStore } from '~/utils'

export const QUESTION_RESULTS_STORE_KEY = 'valyuu_questionResultsStore'

export type QuestionResultsStoreType = {
  categoryId?: string
  modelId?: string
  modelName?: string
  modelImage?: string
  [NavigationDestination.ModelAttribute]: { attributeId: string; optionId: string }[]
  isFunctional?: boolean
  [NavigationDestination.Condition]: { conditionId: string; optionId: string }[]
  [NavigationDestination.Problem]: string[]
}

export const QUESTION_RESULTS_STORE_DEFAULT: QuestionResultsStoreType = {
  categoryId: undefined,
  modelId: undefined,
  [NavigationDestination.ModelAttribute]: [],
  isFunctional: undefined,
  [NavigationDestination.Condition]: [],
  [NavigationDestination.Problem]: [],
}

export const questionResultsStore = createPersistedStore<QuestionResultsStoreType>(
  QUESTION_RESULTS_STORE_KEY,
  QUESTION_RESULTS_STORE_DEFAULT
)

// Rest next question when current option changes
export const resetQuestionResultsStore = (from: NavigationDestination) => {
  switch (from) {
    case NavigationDestination.Summary:
    case NavigationDestination.AddToCart:
    case NavigationDestination.Index:
      questionResultsStore.categoryId = undefined
    case NavigationDestination.Category:
      questionResultsStore.modelId = undefined
      questionResultsStore.modelName = undefined
      questionResultsStore.modelImage = undefined
    case NavigationDestination.Model:
      questionResultsStore[NavigationDestination.ModelAttribute] = []
    case NavigationDestination.ModelAttribute:
      questionResultsStore[NavigationDestination.Problem] = []
      questionResultsStore.isFunctional = undefined
    case NavigationDestination.Problem:
      questionResultsStore[NavigationDestination.Condition] = []
  }
}
