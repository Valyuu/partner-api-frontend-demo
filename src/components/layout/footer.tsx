import { useSnapshot } from 'valtio'

import { stepButtonsState } from '~/stores'
import { cn } from '~/utils'

import { Button } from '../ui'

export const Footer = () => {
  const stepButtons = useSnapshot(stepButtonsState)

  return (
    <>
      <Button
        variant="secondary"
        className={cn('mt-6', { invisible: stepButtons.prev.hidden ?? false })}
        onClick={stepButtons.prev.onClick}
        disabled={stepButtons.prev.disabled}
      >
        ← Vorige stap
      </Button>
      <Button
        className={cn('mt-6', { invisible: stepButtons.next.hidden ?? true })}
        onClick={stepButtons.next.onClick}
        disabled={stepButtons.next.disabled}
      >
        Volgende →
      </Button>
    </>
  )
}
