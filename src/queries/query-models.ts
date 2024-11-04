import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_TIME } from '~/constants'

export const useModels = ({
  enabled = true,
  ...params
}: Components.Schemas.V1GetModelsInput & { enabled?: boolean }) => {
  const baseUrl = import.meta.env.API_BASE_URL
  const authKey = import.meta.env.API_AUTH_KEY

  return useQuery<
    Components.Schemas.V1WrappedGetModelsOutput,
    Error,
    Components.Schemas.V1WrappedGetModelsOutput,
    [string, Components.Schemas.V1GetModelsInput]
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
          'X-Api-Key': authKey,
        },
      })

      return response.json()
    },
    staleTime: QUERY_CACHE_TIME,
    enabled,
  })
}
