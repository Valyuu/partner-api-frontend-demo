import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_TIME } from '~/constants'

export const useGetModels = ({
  enabled = true,
  ...params
}: Components.Schemas.PartnerV1GetModelsInput & { enabled?: boolean }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const authKey = import.meta.env.VITE_API_AUTH_KEY

  return useQuery<
    Components.Schemas.WrappedPartnerV1GetModelsOutput,
    Error,
    Components.Schemas.WrappedPartnerV1GetModelsOutput,
    [string, Components.Schemas.PartnerV1GetModelsInput]
  >({
    queryKey: ['models', params],
    queryFn: async () => {
      const url = new URL(`${baseUrl}/v1/models`)
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString())
        }
      })

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authKey,
        },
      })

      return response.json()
    },
    staleTime: QUERY_CACHE_TIME,
    enabled,
  })
}
