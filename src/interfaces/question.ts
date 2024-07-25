import { GuidanceQuestionOptions, QuestionSection } from '~/constants'

export type QuestionResultsStateType = {
  [QuestionSection.Attribute]: { attributeId: string; optionId: string }[]
  [QuestionSection.Guidance]: GuidanceQuestionOptions[]
  [QuestionSection.Condition]: { conditionId: string; optionId: string }[]
  [QuestionSection.Problem]: string[]
  isFunctional: boolean | undefined
}

export type QuestionComponentProps<TData, TValue = string> = {
  data?: TData
  currentValue?: TValue
  onSelect: (value: TValue) => void
}

export type QuestionSectionStateType = {
  current: QuestionSection
  index: number
  questionCount: {
    [QuestionSection.Attribute]: number
    [QuestionSection.Guidance]: number
    [QuestionSection.Condition]: number
  }
}
