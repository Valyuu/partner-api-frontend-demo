import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { ConfirmationPage } from './page'

export const ConfirmationRoute: PageRouteType = {
  component: ConfirmationPage,
  path: NavigationDestination.Confirmation as const,
}
