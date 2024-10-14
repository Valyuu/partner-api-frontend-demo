import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { SummaryPage } from './page'

export const SummaryRoute: PageRouteType = {
  component: SummaryPage,
  path: NavigationDestination.Summary,
}
