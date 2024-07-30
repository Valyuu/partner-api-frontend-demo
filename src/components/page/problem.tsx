import { useState } from 'react'

import { Checkbox, Label } from '~/components'
import { QuestionComponentProps } from '~/interfaces'

export interface ProblemQuestionProps
  extends QuestionComponentProps<Components.Schemas.V1GetQuestionsItemProblemQuestionsItemOutput[], string[]> {}

export const ProblemPageContent = ({ data, currentValue, onSelect }: ProblemQuestionProps) => {
  const [selectedProblems, setSelectedProblems] = useState(currentValue || [])

  if (!data) {
    return null
  }

  const handleCheckboxChange = (problemId: string) => {
    setSelectedProblems((prev) => {
      const newSelection = prev.includes(problemId) ? prev.filter((id) => id !== problemId) : [...prev, problemId]

      onSelect(newSelection)
      return newSelection
    })
  }

  return (
    <div className="w-full p-4">
      <h2 className="mb-6 text-xl font-semibold">Welke gebreken heeft uw apparaat?</h2>{' '}
      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <p className="text-sm text-gray-700">Selecteer ten minste één optie.</p>
      </div>
      <div className="space-y-3">
        {data.map((option) => (
          <div
            key={option.id}
            className="group flex items-center space-x-2 rounded-lg border bg-white shadow transition-all hover:shadow-md"
          >
            <Checkbox
              id={option.id}
              checked={selectedProblems.includes(option.id)}
              onCheckedChange={() => handleCheckboxChange(option.id)}
              className="ml-4"
            />
            <Label htmlFor={option.id} className="grow cursor-pointer items-center space-x-3 py-5 font-medium">
              {option.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
