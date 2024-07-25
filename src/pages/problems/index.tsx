import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { ProblemsPage } from './page'

export const ProblemsRoute: PageRouteType = {
  component: ProblemsPage,
  path: NavigationDestination.Problems as const,
}
