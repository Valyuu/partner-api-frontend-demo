import '~/assets/styles/index.css'
import '~/assets/styles/font.css'

import type { Story } from '@ladle/react'
import { LuCheck } from 'react-icons/lu'

import { Button } from './button'

export const ButtonStory: Story = () => {
  const variants = ['default', 'secondary'] as const
  const sizes = ['default', 'icon'] as const

  return (
    <div className="space-y-8 p-4">
      {variants.map((variant) => (
        <div key={variant} className="space-y-4">
          <h2 className="text-xl font-bold capitalize text-gray-800">{variant} Variant</h2>
          <div className="flex flex-wrap gap-4">
            {sizes.map((size) => (
              <Button key={`${variant}-${size}`} variant={variant} size={size}>
                {size === 'icon' ? (
                  <LuCheck className="size-4" />
                ) : (
                  <>
                    {variant} {size}
                  </>
                )}
              </Button>
            ))}
            {/* With right arrow */}
            <Button variant={variant} arrow="right">
              With Left Arrow
            </Button>
            <Button variant={variant} arrow="left">
              With Left Arrow
            </Button>
            {/* Add a disabled button for each variant */}
            <Button variant={variant} disabled>
              Disabled {variant}
            </Button>
            {/* Add disabled buttons with arrows */}
            <Button variant={variant} arrow="right" disabled>
              Disabled with Right Arrow
            </Button>
            <Button variant={variant} arrow="left" disabled>
              Disabled with Left Arrow
            </Button>
          </div>
        </div>
      ))}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">AsChild Example</h2>
        <Button asChild>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">
            Link Button
          </a>
        </Button>
      </div>
    </div>
  )
}

export default {
  title: 'Components',
  component: ButtonStory,
}
