import { describe, it, expect } from 'vitest'
import { store } from './store.ts'
import { productsSlice } from '@store/slices/products.slice.tsx' // Замените на путь к вашему слайсу

describe('store configuration', () => {
  it('should configure store with products slice and root reducer', () => {
    // Проверка, что в хранилище есть редукторы
    const state = store.getState()

    // Проверяем, что `root` редуктор правильно добавлен
    expect(state.root).toBeDefined()

    // Проверяем, что `products` срез правильно добавлен
    expect(state[productsSlice.reducerPath]).toBeDefined()
  })

  it('should apply products slice middleware', () => {
    // Проверка, что миддлвары настроены правильно
    const middleware = (store as any).middleware // Получение middleware из конфигурации хранилища

    expect(middleware).toContain(productsSlice.middleware)
  })
})
