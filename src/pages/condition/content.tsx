import { motion } from 'framer-motion'

import { Alert, ToggleGroup, ToggleGroupItem } from '~/components'
import { NavigationDestination } from '~/constants'
import { QuestionComponentProps } from '~/interfaces'
import { QuestionResultsStoreType } from '~/stores'
import { cn } from '~/utils'

export type ConditionPageContentProps = QuestionComponentProps<
  Components.Schemas.V1GetModelQuestionsConditionQuestionsItemOutput,
  QuestionResultsStoreType[NavigationDestination.Condition][number]
>

export const ConditionPageContent = ({ data, currentValue, onSelect }: ConditionPageContentProps) => {
  if (!data) {
    return null
  }

  return (
    <motion.div
      className="flex w-full flex-col gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, animate: { delay: 0.5 } }}
      key={`condition-${data.id}-${currentValue?.optionId}`}
    >
      <h2>{data.question}</h2>
      <ToggleGroup
        type="single"
        orientation="vertical"
        onValueChange={(optionId) => {
          if (optionId) {
            onSelect({ conditionId: data.id, optionId })
          } else if (currentValue?.optionId) {
            onSelect({ conditionId: data.id, optionId: currentValue.optionId })
          }
        }}
        value={currentValue?.optionId}
        className="w-full"
        cancelable
      >
        {data.options.map((option) => (
          <ToggleGroupItem
            key={option.id}
            value={option.id}
            className="flex w-full flex-col items-start text-left"
            radio
          >
            <div>
              <span className={cn('text-lg', { 'font-semibold': option.description })}>{option.name}</span>
              {option.description ? (
                <ul className="-ml-3 mt-2 list-disc pl-7 text-base font-normal text-[#6a7180]">
                  {option.description
                    .split('. ')
                    .filter((line) => line?.trim())
                    ?.map((desc, index) => <li key={`option-${option.id}-${index}`}>{desc}.</li>)}
                </ul>
              ) : null}
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {data.description ? <Alert>{data.description}</Alert> : null}
    </motion.div>
  )
}
