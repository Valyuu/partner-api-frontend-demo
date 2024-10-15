import { cloneDeep } from 'lodash-es'
import { proxy } from 'valtio'

import { NavigationDestination } from '~/constants'

export type QuestionSectionStoreType = {
  current: NavigationDestination
  index: number
  questionCount: {
    [NavigationDestination.Category]: 1
    [NavigationDestination.Model]: 1
    [NavigationDestination.ModelAttribute]: number
    [NavigationDestination.Condition]: number
    [NavigationDestination.Problem]: 1
  }
}

export const QUESTION_SECTION_STORE_DEFAULT: QuestionSectionStoreType = {
  current: NavigationDestination.Category,
  index: 0,
  questionCount: {
    [NavigationDestination.Category]: 1,
    [NavigationDestination.Model]: 1,
    [NavigationDestination.ModelAttribute]: 2,
    [NavigationDestination.Condition]: 2,
    [NavigationDestination.Problem]: 1,
  },
}

export const questionSectionStore = proxy<QuestionSectionStoreType>(cloneDeep(QUESTION_SECTION_STORE_DEFAULT))

export const correctQuestionCounts = (data: Components.Schemas.V1GetModelQuestionsOutput | undefined) => {
  if (data) {
    const { attributeQuestions, conditionQuestions } = data
    questionSectionStore.questionCount[NavigationDestination.ModelAttribute] = attributeQuestions.length
    questionSectionStore.questionCount[NavigationDestination.Condition] = conditionQuestions.length
  }
}
