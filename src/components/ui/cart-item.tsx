import { isNil, upperFirst } from 'lodash-es'
import { forwardRef, HTMLAttributes } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { LuCheck, LuX } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

import { cn } from '~/utils'

import { Card, CardContent } from './card'
import { Price } from './price'

interface CartItemProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  image: string
  attributes: string[]
  link?: { text: string; path: string; replace?: boolean }
  price?: number
  onDelete?: () => void
}

const CartItem = forwardRef<HTMLDivElement, CartItemProps>(
  ({ className, name, image, attributes, link, price, onDelete, ...props }, ref) => {
    const navigate = useNavigate()

    return (
      <Card ref={ref} className={cn('w-full border border-[#c9d7df] button-shadow', className)} {...props}>
        <CardContent className="relative flex min-h-28 gap-3 px-5 py-4">
          <div className="flex grow items-center justify-between">
            <div className="flex items-start gap-4">
              <img alt={name} src={image} className="h-auto max-h-12 w-12 flex-none self-center" />
              <div>
                <h2 className="font-headline text-[1.125rem] font-bold leading-6">{name}</h2>
                {attributes.map((attribute) => (
                  <p className="flex gap-1 text-base" key={attribute}>
                    <LuCheck className="mt-[5px] size-4 flex-none" />
                    {upperFirst(attribute)}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {isNil(price) ? null : (
            <>
              <Price className="mb-[.3125rem] self-end" price={price} />
              <LuX
                className="absolute right-5 top-5 size-4 cursor-pointer hover:text-[#666]"
                onClick={onDelete}
                role="button"
                aria-label="Verwijder item uit winkelwagen"
              />
            </>
          )}
          {link ? (
            <a
              className="link inline-flex items-center gap-1 self-center"
              onClick={() => {
                navigate(link.path, { replace: !!link.replace })
              }}
            >
              <span>{link.text}</span> <BsArrowRight />
            </a>
          ) : null}
        </CardContent>
      </Card>
    )
  }
)
CartItem.displayName = 'CartItem'

export { CartItem }
