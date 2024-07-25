import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { CategoriesPage } from './page'

export const CategoriesRoute: PageRouteType = {
  component: CategoriesPage,
  path: NavigationDestination.Categories as const,
}
