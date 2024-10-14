import { motion } from 'framer-motion'

import { Alert, CartItem } from '~/components'

export type IndexPageContentProps = { data?: { name: string; image: string; path: string; replace?: boolean } }

export const IndexPageContent = ({ data }: IndexPageContentProps) => {
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
      <h2>Wil je verdergaan met inruilen?</h2>

      <Alert>
        Je hebt de inruilprocedure gesloten. Wil je toch verdergaan en je product bij ons inruilen? Klik op de
        onderstaande knop om door te gaan.
      </Alert>

      <CartItem
        name={data.name}
        image={data.image}
        attributes={[]}
        link={{ text: 'Doorgaan met inruilen', path: data.path, replace: data.replace }}
      />
    </motion.div>
  )
}
