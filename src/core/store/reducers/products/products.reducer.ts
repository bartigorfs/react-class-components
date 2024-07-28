import { IProductsReducer } from '@store/reducers/products/products.model.ts'

const initialState: IProductsReducer = {
  count: 0,
}

export const productsReducer = (state: IProductsReducer = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    default:
      return state
  }
}
