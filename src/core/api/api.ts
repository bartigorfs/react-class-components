import { FetchProductsResponse, GetProductsResponse, Product } from './api.models'

const makeRequestUrl = (query: string | undefined, page?: number) => {
  if (query) {
    return `${import.meta.env.VITE_API_URL}products/search?q=${query}&limit=${import.meta.env.VITE_API_PRODUCTS_MAX_COUNT}${page > 1 ? `&skip=${page * import.meta.env.VITE_API_PRODUCTS_MAX_COUNT - import.meta.env.VITE_API_PRODUCTS_MAX_COUNT}` : ''}`
  }
  return `${import.meta.env.VITE_API_URL}products/category/${import.meta.env.VITE_API_START_CATEGORY}?limit=${import.meta.env.VITE_API_PRODUCTS_MAX_COUNT}${page > 1 ? `&skip=${page * import.meta.env.VITE_API_PRODUCTS_MAX_COUNT - import.meta.env.VITE_API_PRODUCTS_MAX_COUNT}` : ''}`
}

export const getElementInfo = async (elementId: number): Promise<Product | null> => {
  const apiThrottle = new Promise((resolve) =>
    setTimeout(resolve, import.meta.env.VITE_API_THROTTLE_TIME),
  )

  try {
    const requestUrl: string = `${import.meta.env.VITE_API_URL}products/${elementId}`

    const response = await fetch(requestUrl)

    const requestThrottle = await Promise.all([response, apiThrottle])

    const json: Product = await requestThrottle[0].json()
    return json
  } catch (e) {
    console.log(e)
    return null
  }
}
