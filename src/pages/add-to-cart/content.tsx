import { motion } from 'framer-motion'

import { Alert, CartItem } from '~/components'

export type AddToCartPageContentProps = { data?: Components.Schemas.V1GetTradeInItemDataOutput }

export const AddToCartPageContent = ({ data }: AddToCartPageContentProps) => {
  if (!data) {
    return null
  }

  return (
    <motion.div
      className="flex w-full flex-col gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, animate: { delay: 0.5 } }}
    >
      <h2>Sorry, we moeten je teleurstellen.</h2>

      <Alert>
        In deze staat kan het apparaat niet worden verkocht. Toestelinruil kan daarom niet. Heb je nog een ander
        apparaat om in te ruilen?
      </Alert>
      <CartItem name={data.name} image={data.image} attributes={[...data.attributes, ...data.answers]} />
    </motion.div>
  )
}
