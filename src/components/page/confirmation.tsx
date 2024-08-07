import { X } from 'lucide-react'
import { useState } from 'react'

import { Card, CardContent, Checkbox, Label } from '~/components'

export type ConfirmationQuestionProps = {
  data?: Components.Schemas.V1GetTradeInItemDataOutput
  setTocAgreed: (value: boolean) => void
  removeTradeInItem: () => void
}

export const ConfirmationPageContent = ({ data, setTocAgreed, removeTradeInItem }: ConfirmationQuestionProps) => {
  const [checkboxValues, setCheckboxValues] = useState<boolean[]>([false, false])

  if (!data) {
    return null
  }

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newValues = [...checkboxValues]
    newValues[index] = checked
    setCheckboxValues(newValues)
    if (newValues.every((value) => value)) {
      setTocAgreed(true)
    } else {
      setTocAgreed(false)
    }
  }

  return (
    <div className="w-full p-4">
      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <p className="text-sm text-gray-700">
          Als u meerdere producten inruilt, controleer deze dan zorgvuldig voordat u ze indient. Zodra de inruil is
          ingediend, kan een individueel product niet afzonderlijk worden bewerkt.
        </p>
      </div>
      <Card className="mb-6 w-full shadow-md">
        <CardContent className="flex p-4">
          <div className="flex grow items-center justify-between">
            <div className="flex items-start space-x-4">
              <img alt={data.name} src={data.image} className="h-auto max-h-16 w-16" />
              <div>
                <h2 className="text-base font-semibold">{data.name}</h2>
                <p className="text-xs text-gray-500">{data.attributes[0]}</p>
                <div className="mt-1 flex flex-wrap content-start gap-1 text-xs text-gray-600">
                  {data.answers.map((answer, index) => (
                    <p key={index} className="inline-block rounded bg-stone-100 p-1 text-[10px] leading-3">
                      {answer}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <X className="-mr-1 -mt-2.5 size-4 grow cursor-pointer" onClick={removeTradeInItem} />

            <div className="text-2xl font-bold">€ {data.price.toFixed(2)}</div>
            <div className="origin-right scale-90 text-nowrap text-xs text-gray-500">
              Betaald binnen {data.minPaymentTime} - {data.maxPaymentTime} {data.paymentTimeUnit.toLowerCase()}
            </div>
          </div>
        </CardContent>
      </Card>
      <div>
        <div className="group flex items-center space-x-2">
          <Checkbox
            id="checkbox-data-forward"
            checked={checkboxValues[0]}
            onCheckedChange={(value) => handleCheckboxChange(0, value as boolean)}
            className="ml-4"
          />
          <Label
            htmlFor="checkbox-data-forward"
            className="grow cursor-pointer items-center space-x-3 py-2 font-medium"
          >
            Ja, ik ga akkoord dat mijn gegevens worden doorgestuurd naar Valyuu ten behoeve van het toestelinruil
            verzendlabel.
          </Label>
        </div>
        <div className="group flex items-center space-x-2">
          <Checkbox
            id="checkbox-toc"
            checked={checkboxValues[1]}
            onCheckedChange={(value) => handleCheckboxChange(1, value as boolean)}
            className="ml-4"
          />
          <Label htmlFor="checkbox-toc" className="grow cursor-pointer items-center space-x-3 py-2 font-medium">
            Ja, ik ga akkoord met de Algemene Voorwaarden van Valyuu en ik geef toestemming dat mijn gegevens worden
            verwerkt door Valyuu.
          </Label>
        </div>
      </div>
    </div>
  )
}
