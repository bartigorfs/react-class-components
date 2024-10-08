import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FetchProductsResponse, Product } from './api.models.ts'

const apiUrl = import.meta.env.VITE_API_URL
const productsMaxCount = import.meta.env.VITE_API_PRODUCTS_MAX_COUNT
const throttleTime = import.meta.env.VITE_API_THROTTLE_TIME
const startCategory = import.meta.env.VITE_API_START_CATEGORY

export const productsSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<FetchProductsResponse, { query?: string; page?: number }>({
      query: ({ query, page }) => {
        const skip = page && page > 1 ? `&skip=${page * productsMaxCount - productsMaxCount}` : ''
        if (query) {
          return `products/search?q=${query}&limit=${productsMaxCount}${skip}`
        }
        return `products/category/${startCategory}?limit=${productsMaxCount}${skip}`
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await new Promise((resolve) => setTimeout(resolve, throttleTime))
          await queryFulfilled
        } catch (error) {
          console.log(error)
        }
      },
    }),
    getElementInfo: builder.query<Product, number>({
      query: (elementId) => `products/${elementId}`,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await new Promise((resolve) => setTimeout(resolve, throttleTime))
          await queryFulfilled
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const { useFetchProductsQuery, useGetElementInfoQuery } = productsSlice
