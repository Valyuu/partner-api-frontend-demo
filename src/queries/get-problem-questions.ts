import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_TIME } from '~/constants'

export const useGetProblemQuestions = ({
  modelId,
  lang,
  enabled = true,
}: Components.Schemas.PartnerV1GetQuestionsInput & { enabled?: boolean }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const authKey = import.meta.env.VITE_API_AUTH_KEY

  return useQuery<
    Components.Schemas.WrappedPartnerV1GetProblemQuestionsOutput,
    Error,
    Components.Schemas.WrappedPartnerV1GetProblemQuestionsOutput,
    [string, Components.Schemas.PartnerV1GetQuestionsInput]
  >({
    queryKey: ['problem-questions', { modelId, lang }],
    queryFn: async () => {
      const url = new URL(`${baseUrl}/v1/problem-questions`)
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
