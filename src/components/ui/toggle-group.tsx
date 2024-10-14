import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { isEqual } from 'lodash-es'
import { ComponentPropsWithoutRef, createContext, ElementRef, forwardRef, useContext } from 'react'
import { LuCircle } from 'react-icons/lu'

import { cn } from '~/utils/ui'

type ToggleGroupContextValueType = {
  cancelable?: boolean
  currentValue?: string | string[]
}

const ToggleGroupContext = createContext<ToggleGroupContextValueType>({})

const ToggleGroup = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & Pick<ToggleGroupContextValueType, 'cancelable'>
>(({ className, children, cancelable, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Root ref={ref} className={cn('flex flex-col gap-2 w-full select-none', className)} {...props}>
      <ToggleGroupContext.Provider value={{ currentValue: props.value, cancelable }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
})

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

// Define the variants for the ToggleGroupItem
const toggleGroupItemVariants = cva(
  'data-[state=off]:button-shadow group inline-flex w-full items-center justify-center !rounded-xl border-2 text-base font-semibold ring-offset-background data-[state=on]:border-[3px] data-[state=off]:border-[#dddddd] data-[state=on]:border-[#009de8] data-[state=on]:p-[23px] hover:border-[#88919e] hover:data-[state=on]:border-[#009de8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      radio: {
        false: 'p-6',
        true: '!rounded-lg p-4 data-[state=on]:p-[15px]',
      },
    },
    defaultVariants: {
      radio: false,
    },
  }
)

const ToggleGroupItem = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleGroupItemVariants>
>(({ className, children, onClick, value, radio, ...props }, ref) => {
  const { currentValue, cancelable } = useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleGroupItemVariants({ radio }), className)}
      onClick={(event) => {
        if (cancelable) {
          onClick?.(event)
        } else {
          // Prevent canceling the selection if the value is the same as the current value
          if (value) {
            if (isEqual(value, currentValue)) {
              event.preventDefault()
            } else {
              onClick?.(event)
            }
          }
        }
      }}
      value={value}
      {...props}
    >
      {radio ? (
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex aspect-square size-5 flex-none items-center justify-center rounded-full border-2 border-[#c9d7df] text-[#c9d7df] group-data-[state=on]:border-[#009de8] group-data-[state=on]:text-[#009de8]">
            <LuCircle className="size-3 fill-current text-current group-data-[state=off]:invisible" />
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
