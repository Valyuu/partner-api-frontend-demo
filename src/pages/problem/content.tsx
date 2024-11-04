import { motion } from 'framer-motion'
import { isNil } from 'lodash-es'
import { useLayoutEffect, useState } from 'react'
import { LuCheck, LuChevronUp } from 'react-icons/lu'

import { Checkbox, Label, ToggleGroup, ToggleGroupItem } from '~/components'
import { QuestionComponentProps } from '~/interfaces'

export type ProblemPageContentProps = QuestionComponentProps<
  Components.Schemas.V1GetModelQuestionsProblemQuestionsItemOutput[],
  { isFunctional?: boolean; problems: string[] }
>

type IsFunctionalQuestionOptions = 'yes' | 'no'

export const ProblemPageContent = ({ data, currentValue, onSelect }: ProblemPageContentProps) => {
  const [isFunctional, setIsFunctional] = useState(currentValue?.isFunctional)
  const [selectedProblems, setSelectedProblems] = useState(currentValue?.problems || [])
  const [expandProblems, setExpandProblems] = useState<boolean | undefined>(false)

  useLayoutEffect(() => {
    if (data) {
      if (data.length < 7) {
        // If there are less than 7 problems, don't show the expand button
        setExpandProblems(undefined)
      } else {
        // Check if selected problems has items order number greater than 6
        if (currentValue?.problems?.some((id) => data.findIndex((item) => item.id === id) > 5)) {
          setExpandProblems(true)
        }
      }
    }
  }, [data, currentValue?.problems])

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
    >
      <h2>Welke gebreken heeft uw apparaat?</h2>
      <ToggleGroup
        type="single"
        orientation="vertical"
        onValueChange={(value: IsFunctionalQuestionOptions) => {
          if (value == 'yes') {
            setIsFunctional(true)
            setSelectedProblems([])
            onSelect({ isFunctional: true, problems: [] })
          } else if (value == 'no') {
            setIsFunctional(false)
            onSelect({ isFunctional: false, problems: selectedProblems })
          }
        }}
        value={isNil(isFunctional) ? undefined : isFunctional ? 'yes' : 'no'}
        className="grid w-full grid-cols-2"
      >
        <ToggleGroupItem
          value={'yes'}
          onPointerUp={() => {
            // If it's already functional, and click yes again, then go to next page
            if (isFunctional) {
              onSelect({ isFunctional: true, problems: [] })
            }
          }}
          className="justify-start"
          radio
        >
          Ja
        </ToggleGroupItem>
        <ToggleGroupItem value={'no'} className="justify-start" radio>
          Nee
        </ToggleGroupItem>
      </ToggleGroup>
      {isNil(isFunctional) || isFunctional ? (
        <>
          <h4 className="text-base font-medium">Controleer of alles werkt</h4>
          <div className="flex flex-col gap-4">
            {data.map((item) => (
              <div key={item.id} className="flex gap-1">
                <LuCheck className="mt-0.5 size-5" />
                <div className="flex flex-col gap-1 text-base">
                  <div className="font-semibold">{item.name}</div>
                  {item.description?.trim() ? <div className="font-normal">{item.description}</div> : null}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h4 className="text-base font-medium">Selecteer problemen</h4>
          <div className="grid grid-cols-2 gap-2">
            {data.slice(0, expandProblems ? data.length : 6).map((option) => (
              <Label
                key={option.id}
                htmlFor={option.id}
                className="button-shadow box-border flex min-h-[4.375rem] cursor-pointer items-center gap-2 rounded-lg border bg-white p-4 font-semibold hover:border-[#88919e]"
              >
                <Checkbox
                  id={option.id}
                  checked={selectedProblems.includes(option.id)}
                  onCheckedChange={() => {
                    const newSelectedProblems = selectedProblems.includes(option.id)
                      ? selectedProblems.filter((id) => id !== option.id)
                      : [...selectedProblems, option.id]
                    const isFunctional = false
                    setSelectedProblems(newSelectedProblems)
                    setIsFunctional(isFunctional)
                    onSelect({ isFunctional, problems: newSelectedProblems })
                  }}
                  className="flex-none"
                />
                <div className="max-w-[15.625rem] flex-1 break-words leading-5">{option.name}</div>
              </Label>
            ))}
          </div>
          {expandProblems === true ? (
            <a
              onClick={() => setExpandProblems(false)}
              className="link inline-flex flex-none items-center gap-2 self-start"
              role="button"
            >
              <span>Toon minder problemen</span>
              <LuChevronUp className="size-5" />
            </a>
          ) : null}
          {expandProblems === false ? (
            <a
              onClick={() => setExpandProblems(true)}
              className="link inline-flex flex-none items-center gap-2 self-start"
              role="button"
            >
              <span>Toon alle problemen ({data.length - 6})</span>
              <LuChevronUp className="size-5 rotate-180" />
            </a>
          ) : null}
        </>
      )}
    </motion.div>
  )
}
