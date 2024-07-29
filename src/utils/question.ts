import { QuestionSection } from '~/constants'
import { QuestionResultsStateType } from '~/interfaces'

export type GetVariantIdFromAttributeResultsArgs = {
  generalData: Components.Schemas.PartnerV1GetGeneralQuestionsOutput
  attributeResults: QuestionResultsStateType[QuestionSection.Attribute]
}

// export const getVariantIdFromAttributeResults = ({
//   attributeResults,
//   generalData,
// }: GetVariantIdFromAttributeResultsArgs) => {
//   const questionCount = generalData.attributeQuestions.length
//   if (attributeResults.length === questionCount) {
//     const attributeCombinations = generalData.attributeCombinations
//     const selectedAttributes = attributeResults.map((result) => ({
//       attributeId: result.attributeId,
//       optionId: result.optionId,
//     }))
//     const selectedCombination = attributeCombinations.find((combination) => {
//       return combination.choices.every((choice) => {
//         return selectedAttributes.some(
//           (selected) => selected.attributeId === choice.attributeId && selected.optionId === choice.optionId
//         )
//       })
//     })
//     return selectedCombination!.variantId
//   }
// }
