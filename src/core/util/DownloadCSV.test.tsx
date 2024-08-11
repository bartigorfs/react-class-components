import { describe, it, expect } from 'vitest'
import { createCSV } from './DownloadCSV.tsx'

describe('CSV Utilities', () => {
  describe('createCSV', () => {
    it('should generate correct CSV string', () => {
      const data = [
        { id: 1, name: 'Product A', price: 10.5 },
        { id: 2, name: 'Product B', price: 20.0 },
      ]

      const expectedCSV = ['id,name,price', `"1","Product A","10.5"`, `"2","Product B","20"`].join(
        '\n',
      )

      expect(createCSV(data)).toBe(expectedCSV)
    })

    it('should handle data with missing values', () => {
      const data = [
        { id: 1, name: 'Product A', price: undefined },
        { id: 2, name: 'Product B', price: 20.0 },
      ]

      const expectedCSV = [
        'id,name,price',
        `"1","Product A","undefined"`,
        `"2","Product B","20"`,
      ].join('\n')

      expect(createCSV(data)).toBe(expectedCSV)
    })
  })
})
