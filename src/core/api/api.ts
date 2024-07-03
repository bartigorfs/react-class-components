export const fetchData = async () => {
  let response = await (await fetch(`${import.meta.env.VITE_API_URL}products?limit=10`)).json()
  console.log(response)
  return response.products
}

export const searchData = async (query: string) => {
  let response = await (
    await fetch(`${import.meta.env.VITE_API_URL}products/search?q=${query}`)
  ).json()
  console.log(response)
}
