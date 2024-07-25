import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { BrandsPage } from './page'

export const BrandsRoute: PageRouteType = {
  component: BrandsPage,
  path: NavigationDestination.Brands as const,
}
