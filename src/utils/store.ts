import { proxy, subscribe } from 'valtio'

import { NavigationDestination, QuestionSection } from '~/constants'
import { productSelectionState, QUESTION_RESULTS_STATE_DEFAULT, questionResultsState } from '~/stores'

export const createPersistedStore = <T extends object>(key: string, initialState: T) => {
  // Try to load the initial state from sessionStorage
  const savedState = sessionStorage.getItem(key)
  const state = proxy<T>(savedState ? JSON.parse(savedState) : initialState)

  // Subscribe to changes and save to sessionStorage
  subscribe(state, () => {
    sessionStorage.setItem(key, JSON.stringify(state))
  })

  return state
}

export const resetStore = (at: NavigationDestination) => {
  switch (at) {
    case NavigationDestination.Categories:
      productSelectionState.brandId = undefined
    case NavigationDestination.Brands:
      productSelectionState.modelId = undefined
    case NavigationDestination.Models:
      questionResultsState[QuestionSection.Attribute] = []
      questionResultsState[QuestionSection.Guidance] = []
    case NavigationDestination.ModelAttributes:
      productSelectionState.variantId = undefined
      Object.assign(questionResultsState, QUESTION_RESULTS_STATE_DEFAULT)
      break
    case NavigationDestination.Guidances:
      questionResultsState[QuestionSection.Condition] = []
      questionResultsState[QuestionSection.Problem] = []
      questionResultsState.isFunctional = undefined
      break
  }
}
