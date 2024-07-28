// products.reducer.test.ts
import { describe, it, expect } from 'vitest'
import { productsReducer } from '@store/reducers/products/products.reducer' // Путь к вашему редуктору
import { ADD_SELECTED_ID, REMOVE_SELECTED_ID } from '@store/actions/products.actions' // Путь к вашим действиям
import { IProductsReducer } from '@store/reducers/products/products.model' // Путь к модели состояния

// Начальное состояние редуктора
const initialState: IProductsReducer = {
  selectedIds: [],
}

describe('productsReducer', () => {
  it('should return the initial state', () => {
    expect(productsReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle ADD_SELECTED_ID', () => {
    const idToAdd = 1
    const action = { type: ADD_SELECTED_ID, payload: idToAdd }
    const expectedState = {
      selectedIds: [idToAdd],
    }

    expect(productsReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle REMOVE_SELECTED_ID', () => {
    const initialStateWithIds = {
      selectedIds: [1, 2, 3],
    }
    const idToRemove = 2
    const action = { type: REMOVE_SELECTED_ID, payload: idToRemove }
    const expectedState = {
      selectedIds: [1, 3],
    }

    expect(productsReducer(initialStateWithIds, action)).toEqual(expectedState)
  })

  it('should handle REMOVE_SELECTED_ID for non-existent ID', () => {
    const initialStateWithIds = {
      selectedIds: [1, 2, 3],
    }
    const idToRemove = 4 // Не существует в текущем состоянии
    const action = { type: REMOVE_SELECTED_ID, payload: idToRemove }
    const expectedState = {
      selectedIds: [1, 2, 3], // Состояние должно остаться неизменным
    }

    expect(productsReducer(initialStateWithIds, action)).toEqual(expectedState)
  })
})
