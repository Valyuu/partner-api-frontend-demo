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

export const tocStore = proxy<TocStoreType>(TOC_STORE_DEFAULT)
