import { NavigationDestination } from '~/constants'
import { PageRouteType } from '~/interfaces'

import { IndexPage } from './page'

export const IndexRoute: PageRouteType = {
  component: IndexPage,
  path: '/' + NavigationDestination.Index,
}
