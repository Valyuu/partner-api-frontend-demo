import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import { cn } from '~/utils'

const buttonVariants = cva(
  'group inline-flex max-w-full cursor-pointer items-center justify-center rounded-lg text-lg font-semibold leading-5 outline-none transition duration-100 hover:scale-[1.025] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#c9d7df] disabled:text-[#88919e]',
  {
    variants: {
      variant: {
        default: 'border-primary bg-primary text-primary-foreground',
        destructive: 'hover:bg-destructive/90 bg-destructive text-destructive-foreground',
        secondary: 'border-white bg-white !px-2',
        link: 'text-[#2c72ff] outline-none hover:text-primary hover:underline focus:border-none active:border-none active:shadow-none',
      },
      arrow: {
        none: '',
        right: 'flex justify-center',
        left: 'flex justify-center',
      },
      size: {
        default: 'px-7 py-3',
        sm: 'px-7 py-3 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      arrow: 'none',
      size: 'default',
    },
  }
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, arrow, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        <>
          {arrow === 'left' && (
            <BsArrowLeft
              size={28}
              className={cn(
                '-ml-1 mr-2.5 inline-block size-6 leading-5 text-[#009de8] transition duration-150 group-hover:-translate-x-1',
                { 'text-[#88919e]': props.disabled }
              )}
            />
          )}
          {children}
          {arrow === 'right' && (
            <BsArrowRight
              size={28}
              className={cn(
                '-mr-1 ml-2.5 inline-block size-6 leading-5 text-[#009de8] transition duration-150 group-hover:translate-x-1',
                { 'text-[#88919e]': props.disabled }
              )}
            />
          )}
        </>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
