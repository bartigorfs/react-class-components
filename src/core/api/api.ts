import { Product } from './api.models'

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
