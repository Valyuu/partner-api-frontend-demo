import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_TIME } from '~/constants'

export const useGetGeneralQuestions = ({
  modelId,
  lang,
  enabled = true,
}: Components.Schemas.PartnerV1GetQuestionsInput & { enabled?: boolean }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const authKey = import.meta.env.VITE_API_AUTH_KEY

  return useQuery<
    Components.Schemas.WrappedPartnerV1GetGeneralQuestionsOutput,
    Error,
    Components.Schemas.WrappedPartnerV1GetGeneralQuestionsOutput,
    [string, Components.Schemas.PartnerV1GetQuestionsInput]
  >({
    queryKey: ['general-questions', { modelId, lang }],
    queryFn: async () => {
      const url = new URL(`${baseUrl}/v1/general-questions`)
      url.searchParams.append('modelId', modelId)
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
