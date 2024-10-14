import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { AddToCartPage } from './page'

export const AddToCartRoute: PageRouteType = {
  component: AddToCartPage,
  path: NavigationDestination.AddToCart,
}
