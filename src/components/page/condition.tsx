import { Label, RadioGroup, RadioGroupItem } from '~/components'
import { QuestionSection } from '~/constants'
import { QuestionComponentProps, QuestionResultsStateType } from '~/interfaces'
import { cn } from '~/utils'

export type ConditionQuestionProps = QuestionComponentProps<
  Components.Schemas.V1GetModelQuestionsConditionQuestionsItemOutput,
  QuestionResultsStateType[QuestionSection.Condition][number]
>

export const ConditionPageContent = ({ data, currentValue, onSelect }: ConditionQuestionProps) => {
  if (!data) {
    return null
  }

  return (
    <div className="w-full p-4">
      <h2 className="mb-6 text-xl font-semibold">{data.question}</h2>
      {data.description ? (
        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-gray-700">{data.description}</p>
        </div>
      ) : null}
      <RadioGroup
        onClick={(event) => {
          if (event.target instanceof HTMLButtonElement) {
            const optionId = event.target.value
            onSelect({ conditionId: data.id, optionId })
          }
        }}
        value={currentValue?.optionId}
      >
        {data.options.map((option) => (
          <div
            key={option.id}
            className={cn(
              'group mb-3 flex items-center space-x-2 rounded-lg border bg-white shadow transition-all hover:shadow-md',
              {
                'border-blue-500 bg-blue-100': false,
              }
            )}
          >
            <RadioGroupItem value={option.id} id={option.id} className="ml-4" />
            <Label
              htmlFor={option.id}
              className="flex w-full grow cursor-pointer flex-col items-start space-x-3 space-y-3 py-5"
            >
              {option.description ? (
                <>
                  <strong className="ml-3">{option.name}</strong>
                  <p>{option.description}</p>
                </>
              ) : (
                option.name
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
