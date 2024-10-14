import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { ModelAttributePage } from './page'

export const ModelAttributesRoute: PageRouteType = {
  component: ModelAttributePage,
  path: NavigationDestination.ModelAttribute,
}
