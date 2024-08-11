import { IProductsReducer, IState } from '@store/reducers/products/products.model.ts'
import {
  ADD_SELECTED_ID,
  REMOVE_ALL_SELECTED_ID,
  REMOVE_SELECTED_ID,
} from '@store/actions/products.actions.ts'
import { createSelector } from '@reduxjs/toolkit'
import { Product } from '@api/api.models.ts'

const initialState: IProductsReducer = {
  selectedProducts: [],
}

export const productsReducer = (state: IProductsReducer = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_ID:
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, action.payload],
      }
    case REMOVE_SELECTED_ID:
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(
          (item: Product) => item.id !== action.payload,
        ),
      }
    case REMOVE_ALL_SELECTED_ID: {
      return {
        ...state,
        selectedProducts: [],
      }
    }
    default:
      return state
  }
}

export const selectSelectedProductsCount = (state: IState) =>
  state.root.products.selectedProducts?.length

export const showSelectedElements = createSelector(
  [selectSelectedProductsCount],
  (value: number | undefined): boolean => value > 0,
)

export const selectSelectedProducts = (state: IState) => state.root.products.selectedProducts

export const selectSelectedProductState = (id: number | undefined) =>
  createSelector(
    [selectSelectedProducts],
    (selectedProducts: Product[]) => !!selectedProducts.find((item: Product) => item.id === id),
  )
