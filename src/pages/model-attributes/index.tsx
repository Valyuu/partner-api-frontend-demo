import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { ModelAttributesPage } from './page'

export const ModelAttributesRoute: PageRouteType = {
  component: ModelAttributesPage,
  path: NavigationDestination.ModelAttributes as const,
}
