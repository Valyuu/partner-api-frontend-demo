import { motion } from 'framer-motion'

import { ToggleGroup, ToggleGroupItem } from '~/components'
import { QuestionComponentProps } from '~/interfaces'

export type CategoryPageContentProps = QuestionComponentProps<Components.Schemas.V1GetCategoriesItemOutput[], string>

export const CategoryPageContent = ({ data, currentValue, onSelect }: CategoryPageContentProps) => {
  if (!data) {
    return null
  }

  return (
    <motion.div
      className="flex w-full flex-col gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Wat voor apparaat wil je inruilen?</h2>
      <ToggleGroup
        type="single"
        orientation="horizontal"
        value={currentValue}
        onValueChange={onSelect}
        className="grid grid-cols-2 gap-[1.625rem] sm:grid-cols-3"
      >
        {data.map((category) => (
          <ToggleGroupItem key={category.id} value={category.id} className="flex flex-col justify-center gap-2.5">
            <img
              src={category.image}
              alt={category.name}
              className="mt-2 size-[4.375rem] max-h-full max-w-full object-contain"
            />
            <span className="mb-2 text-center text-base font-medium">{category.name}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </motion.div>
  )
}
