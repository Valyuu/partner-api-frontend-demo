import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_TIME } from '~/constants'

export const useGetTradeInItemData = ({
  enabled = true,
  ...input
}: Components.Schemas.PartnerV1GetTradeInItemDataInput & { enabled?: boolean }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const authKey = import.meta.env.VITE_API_AUTH_KEY

  return useQuery<Components.Schemas.WrappedPartnerV1GetTradeInItemDataOutput, Error>({
    queryKey: ['tradeInItemData', input],
    queryFn: async () => {
      const url = `${baseUrl}/v1/trade-in-item-data`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authKey,
        },
        body: JSON.stringify(input),
      })

      return response.json()
    },
    staleTime: QUERY_CACHE_TIME,
    enabled: enabled,
  })
}
