import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_TIME } from '~/constants'

export const useCategories = ({
  lang,
  enabled = true,
}: Components.Schemas.V1GetCategoriesInput & { enabled?: boolean }) => {
  const baseUrl = import.meta.env.API_BASE_URL
  const authKey = import.meta.env.API_AUTH_KEY

  return useQuery<
    Components.Schemas.V1WrappedGetCategoriesOutput,
    Error,
    Components.Schemas.V1WrappedGetCategoriesOutput,
    [string, Components.Schemas.V1GetCategoriesInput]
  >({
    queryKey: ['categories', { lang }],
    queryFn: async () => {
      const url = new URL(`${baseUrl}/v1/categories`)
      if (lang) {
        url.searchParams.append('lang', lang)
      }

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
