import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { ProblemPage } from './page'

export const ProblemsRoute: PageRouteType = {
  component: ProblemPage,
  path: NavigationDestination.Problem,
}
