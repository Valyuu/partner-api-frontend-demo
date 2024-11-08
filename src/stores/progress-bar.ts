import { proxy } from 'valtio'

import { NavigationDestination } from '~/constants'
import { questionResultsStore, questionSectionStore } from '~/stores'

export type ProgressBarStoreType = {
  currentStep: number
  totalSteps: number
}

class ProgressBarStore {
  currentStep = 0

  get totalSteps() {
    return (
      questionSectionStore.questionCount[NavigationDestination.Category] /* category */ +
      questionSectionStore.questionCount[NavigationDestination.Model] /* model */ +
      questionSectionStore.questionCount[NavigationDestination.ModelAttribute] /* modelAttribute */ +
      questionSectionStore.questionCount[NavigationDestination.Problem] /* problem */ +
      ((questionResultsStore.isFunctional ?? true)
        ? questionSectionStore.questionCount[NavigationDestination.Condition] /* condition */
        : 0) +
      1 /* summary */
    )
  }
}

export const progressBarStore = proxy<ProgressBarStoreType>(new ProgressBarStore())
