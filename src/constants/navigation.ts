export const NAVIGATION_BRANDS_PAGE_ENABLED = true

export const NAVIGATION_SHOW_NEXT_BUTTON_ON_QUESTIONS_PAGES = false

export enum NavigationDestination {
  Categories = '/categories',
  Brands = '/brands',
  Models = '/models',
  ModelAttributes = '/model-attributes',
  Guidances = '/guidances',
  Conditions = '/conditions',
  Problems = '/problems',
  Confirmation = '/confirmation',
  HistoryBack = -1,
  HistoryForward = 1,
  Current = '.',
}

export enum NavigationFromAction {
  Back = 'back',
  Forward = 'forward',
  Reset = 'reset',
}
