import { forwardRef } from 'react'

import { cn, formatMoney } from '~/utils'

const Price = forwardRef<HTMLDivElement, { price: number; className?: string }>(({ price, className }, ref) => {
  const priceString = formatMoney(price)
  const decimal = priceString.slice(-2) // Last two digits as decimal
  const integer = priceString.slice(0, -3) // Everything before the last two digits
  const separator = priceString.slice(-3, -2) // The separator between the integer and the decimal

  return (
    <div ref={ref} className={cn('flex gap-0.5', className)}>
      <span className="inline-block flex-none font-headline text-[2rem] font-semibold leading-8">{integer}</span>
      <span className="relative inline-flex h-8 w-5">
        <span className="absolute -top-0.5 left-0 h-7 text-start font-headline text-base font-semibold leading-6">
          {decimal}
        </span>
        <span className="absolute bottom-1 left-0 text-start text-2xl font-semibold leading-6">{separator}</span>
      </span>
    </div>
  )
})

Price.displayName = 'Price'

export { Price }
