import { combineReducers } from 'redux'
import { productsReducer } from '@store/reducers/products/products.reducer.ts'

export const rootReducer = combineReducers({
  products: productsReducer,
})
