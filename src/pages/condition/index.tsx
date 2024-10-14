import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { ConditionPage } from './page'

export const ModelConditionsRoute: PageRouteType = {
  component: ConditionPage,
  path: NavigationDestination.Condition,
}
