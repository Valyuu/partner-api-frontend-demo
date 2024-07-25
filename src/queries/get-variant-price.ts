import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_TIME } from '~/constants'

export const useGetVariantPrice = (input: Components.Schemas.PartnerV1GetVariantPriceInput) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const authKey = import.meta.env.VITE_API_AUTH_KEY

  return useQuery<Components.Schemas.WrappedPartnerV1GetVariantPriceOutput, Error>({
    queryKey: ['variantPrice', input],
    queryFn: async () => {
      const url = `${baseUrl}/v1/variant-price`

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
  })
}
