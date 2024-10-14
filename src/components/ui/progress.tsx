import * as ProgressPrimitive from '@radix-ui/react-progress'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '~/utils/ui'

const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-1 w-full overflow-hidden rounded-l-none bg-[#acdbf2]', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn('size-full flex-1 bg-[#009de8] bg-no-repeat transition-all duration-500', {
        'rounded-r-full': (value ?? 0) < 100,
      })}
      style={{ width: `${Math.max(Math.min(value ?? 0, 100), 0)}%` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
