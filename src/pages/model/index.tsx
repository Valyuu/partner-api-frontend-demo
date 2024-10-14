import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { ModelPage } from './page'

export const ModelsRoute: PageRouteType = {
  component: ModelPage,
  path: NavigationDestination.Model,
}
