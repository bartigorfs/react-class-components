import { rootReducer } from '@store/reducers/root.reducer.ts'
import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from '@store/slices/products.slice.tsx'

export const store = configureStore({
  reducer: {
    root: rootReducer,
    [productsSlice.reducerPath]: productsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsSlice.middleware),
})
