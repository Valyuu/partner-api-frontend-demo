import { create, insert, search } from '@orama/orama'

export const initializeSearchEngine = async (data: Components.Schemas.V1GetModelsItemOutput[]) => {
  if (!data || data.length === 0) return null

  const db = await create({
    schema: {
      id: 'string',
      name: 'string',
      nameNoSpace: 'string',
    },
  } as const)

  for (const model of data) {
    await insert(db, {
      id: model.id,
      name: model.name,
      nameNoSpace: model.name.replace(/\s+/g, ''),
    })
  }

  return db
}

export const processSearchValue = (searchValue: string): string => {
  return searchValue.toLowerCase().replace(/\s+/g, ' ').trim()
}

export const searchAndFilter = async (
  data: Components.Schemas.V1GetModelsItemOutput[],
  searchValue: string,
  searchEngine: Awaited<ReturnType<typeof initializeSearchEngine>>
) => {
  if (!data || data.length === 0) return []

  const processedSearchValue = processSearchValue(searchValue)
  if (!processedSearchValue) return data

  const searchNoSpace = processedSearchValue.replace(/\s+/g, '')
  const searchWords = processedSearchValue.split(/\s+/)

  const filterFunction = (model: Components.Schemas.V1GetModelsItemOutput) => {
    const modelNameLower = (model.name || '').toLowerCase()
    const modelNameNoSpace = modelNameLower.replace(/\s+/g, '')
    const modelWords = modelNameLower.split(/\s+/)

    const allWordsPresent = searchWords.every((word) => modelWords.some((modelWord) => modelWord.includes(word)))

    return modelNameNoSpace.includes(searchNoSpace) || allWordsPresent
  }

  if (!searchEngine) {
    // Fallback to basic search if Orama engine is not available
    return data.filter(filterFunction)
  }

  const results = await search(searchEngine, {
    term: processedSearchValue,
    properties: ['name', 'nameNoSpace'],
    boost: { name: 2, nameNoSpace: 1 },
    tolerance: 3,
  })

  if (results.hits.length === 0) {
    // If no results, fall back to a more lenient search
    return data.filter(filterFunction)
  }

  return results.hits
    .map((hit) => data.find((model) => model.id === hit.document.id))
    .filter((model) => !!model)
    .filter(filterFunction)
}
