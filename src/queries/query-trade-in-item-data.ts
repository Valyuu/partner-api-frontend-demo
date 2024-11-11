import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_TIME } from '~/constants'

export const useTradeInItemData = ({
  enabled = true,
  ...input
}: Components.Schemas.V1PrepareTradeInItemDataInput & { enabled?: boolean }) => {
  const baseUrl = import.meta.env.API_BASE_URL
  const authKey = import.meta.env.API_AUTH_KEY

  return useQuery<Components.Schemas.V1WrappedPrepareTradeInItemDataOutput, Error>({
    queryKey: ['tradeInItemData', input],
    queryFn: async () => {
      const url = `${baseUrl}/v1/trade-in-item-data`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': authKey,
        },
        body: JSON.stringify(input),
      })

      return response.json()
    },
    staleTime: QUERY_CACHE_TIME,
    enabled: enabled,
  })
}
