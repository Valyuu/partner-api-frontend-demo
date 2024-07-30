import { ProductSelectionStateType } from '~/interfaces'
import { createPersistedStore } from '~/utils'

export const PRODUCT_SELECTION_STATE_KEY = 'valyuu_productSelectionState'

export const PRODUCT_SELECTION_STATE_DEFAULT: ProductSelectionStateType = {
  categoryId: undefined,
  brandId: undefined,
  modelId: undefined,
}

export const productSelectionState = createPersistedStore<ProductSelectionStateType>(
  PRODUCT_SELECTION_STATE_KEY,
  PRODUCT_SELECTION_STATE_DEFAULT
)
