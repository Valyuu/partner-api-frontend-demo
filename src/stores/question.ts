import { proxy } from 'valtio'

import { QuestionSection } from '~/constants'
import { QuestionResultsStateType, QuestionSectionStateType } from '~/interfaces'
import { createPersistedStore } from '~/utils'

export const QUESTION_RESULTS_STATE_KEY = 'valyuu_questionResultsState'

export const QUESTION_RESULTS_STATE_DEFAULT: QuestionResultsStateType = {
  [QuestionSection.Attribute]: [],
  [QuestionSection.Condition]: [],
  [QuestionSection.Guidance]: [],
  [QuestionSection.Problem]: [],
  isFunctional: undefined,
}

export const questionResultsState = createPersistedStore<QuestionResultsStateType>(
  QUESTION_RESULTS_STATE_KEY,
  QUESTION_RESULTS_STATE_DEFAULT
)

if (import.meta.env.DEV) {
  import('valtio/utils').then(({ devtools }) => {
    devtools(questionResultsState, { name: 'questionResultsState', enabled: true })
  })
}

export const QUESTION_SECTION_STATE_DEFAULT: QuestionSectionStateType = {
  current: QuestionSection.Attribute,
  index: 0,
  questionCount: {
    [QuestionSection.Attribute]: 2,
    [QuestionSection.Guidance]: 4,
    [QuestionSection.Condition]: 2,
  },
}

export const questionSectionState = proxy<QuestionSectionStateType>(QUESTION_SECTION_STATE_DEFAULT)

if (import.meta.env.DEV) {
  import('valtio/utils').then(({ devtools }) => {
    devtools(questionSectionState, { name: 'questionSectionState', enabled: true })
  })
}
