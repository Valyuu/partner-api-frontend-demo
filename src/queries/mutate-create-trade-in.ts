import { useMutation } from '@tanstack/react-query'

const useCreateTradeIn = () => {
  const baseUrl = import.meta.env.API_BASE_URL
  const authKey = import.meta.env.API_AUTH_KEY

  return useMutation<Components.Schemas.V1CreateTradeInOutput, Error, Components.Schemas.V1CreateTradeInInput>({
    mutationFn: async (tradeInData) => {
      const url = `${baseUrl}/v1/trade-in`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': authKey,
        },
        body: JSON.stringify({ ...tradeInData, partnerPlatform: 'EMBEDDED' }),
      })

      if (!response.ok) {
        throw new Error('Failed to create trade-in')
      }

      return response.json()
    },
  })
}

export { useCreateTradeIn }
