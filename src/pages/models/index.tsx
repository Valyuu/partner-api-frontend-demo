import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { ModelsPage } from './page'

export const ModelsRoute: PageRouteType = {
  component: ModelsPage,
  path: NavigationDestination.Models as const,
}
