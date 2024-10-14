import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { CategoryPage } from './page'

export const CategoriesRoute: PageRouteType = {
  component: CategoryPage,
  path: NavigationDestination.Category,
}
