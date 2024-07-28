import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, useNavigate, useParams } from 'react-router-dom'
import Card from './Card'
import { getElementInfo } from '@api/api'
import { ProductTest, ProductTestImageURL } from '../../../tests/mockData.ts'

vi.mock('./Card.module.css', () => ({
  __esModule: true,
  default: {
    cardBox: 'mocked-card-box-class',
    cardTextBox: 'mocked-card-text-box-class',
    buttonContainer: 'mocked-button-container-class',
  },
}))

vi.mock('@assets/nothing.gif', () => ({
  __esModule: true,
  default: 'nothing.gif',
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  }
})

vi.mock('@api/api.ts', () => ({
  getElementInfo: vi.fn(),
}))

vi.mock('@components/Loader/Loader.tsx', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}))

describe('Card component', () => {
  const navigateMock = vi.fn()
  const detailId = '1'

  beforeEach(() => {
    ;(useNavigate as vi.Mock).mockReturnValue(navigateMock)
    ;(useParams as vi.Mock).mockReturnValue({ detailId })
  })

  it('renders the Card component', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Card />
        </MemoryRouter>,
      )
    })

    const imageElement = screen.getByAltText('Image')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute('src', 'nothing.gif')
  })

  it('renders card data after loading', async () => {
    ;(getElementInfo as vi.Mock).mockResolvedValueOnce(ProductTest)

    await act(async () => {
      render(
        <MemoryRouter>
          <Card {...ProductTest} />
        </MemoryRouter>,
      )
    })

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', ProductTestImageURL)
  })

  it('handles card click', () => {
    render(
      <MemoryRouter>
        <Card id={1} />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('img'))
    expect(navigateMock).toHaveBeenCalledWith('/details/1')
  })

  it('renders fallback image if no image is provided', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Card />
        </MemoryRouter>,
      )
    })

    expect(screen.getByRole('img')).toHaveAttribute('src', 'nothing.gif')
  })

  it('has the correct className', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Card />
        </MemoryRouter>,
      )
    })
    const divElement = screen.getByRole('img').closest('div')
    expect(divElement).toHaveClass('mocked-card-box-class')
  })
})
