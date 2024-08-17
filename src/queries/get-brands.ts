import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_TIME } from '~/constants'

export const useGetBrands = ({
  categoryId,
  lang,
  enabled = true,
}: Components.Schemas.V1GetBrandsInput & { enabled?: boolean }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const authKey = import.meta.env.VITE_API_AUTH_KEY

  return useQuery<
    Components.Schemas.V1WrappedGetBrandsOutput,
    Error,
    Components.Schemas.V1WrappedGetBrandsOutput,
    [string, Components.Schemas.V1GetBrandsInput]
  >({
    queryKey: ['brands', { categoryId, lang }],
    queryFn: async () => {
      const url = new URL(`${baseUrl}/v1/brands`)
      if (categoryId) {
        url.searchParams.append('categoryId', categoryId)
      }
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
