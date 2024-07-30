import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components'
import { QuestionComponentProps } from '~/interfaces'
import { cn } from '~/utils'

export interface ModelQuestionProps
  extends QuestionComponentProps<Components.Schemas.V1GetModelsItemOutput[], string> {}

export const ModelPageContent = ({ data, currentValue: modelId, onSelect }: ModelQuestionProps) => {
  const [open, setOpen] = useState(false)

  if (!data) {
    return null
  }

  const modelName = data.find((model) => model.id === modelId)?.name

  return (
    <div className="p-4">
      <h2 className="mb-6 text-xl font-semibold">Kies Model</h2>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {modelName ? modelName : 'Selecteer model...'}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
          <Command value={modelName}>
            <CommandInput placeholder="Zoek model..." />
            <CommandList>
              <CommandEmpty>Geen model gevonden.</CommandEmpty>
              <CommandGroup>
                {data.map((model) => (
                  <CommandItem
                    key={model.id}
                    onSelect={() => {
                      setOpen(false)
                      onSelect(model.id)
                    }}
                    className="cursor-pointer"
                  >
                    <Check className={cn('mr-2 h-4 w-4', modelId === model.id ? 'opacity-100' : 'opacity-0')} />
                    {model.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
