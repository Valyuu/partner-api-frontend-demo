import { motion } from 'framer-motion'

import { Alert, ToggleGroup, ToggleGroupItem } from '~/components'
import { NavigationDestination } from '~/constants'
import { QuestionComponentProps } from '~/interfaces'
import { QuestionResultsStoreType } from '~/stores'

export type ModelAttributePageContentProps = QuestionComponentProps<
  Components.Schemas.V1GetModelQuestionsAttributeQuestionsItemOutput,
  QuestionResultsStoreType[NavigationDestination.ModelAttribute][number]
>

export const ModelAttributePageContent = ({ data, currentValue, onSelect }: ModelAttributePageContentProps) => {
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
      key={`attribute-${data.id}-${currentValue?.optionId}`}
    >
      <h2>{data.question}</h2>
      <ToggleGroup
        type="single"
        orientation="vertical"
        onValueChange={(optionId) => {
          if (optionId) {
            onSelect({ attributeId: data.id, optionId })
          } else if (currentValue?.optionId) {
            onSelect({ attributeId: data.id, optionId: currentValue.optionId })
          }
        }}
        value={currentValue?.optionId}
        className="w-full"
        cancelable
      >
        {data.options.map((option) => (
          <ToggleGroupItem key={option.id} value={option.id} className="w-full justify-start" radio>
            {option.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {data.description ? <Alert>{data.description}</Alert> : null}
    </motion.div>
  )
}
