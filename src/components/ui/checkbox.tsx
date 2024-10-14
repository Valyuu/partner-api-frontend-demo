import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'
import { LuCheck } from 'react-icons/lu'

import { cn } from '~/utils/ui'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    error?: boolean
  }
>(({ className, error, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      `peer size-5 shrink-0 rounded-sm border-2 bg-cover bg-no-repeat ring-offset-background data-[state=checked]:border-none data-[state=checked]:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50`,
      `data-[state=checked]:bg-[#009de8]`,
      { 'border-[#c9d7df]': !error, 'border-[#FF0000]': error },
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <LuCheck className="size-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
