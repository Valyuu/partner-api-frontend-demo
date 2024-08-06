export const getFilteredAttributeData = ({
  attributeQuestions,
  sectionIndex,
  attributeResults,
  attributeCombinations,
}: {
  attributeQuestions: Components.Schemas.V1GetQuestionsItemAttributeQuestionsItemOutput[]
  sectionIndex: number
  attributeResults:
    | {
        attributeId: string
        optionId: string
      }[]
    | readonly {
        readonly attributeId: string
        readonly optionId: string
      }[]
  attributeCombinations: Components.Schemas.V1GetQuestionsItemAttributeCombinationsItemOutput[]
}) => {
  const selectedAttributesWithoutCurrent = attributeResults.filter((_, index) => index !== sectionIndex)
  const currentQuestion = attributeQuestions[sectionIndex]
  const questionData = {
    ...currentQuestion,
    options: currentQuestion.options.filter((option) => {
      const selectedAttributesWithCurrentOption = [
        ...selectedAttributesWithoutCurrent,
        { attributeId: currentQuestion.id, optionId: option.id },
      ]
      // Has at least one combination, which means variableId is available
      return attributeCombinations.some((combination) => {
        // Every selectedAttribute should be in the combination
        return selectedAttributesWithCurrentOption.every((selectedAttribute) => {
          return combination.choices.some(
            (choice) =>
              choice.attributeId === selectedAttribute.attributeId && choice.optionId === selectedAttribute.optionId
          )
        })
      })
    }),
  }
  return questionData
}
