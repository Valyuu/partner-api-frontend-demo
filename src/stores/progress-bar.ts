import { proxy } from 'valtio'

import { NAVIGATION_BRANDS_PAGE_ENABLED, QuestionSection } from '~/constants'
import { ProgressBarStateType } from '~/interfaces'

import { questionResultsState, questionSectionState } from './question'

export const PROGRESS_BAR_STATE_DEFAULT: ProgressBarStateType = {
  currentStep: 0,
  get totalSteps() {
    return (
      1 /* category */ +
      (NAVIGATION_BRANDS_PAGE_ENABLED ? 1 /* brand */ : 0) +
      1 /* model */ +
      questionSectionState.questionCount[QuestionSection.Attribute] /* modelAttribute */ +
      questionSectionState.questionCount[QuestionSection.Guidance] /* guidance */ +
      ((questionResultsState.isFunctional ?? true)
        ? questionSectionState.questionCount[QuestionSection.Condition] /* condition */
        : 0) +
      ((questionResultsState.isFunctional ?? true) ? 0 /* problem */ : 1) +
      1
    ) /* confirmation */
  },
}

export const progressBarState = proxy<ProgressBarStateType>({
  currentStep: 0,
  get totalSteps() {
    return (
      1 /* category */ +
      (NAVIGATION_BRANDS_PAGE_ENABLED ? 1 /* brand */ : 0) +
      1 /* model */ +
      questionSectionState.questionCount[QuestionSection.Attribute] /* modelAttribute */ +
      questionSectionState.questionCount[QuestionSection.Guidance] /* guidance */ +
      ((questionResultsState.isFunctional ?? true)
        ? questionSectionState.questionCount[QuestionSection.Condition] /* condition */
        : 1) /* problem */ +
      1
    ) /* confirmation */
  },
})

if (import.meta.env.DEV) {
  import('valtio/utils').then(({ devtools }) => {
    devtools(progressBarState, { name: 'progressBarState', enabled: true })
  })
}
