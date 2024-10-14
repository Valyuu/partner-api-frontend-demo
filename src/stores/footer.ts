import { proxy } from 'valtio'

export type FooterStoreButtonType = {
  disabled?: boolean
  invisible?: boolean
  onClick: () => void
  textOverride?: string
}

export type FooterStoreType = {
  poweredBy?: boolean
  prevButton?: FooterStoreButtonType
  nextButton?: FooterStoreButtonType
}

export const FOOTER_STORE_DEFAULT: FooterStoreType = {
  poweredBy: undefined,
  prevButton: undefined,
  nextButton: undefined,
}

export const footerStore = proxy<FooterStoreType>(FOOTER_STORE_DEFAULT)

export const setFooterComponents = (update: FooterStoreType) => {
  Object.assign(footerStore, FOOTER_STORE_DEFAULT, update)
}
