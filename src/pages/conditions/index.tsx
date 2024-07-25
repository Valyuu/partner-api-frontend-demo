import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { ModelConditionsPage } from './page'

export const ModelConditionsRoute: PageRouteType = {
  component: ModelConditionsPage,
  path: NavigationDestination.Conditions as const,
}
