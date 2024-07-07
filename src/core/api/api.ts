import { GetProductsResponse, Product } from './api.models'

export const fetchData = async (): Promise<Product[]> => {
  const response: GetProductsResponse = await (
    await fetch(
      `${import.meta.env.VITE_API_URL}products/category/${import.meta.env.VITE_API_START_CATEGORY}?limit=${import.meta.env.VITE_API_PRODUCTS_MAX_COUNT}`,
    )
  ).json()
  console.log(response)
  return response.products
}

export const searchData = async (query: string) => {
  const response = await (
    await fetch(`${import.meta.env.VITE_API_URL}products/search?q=${query}`)
  ).json()
  console.log(response)
}
