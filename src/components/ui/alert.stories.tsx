import '~/assets/styles/index.css'
import '~/assets/styles/font.css'

import type { Story } from '@ladle/react'

import { Alert, AlertDescription, AlertTitle } from './alert' // Adjust the import path as needed

export const AlertStory: Story = () => {
  const variants = ['default', 'warning'] as const

  return (
    <div className="space-y-8 p-4">
      {variants.map((variant) => {
        return (
          <div key={variant} className="space-y-4">
            <h2 className="text-xl font-bold capitalize text-gray-800">{variant} Variant</h2>
            <Alert variant={variant}>
              <AlertTitle>Alert Title</AlertTitle>
              <AlertDescription>
                This is a {variant} alert. You can use it to show important messages to your users.
              </AlertDescription>
            </Alert>
          </div>
        )
      })}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Alert with Title Only</h2>
        <Alert>
          <AlertTitle>This is an alert with only a title</AlertTitle>
        </Alert>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Alert with Description Only</h2>
        <Alert>
          <AlertDescription>
            This is an alert with only a description. It can be used for less important notifications.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

export default {
  title: 'Components',
  component: AlertStory,
}
