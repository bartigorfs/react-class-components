import { GetProductsResponse, Product } from './api.models'

const makeRequestUrl = (query: string | undefined) => {
  console.log(query)
  if (query) {
    return `${import.meta.env.VITE_API_URL}products/search?q=${query}`
  }
  return `${import.meta.env.VITE_API_URL}products/category/${import.meta.env.VITE_API_START_CATEGORY}?limit=${import.meta.env.VITE_API_PRODUCTS_MAX_COUNT}`
}

export const fetchData = async (query?: string): Promise<Product[] | null> => {
  const apiThrottle = new Promise((resolve) =>
    setTimeout(resolve, import.meta.env.VITE_API_THROTTLE_TIME),
  )

  try {
    const requestUrl: string = makeRequestUrl(query)

    const response = await fetch(requestUrl)

    const requestThrottle = await Promise.all([response, apiThrottle])

    const json: GetProductsResponse = await requestThrottle[0].json()
    return json.products
  } catch (e) {
    console.log(e)
    return null
  }
}
