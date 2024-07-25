import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_TIME } from '~/constants'

export const useGetCategories = ({
  lang,
  enabled = true,
}: Components.Schemas.PartnerV1GetCategoriesInput & { enabled?: boolean }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const authKey = import.meta.env.VITE_API_AUTH_KEY

  return useQuery<
    Components.Schemas.WrappedPartnerV1GetCategoriesOutput,
    Error,
    Components.Schemas.WrappedPartnerV1GetCategoriesOutput,
    [string, Components.Schemas.PartnerV1GetCategoriesInput]
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
          Authorization: authKey,
        },
      })

      return response.json()
    },
    staleTime: QUERY_CACHE_TIME,
    enabled,
  })
}
