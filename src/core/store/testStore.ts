import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@store/reducers/root.reducer.ts'

const testStore = configureStore({
  reducer: rootReducer,
})

export default testStore
