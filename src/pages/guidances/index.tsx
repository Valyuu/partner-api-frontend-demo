import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { ModelGuidancesPage } from './page'

export const ModelGuidancesRoute: PageRouteType = {
  component: ModelGuidancesPage,
  path: NavigationDestination.Guidances as const,
}
