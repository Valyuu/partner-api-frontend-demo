import { cloneDeep } from 'lodash-es'

import { cartStore } from '~/stores'

export const sendCloseEvent = () => {
  window.parent.postMessage({ eventType: 'valyuuCancelTradeIn' }, '*')
}

export const sendCreateTradeInEvent = () => {
  window.parent.postMessage({ eventType: 'valyuuCreateTradeIn', data: cloneDeep(cartStore) }, '*')
}
