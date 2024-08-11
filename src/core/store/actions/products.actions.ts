import { Product } from '@api/api.models.ts'

export const ADD_SELECTED_ID = 'ADD_SELECTED_ID'
export const REMOVE_SELECTED_ID = 'REMOVE_SELECTED_ID'

export const addSelectedId = (product: Product | undefined) => ({
  type: ADD_SELECTED_ID,
  payload: product,
})

export const removeSelectedId = (id: number | undefined) => ({
  type: REMOVE_SELECTED_ID,
  payload: id,
})
