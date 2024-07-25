import { proxy } from 'valtio'

import { StepButtonsStateType } from '~/interfaces'

export const STEP_BUTTON_ITEM_DEFAULT = {
  hidden: true,
  disabled: true,
  onClick: () => {},
}

export const STEP_BUTTONS_STATE_DEFAULT = {
  prev: { ...STEP_BUTTON_ITEM_DEFAULT },
  next: { ...STEP_BUTTON_ITEM_DEFAULT },
}

export const stepButtonsState = proxy<StepButtonsStateType>(STEP_BUTTONS_STATE_DEFAULT)

if (import.meta.env.DEV) {
  import('valtio/utils').then(({ devtools }) => {
    devtools(stepButtonsState, { name: 'stepButtonsState', enabled: true })
  })
}
