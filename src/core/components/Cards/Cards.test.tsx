import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import Cards from './Cards'
import Card from '@components/Card/Card'
import { ProductsTestArray } from '../../../tests/mockData.ts'
import { Product } from '@api/api.models.ts'

vi.mock('@components/Card/Card', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mocked Card</div>),
}))

vi.mock('./Cards.module.css', () => ({
  __esModule: true,
  default: {
    box: 'mocked-box-class',
  },
}))

describe('Cards component', () => {
  it('renders without crashing', () => {
    render(<Cards cards={[]} />)
    expect(screen.getByTestId('cards-container')).toBeInTheDocument()
  })

  it('passes correct props to Card components', () => {
    render(<Cards cards={ProductsTestArray} />)
    ProductsTestArray.forEach((product: Product) => {
      expect(Card).toHaveBeenCalledWith(
        expect.objectContaining({
          product: product,
        }),
        {},
      )
    })
  })
})
