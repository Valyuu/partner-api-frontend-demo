import { cloneDeep } from 'lodash-es'

import { createPersistedStore } from '~/utils'

export const CART_STORE_KEY = 'valyuu_cartStore'

export type CartStoreItemDisplayType = {
  name: string
  image: string
  attributes: string[]
}

export type CartStoreItemDataType =
  | {
      variantId: string
      plan: string
      price: number
      isProductFunctional: true
      conditionCombinationId: string
    }
  | {
      variantId: string
      plan: string
      price: number
      isProductFunctional: false
      problemIds: string[]
    }

export type CartStoreItemType = {
  id: string
  display: CartStoreItemDisplayType
  data: CartStoreItemDataType
}

export const CART_STORE_DEFAULT: CartStoreItemType[] = []

export const cartStore = createPersistedStore<CartStoreItemType[]>(CART_STORE_KEY, cloneDeep(CART_STORE_DEFAULT))
