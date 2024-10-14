import { motion } from 'framer-motion'

import thankYouImg from '~/assets/images/summary/thank-you.svg'
import { Alert } from '~/components'
import { cn } from '~/utils'

type CircleDivProps = {
  number: number
  withDots?: boolean
}

const CircleDiv = ({ number, withDots }: CircleDivProps) => (
  <div
    className={cn('w-16 flex-none self-stretch', {
      "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNEOEQ4RDgiLz48L3N2Zz4=')] bg-center bg-repeat-y -mb-4":
        withDots,
    })}
  >
    <div className="flex size-16 items-center justify-center rounded-full border-4 border-[#009de8] bg-white text-center font-headline text-[1.25rem] font-bold text-[#009de8]">
      {number}
    </div>
  </div>
)

export const SuccessPageContent = () => {
  return (
    <motion.div
      className="flex w-full flex-col gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, animate: { delay: 0.5 } }}
    >
      <div className="-mx-10 mt-[-1.875rem] flex items-center justify-between self-stretch bg-[#d9f0fc] px-[3.75rem] py-[1.875rem]">
        <div className="flex w-[28.5rem] flex-col gap-2">
          <h1>Bedankt!</h1>
          <div>Door je telefoon een tweede leven te geven draag je bij aan het verminderen van e-waste.</div>
        </div>
        <img src={thankYouImg} alt="Thank you" className="size-[7.625rem] flex-none" />
      </div>
      <div className="mt-[1.875rem] flex flex-col gap-6">
        <h2 className="font-headline text-2xl font-bold leading-[2.1rem]">Wat nu?</h2>
        <div className="flex gap-[1.4375rem]">
          <CircleDiv number={1} withDots />
          <div>
            <h3 className="mb-3 mt-4 font-headline text-xl font-bold not-italic leading-7 text-[#009de8]">
              Bereid je pakket voor
            </h3>
            <div className="leading-5">
              Na het afronden van je bestelling ontvang je een bevestigingsmail van Valyuu met een verzendlabel voor je
              oude apparaat. Op het verzendlabel worden de adresgegevens gebruikt die je invult bij het plaatsen van de
              bestelling.
            </div>
          </div>
        </div>
        <div className="flex gap-[1.4375rem]">
          <CircleDiv number={2} withDots />
          <div>
            <h3 className="mb-3 mt-4 font-headline text-xl font-bold not-italic leading-7 text-[#009de8]">
              Stuur het pakket op
            </h3>
            <div className="leading-5">
              Lees de verpakkingsinstructies om er zeker van te zijn dat het veilig aankomt. Vergeet niet om je af te
              melden bij alle accounts (iCloud, Samsung, Google, etc.) en alle gegevens te wissen voor verzending.
              <Alert className="mt-3">
                Zijn er veel producten? Verpak ze zorgvuldig zodat ze niet beschadigd raken.
              </Alert>
            </div>
          </div>
        </div>
        <div className="flex gap-[1.4375rem]">
          <CircleDiv number={3} />
          <div>
            <h3 className="mb-3 mt-4 font-headline text-xl font-bold not-italic leading-7 text-[#009de8]">
              Krijg snel betaald
            </h3>
            <div className="leading-5">
              We laten het weten zodra het apparaat bij ons is aangekomen. Zodra het pakket is ontvangen krijg je
              betaald, of -indien je hebt gekozen om te doneren- gaat het geld naar het goede doel. Heb je in de
              tussentijd vragen? Stel ze gerust via{' '}
              <a href="mailto:hello@valyuu.com" className="link">
                hello@valyuu.com
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
