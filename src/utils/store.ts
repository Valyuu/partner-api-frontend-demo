import { cloneDeep } from 'lodash-es'
import { proxy, subscribe } from 'valtio'

export const createPersistedStore = <T extends object>(key: string, initialState: T) => {
  // Try to load the initial state from sessionStorage
  const savedState = sessionStorage.getItem(key)
  const state = proxy<T>(savedState ? JSON.parse(savedState) : cloneDeep(initialState))

  // Subscribe to changes and save to sessionStorage
  subscribe(state, () => {
    sessionStorage.setItem(key, JSON.stringify(state))
  })

  return state
}
