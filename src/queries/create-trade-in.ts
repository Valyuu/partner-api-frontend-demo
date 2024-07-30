import { useMutation } from '@tanstack/react-query'

export const useCreateTradeIn = (input: Components.Schemas.V1CreateTradeInInput) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const authKey = import.meta.env.VITE_API_AUTH_KEY

  return useMutation<Components.Schemas.V1WrappedCreateTradeInOutput, Error>({
    mutationFn: async () => {
      const url = `${baseUrl}/v1/trade-in`

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
  })
}
