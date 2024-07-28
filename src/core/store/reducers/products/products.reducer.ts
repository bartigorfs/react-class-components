import { IProductsReducer } from '@store/reducers/products/products.model.ts'
import { ADD_SELECTED_ID, REMOVE_SELECTED_ID } from '@store/actions/products.actions.ts'

const initialState: IProductsReducer = {
  selectedIds: [],
}

export const productsReducer = (state: IProductsReducer = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_ID:
      return {
        ...state,
        selectedIds: [...state.selectedIds, action.payload],
      }
    case REMOVE_SELECTED_ID:
      return {
        ...state,
        selectedIds: state.selectedIds.filter((item) => item !== action.payload),
      }
    default:
      return state
  }
}
