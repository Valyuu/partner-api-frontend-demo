import { NavigationDestination } from './navigation'

export enum QuestionSection {
  Attribute = 'attribute',
  Guidance = 'guidance',
  Condition = 'condition',
  Problem = 'problem',
}

export const QUESTION_NAVIGATION_DESTINATIONS = {
  [QuestionSection.Attribute]: NavigationDestination.ModelAttributes,
  [QuestionSection.Guidance]: NavigationDestination.Guidances,
  [QuestionSection.Condition]: NavigationDestination.Conditions,
  [QuestionSection.Problem]: NavigationDestination.Problems,
}

export enum QuestionOptionType {
  Radio = 'radio',
  Checkbox = 'checkbox',
}

export enum GuidanceQuestionOptions {
  Yes = 'yes',
  No = 'no',
}
