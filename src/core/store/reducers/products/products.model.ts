import { Product } from '@api/api.models.ts'

export interface IProductsReducer {
  selectedProducts: Product[]
}

export interface IState {
  root: IProducts
}

export interface IProducts {
  products: IProductsReducer
}
