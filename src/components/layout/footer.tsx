import { useSnapshot } from 'valtio'

import poweredByImg from '~/assets/images/summary/powered-by.svg'
import { Button } from '~/components'
import { footerStore } from '~/stores'
import { cn } from '~/utils'

export const Footer = () => {
  const { poweredBy, prevButton, nextButton } = useSnapshot(footerStore)

  return (
    <>
      {poweredBy ? (
        <div className="flex-none">
          <img src={poweredByImg} alt="Powered by Valyuu" className="h-[58] w-[120px] flex-none" />
        </div>
      ) : null}
      {prevButton ? (
        <Button
          variant="secondary"
          className={cn('flex-none', { 'w-full': !poweredBy && !nextButton })}
          onClick={prevButton.onClick}
          disabled={prevButton.disabled}
          arrow={poweredBy ? 'none' : 'left'}
        >
          {prevButton.textOverride || 'Vorige stap'}
        </Button>
      ) : null}
      {nextButton ? (
        <Button
          className={cn('flex-none', { invisible: nextButton.invisible, 'w-full': !poweredBy && !prevButton })}
          onClick={nextButton.onClick}
          disabled={nextButton.disabled}
          arrow={poweredBy ? 'none' : 'right'}
        >
          {nextButton.textOverride || 'Verder'}
        </Button>
      ) : null}
    </>
  )
}
