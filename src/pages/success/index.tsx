import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { SuccessPage } from './page'

export const SuccessRoute: PageRouteType = {
  component: SuccessPage,
  path: NavigationDestination.Success,
}
