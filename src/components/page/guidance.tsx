import { marked } from 'marked'

import { Label, RadioGroup, RadioGroupItem } from '~/components'
import { GuidanceQuestionOptions } from '~/constants'
import { QuestionComponentProps } from '~/interfaces'
import { cn } from '~/utils'

export type ModelAttributesQuestionProps = QuestionComponentProps<
  Components.Schemas.V1GetQuestionsItemGuidanceQuestionsItemOutput,
  GuidanceQuestionOptions
>

export const GuidancePageContent = ({ data, currentValue, onSelect }: ModelAttributesQuestionProps) => {
  if (!data) {
    return null
  }

  const idSuffix = Math.random().toString(36).substring(6)
  const yesId = `yes-${idSuffix}`
  const noId = `no-${idSuffix}`

  return (
    <div className="w-full p-4">
      <h2 className="mb-6 text-xl font-semibold" dangerouslySetInnerHTML={{ __html: marked.parse(data.question) }}></h2>
      {data.description ? (
        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-gray-700">{data.description}</p>
        </div>
      ) : null}
      <RadioGroup
        key={idSuffix}
        onClick={(event) => {
          if (event.target instanceof HTMLButtonElement) {
            const value = event.target.value
            onSelect(value as GuidanceQuestionOptions)
          }
        }}
        value={currentValue ?? undefined}
      >
        <div
          className={cn(
            'group mb-3 flex items-center space-x-2 rounded-lg border bg-white shadow transition-all hover:shadow-md',
            {
              'border-blue-500 bg-blue-100': false,
            }
          )}
        >
          <RadioGroupItem value={GuidanceQuestionOptions.Yes} id={yesId} className="ml-4" />
          <Label htmlFor={yesId} className="grow cursor-pointer items-center space-x-3 py-5 font-medium">
            Ja
          </Label>
        </div>
        <div
          className={cn(
            'group mb-3 flex items-center space-x-2 rounded-lg border bg-white shadow transition-all hover:shadow-md',
            {
              'border-blue-500 bg-blue-100': false,
            }
          )}
        >
          <RadioGroupItem value={GuidanceQuestionOptions.No} id={noId} className="ml-4" />
          <Label htmlFor={noId} className="grow cursor-pointer items-center space-x-3 py-5 font-medium">
            Nee
          </Label>
        </div>
      </RadioGroup>
      {data.imageTexts?.length ? (
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            {data.imageTexts.map((imageText) => (
              <div key={imageText.id} className="rounded border p-2">
                <img src={imageText.image} alt={imageText.name} className="mb-2 h-32 w-full object-cover" />
                <p className="text-center">{imageText.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
