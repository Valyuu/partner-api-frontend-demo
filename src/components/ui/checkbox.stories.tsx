import '~/assets/styles/index.css'
import '~/assets/styles/font.css'

import type { Story } from '@ladle/react'
import React from 'react'

import { Checkbox } from './checkbox'

export const CheckboxStory: Story = () => {
  const [controlledChecked, setControlledChecked] = React.useState(false)

  return (
    <div className="space-y-8 p-4">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Default Checkbox</h2>
        <Checkbox id="default-checkbox" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Checked Checkbox</h2>
        <Checkbox id="checked-checkbox" defaultChecked />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Disabled Checkbox</h2>
        <Checkbox id="disabled-checkbox" disabled />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Disabled Checked Checkbox</h2>
        <Checkbox id="disabled-checked-checkbox" disabled defaultChecked />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Error Checkbox</h2>
        <Checkbox id="default-checkbox" error />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Checkbox with Label</h2>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="cursor-pointer select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Group of Checkboxes</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="option1" />
            <label htmlFor="option1" className="cursor-pointer select-none font-medium leading-none">
              Option 1
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="option2" />
            <label htmlFor="option2" className="cursor-pointer select-none font-medium leading-none">
              Option 2
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="option3" />
            <label htmlFor="option3" className="cursor-pointer select-none font-medium leading-none">
              Option 3
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Controlled Checkbox</h2>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled"
            checked={controlledChecked}
            onCheckedChange={(value) => setControlledChecked(value as boolean)}
          />
          <label htmlFor="controlled" className="text-sm font-medium leading-none">
            Controlled Checkbox (Checked: {controlledChecked ? 'Yes' : 'No'})
          </label>
        </div>
      </div>
    </div>
  )
}

export default {
  title: 'Components',
  component: CheckboxStory,
}
