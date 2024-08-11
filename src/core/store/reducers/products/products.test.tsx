// products.reducer.test.ts
import { describe, it, expect } from 'vitest'
import { productsReducer } from '@store/reducers/products/products.reducer' // Путь к вашему редуктору
import { ADD_SELECTED_ID, REMOVE_SELECTED_ID } from '@store/actions/products.actions' // Путь к вашим действиям
import { IProductsReducer } from '@store/reducers/products/products.model' // Путь к модели состояния

const initialState: IProductsReducer = {
  selectedProducts: [],
}

describe('productsReducer', () => {
  it('should return the initial state', () => {
    expect(productsReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle ADD_SELECTED_ID', () => {
    const data = { id: 1, title: 'TEST' }
    const action = { type: ADD_SELECTED_ID, payload: data }
    const expectedState = {
      selectedProducts: [data],
    }

    expect(productsReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle REMOVE_SELECTED_ID', () => {
    const initialStateWithIds = {
      selectedProducts: [
        { id: 1, title: 'TEST' },
        { id: 2, title: 'TEST' },
        { id: 3, title: 'TEST' },
      ],
    }
    const idToRemove = 2
    const action = { type: REMOVE_SELECTED_ID, payload: idToRemove }
    const expectedState = {
      selectedProducts: [
        { id: 1, title: 'TEST' },
        { id: 3, title: 'TEST' },
      ],
    }

    expect(productsReducer(initialStateWithIds, action)).toEqual(expectedState)
  })

  it('should handle REMOVE_SELECTED_ID for non-existent ID', () => {
    const initialStateWithIds = {
      selectedProducts: [
        { id: 1, title: 'TEST' },
        { id: 2, title: 'TEST' },
        { id: 3, title: 'TEST' },
      ],
    }
    const idToRemove = 4
    const action = { type: REMOVE_SELECTED_ID, payload: idToRemove }
    const expectedState = {
      selectedProducts: [
        { id: 1, title: 'TEST' },
        { id: 2, title: 'TEST' },
        { id: 3, title: 'TEST' },
      ],
    }

    expect(productsReducer(initialStateWithIds, action)).toEqual(expectedState)
  })
})
