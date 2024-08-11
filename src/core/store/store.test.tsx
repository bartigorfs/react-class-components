import { describe, it, expect } from 'vitest'
import { store } from './store.ts'
import { productsSlice } from '@store/slices/products.slice.tsx'

describe('store configuration', () => {
  it('should configure store with products slice and root reducer', () => {
    const state = store.getState()

    expect(state.root).toBeDefined()

    expect(state[productsSlice.reducerPath]).toBeDefined()
  })

  it('should apply products slice middleware', () => {
    const middleware = (store as never).middleware

    expect(middleware).toContain(productsSlice.middleware)
  })
})
