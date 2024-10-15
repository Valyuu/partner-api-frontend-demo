import { cloneDeep } from 'lodash-es'
import { proxy } from 'valtio'

export type TocStoreType = {
  tocStatus: [boolean, boolean]
  tocChecked: boolean
  showErrors: boolean
}

export const TOC_STORE_DEFAULT: TocStoreType = {
  tocStatus: [false, false],
  get tocChecked() {
    return this.tocStatus.every(Boolean)
  },
  showErrors: false,
}

export const tocStore = proxy<TocStoreType>(cloneDeep(TOC_STORE_DEFAULT))
