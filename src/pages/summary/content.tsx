import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { LuPlus } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { Alert, Button, CartItem, Checkbox, Label, Price, Separator } from '~/components'
import { NavigationDestination } from '~/constants'
import { cartStore, tocStore } from '~/stores'
import { addMoney } from '~/utils'

export const SummaryPageContent = () => {
  const navigate = useNavigate()
  const { showErrors: showTocErrors, tocStatus } = useSnapshot(tocStore)
  const cartItems = useSnapshot(cartStore)
  const cartTotal = cartItems.reduce((acc, { data }) => addMoney(acc, data.price), 0)

  const tocRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showTocErrors) {
      tocRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showTocErrors])

  const handleCheckboxChange = (index: number, checked: boolean) => {
    tocStore.tocStatus[index] = checked
  }

  return (
    <motion.div
      className="flex w-full flex-col gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, animate: { delay: 0.5 } }}
    >
      <h2>{cartItems.length === 1 ? 'Je inruilproduct' : 'Je inruilproducten'}</h2>
      {cartItems.length ? (
        <>
          <Alert>
            Wanneer je meerdere apparaten inruilt, controleer deze dan zorgvuldig voordat je ze indient. Zodra de inruil
            is bevestigd kan de opgegeven staat van een apparaat niet meer worden bewerkt.
          </Alert>
          {cartItems.map(({ id, display, data }, index) => (
            <CartItem
              name={display.name}
              image={display.image}
              attributes={[...display.attributes]}
              price={data.price}
              onDelete={() => cartStore.splice(index, 1)}
              key={`cart-${id}`}
            />
          ))}
          <Button
            variant="secondary"
            className="button-shadow flex w-full items-center gap-2 self-center border border-[#c9d7df] font-headline text-base font-normal hover:scale-100 hover:border-[#88919e]"
            onClick={() => {
              navigate('/' + NavigationDestination.Category)
            }}
          >
            <LuPlus size={16} className="text-[#009de8]" /> Meer toevoegen
          </Button>
          {cartItems.length ? (
            <div className="inline-flex items-start justify-between pt-5 font-headline">
              <div className="text-2xl font-medium leading-normal">Totale waarde:</div>
              <div className="inline-flex flex-col items-end justify-start gap-[.4375rem]">
                <Price price={cartTotal} />
                <div className="font-headline text-sm font-bold leading-normal text-[#009de8]">
                  Betaald binnen 5 dagen
                </div>
              </div>
            </div>
          ) : null}
          <Separator className="mt-2.5" />
          <div ref={tocRef} className="flex flex-col gap-2">
            <div className="font-headline text-[1.25rem] font-medium">Voorwaarden</div>
            <div className="group flex items-start gap-3 leading-6">
              <Checkbox
                id="checkbox-data-forward"
                error={showTocErrors && !tocStatus[0]}
                checked={tocStatus[0]}
                onCheckedChange={(value) => handleCheckboxChange(0, value as boolean)}
                className="mt-0.5 self-start"
              />
              <Label htmlFor="checkbox-data-forward" className="flex grow cursor-pointer flex-col leading-6">
                <span>
                  Ja, ik ga akkoord dat mijn gegevens, ingevuld tijdens het bestelproces, worden doorgestuurd naar Valyuu ten behoeve van het toestelinruil verzendlabel.
                </span>
                {showTocErrors && !tocStatus[0] ? <div className="text-[#fe5f55]">Dit veld is verplicht.</div> : null}
              </Label>
            </div>
            <div className="group flex items-start gap-2">
              <Checkbox
                id="checkbox-toc"
                error={showTocErrors && !tocStatus[1]}
                checked={tocStatus[1]}
                onCheckedChange={(value) => handleCheckboxChange(1, value as boolean)}
                className="mt-0.5 self-start"
              />
              <Label htmlFor="checkbox-toc" className="grow cursor-pointer leading-6">
                <span>
                  Ja, ik ga akkoord met de{' '}
                  <a href="/toc.pdf" target="toc" className="link">
                    Algemene Voorwaarden
                  </a>{' '}
                  van Valyuu en ik geef toestemming dat mijn gegevens, ingevuld tijdens het bestelproces, worden
                  verwerkt door Valyuu.
                </span>
                {showTocErrors && !tocStatus[1] ? <div className="text-[#fe5f55]">Dit veld is verplicht.</div> : null}
              </Label>
            </div>
          </div>
        </>
      ) : (
        <>
          <Alert>
            Je hebt geen producten om in te ruilen. Voeg een product toe of sluit af om verder te gaan met je
            bestelling.
          </Alert>
        </>
      )}
    </motion.div>
  )
}
