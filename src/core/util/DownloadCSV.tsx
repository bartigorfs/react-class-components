import { Product } from '@api/api.models.ts'

export function createCSV(data): string {
  if (!data) return ''

  const header: string = Object.keys(data[0]).join(',')
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => `"${value}"`)
      .join(','),
  )
  return [header, ...rows].join('\n')
}

export const downloadCSV = (products: Product[]) => {
  const csvFile: Blob = new Blob([createCSV(products)], { type: 'text/csv' })
  return URL.createObjectURL(csvFile)
}
