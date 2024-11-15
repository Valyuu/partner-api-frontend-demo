import { motion } from 'framer-motion'
import { debounce } from 'lodash-es'
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { LuCheck } from 'react-icons/lu'

import { Alert, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components'
import { QuestionComponentProps } from '~/interfaces'
import { cn, searchAndFilter } from '~/utils'

export type ModelPageContentProps = QuestionComponentProps<Components.Schemas.V1GetModelsItemOutput[], string> & {
  onConfirm: () => void
}

export const ModelPageContent = ({
  data = [],
  currentValue: modelId = '',
  onSelect,
  onConfirm,
}: ModelPageContentProps) => {
  const [open, setOpen] = useState(false)
  const modelName = data.find((model) => model.id === modelId)?.name ?? ''

  const [value, setValue] = useState(modelName)
  const [filteredData, setFilteredData] = useState(data)
  const [highlightedValue, setHighlightedValue] = useState('')

  const commandInputRef = useRef<HTMLInputElement>(null)
  const commandListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    commandInputRef.current?.focus()
  }, [])

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      const filtered = searchAndFilter(data, searchValue)
      setFilteredData(filtered)
    }, 50),
    [data]
  )

  useEffect(() => {
    if (value) {
      debouncedSearch(value)
    }
    return () => {
      debouncedSearch.cancel()
    }
  }, [value, debouncedSearch])

  useEffect(() => {
    if (value && filteredData.length) {
      setHighlightedValue(filteredData[0].name)
    } else {
      setHighlightedValue('')
    }
  }, [value, filteredData])

  const closeList = () => {
    setOpen(false)
    if (modelName) {
      setValue(modelName)
    }
  }

  const handleInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setOpen(true)
    setTimeout(() => commandListRef.current?.scrollTo({ top: 0 }), 100)

    // Remove leading whitespace and limit trailing space to 1
    const newValue = target.value.replace(/^\s+/, '').replace(/\s+$/, ' ')

    setValue(newValue)

    // If the sanitized value is different from the input, update the input
    if (newValue !== target.value) {
      target.value = newValue
    }
  }

  const handleClick = () => {
    // select all text of the input
    commandInputRef.current?.select()
    setOpen(true)
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      closeList()
    } else if (
      event.key === 'Enter' &&
      value &&
      modelId &&
      value === filteredData.find((model) => model.id === modelId)?.name
    ) {
      onConfirm()
      event.preventDefault()
    }
  }

  return (
    <motion.div
      className="flex w-full flex-col gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, animate: { delay: 0.5 } }}
    >
      <h2>Welk apparaat is het?</h2>

      <ClickAwayListener onClickAway={closeList}>
        <Command className="w-full" shouldFilter={false} value={highlightedValue} onValueChange={setHighlightedValue}>
          <CommandInput
            ref={commandInputRef}
            placeholder="Zoek apparaatnaam..."
            value={value}
            onInput={handleInput}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          />
          <CommandList
            ref={commandListRef}
            className={cn({ hidden: !open || !filteredData.length || (!value.trim() && !modelId) })}
          >
            <CommandEmpty className="hidden" />
            <CommandGroup>
              {filteredData.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    onSelect(model.id)
                    setOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  {model.name}
                  <LuCheck className={cn('mr-2 h-4 w-4', modelId === model.id ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </ClickAwayListener>
      {filteredData.length || !value.trim() ? null : (
        <Alert variant="warning" key="search-result-warning">
          We kunnen geen model vinden op basis van de door jou ingevulde zoekterm. Mogelijk bestaat het model niet, of
          komt het model niet in aanmerking voor wederverkoop.
        </Alert>
      )}
    </motion.div>
  )
}
