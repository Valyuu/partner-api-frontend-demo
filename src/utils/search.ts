import fuzzysort from 'fuzzysort'

export const processSearchValue = (searchValue: string): string => {
  return searchValue.toLowerCase().replace(/\s+/g, ' ').trim()
}

const prepareData = (data: Components.Schemas.V1GetModelsItemOutput[]) =>
  data.map((model) => ({
    obj: model,
    id: model.id,
    name: model.name,
    additionalBrandName: model.additionalBrandName,
  }))

export const searchAndFilter = (data: Components.Schemas.V1GetModelsItemOutput[], searchValue: string) => {
  if (!data || data.length === 0) return []

  const processedSearchValue = processSearchValue(searchValue)
  if (!processedSearchValue) return data

  const preparedData = prepareData(data)

  const results = fuzzysort.go(processedSearchValue, preparedData, {
    keys: ['name', 'additionalBrandName'],
    threshold: -10000, // Adjust this value to control the fuzziness
    limit: 30, // Adjust this value to limit the number of results
  })

  return results.map((result) => result.obj)
}
