import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Main from './Main'
import { useFetchProductsQuery } from '@store/slices/products.slice.tsx'
import SearchField from '@components/SearchField/SearchField'
import Loader from '@components/Loader/Loader'
import Cards from '@components/Cards/Cards'
import Pagination from '@components/Pagination/Pagination'
import ThrowError from '@components/ThrowError/ThrowError'

// Мокаем необходимые модули и компоненты
vi.mock('@store/slices/products.slice.tsx', () => ({
  useFetchProductsQuery: vi.fn(),
}))

vi.mock('@components/SearchField/SearchField', () => ({
  __esModule: true,
  default: vi.fn(({ onSearch }) => (
    <input data-testid='search-input' onChange={(e) => onSearch(e.target.value)} />
  )),
}))

vi.mock('@components/Loader/Loader', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}))

vi.mock('@components/Cards/Cards', () => ({
  __esModule: true,
  default: ({ cards }) => <div>{cards.length} cards</div>,
}))

vi.mock('@components/Pagination/Pagination', () => ({
  __esModule: true,
  default: ({ totalItemsAmount }) => <div>Pagination: {totalItemsAmount}</div>,
}))

vi.mock('@components/ThrowError/ThrowError', () => ({
  __esModule: true,
  default: () => <div>Error occurred</div>,
}))

describe('Main Component', () => {
  const mockSetSearchParams = vi.fn()
  const mockNavigate = vi.fn()

  beforeEach(() => {
    ;(useFetchProductsQuery as vi.Mock).mockImplementation(({ query, page }) => ({
      data: {
        products: [{ id: 1, name: 'Product' }],
        total: 10,
      },
      error: null,
      isLoading: false,
    }))
  })

  it('renders SearchField, Loader, and other components', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    )

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

    expect(screen.getByText('1 cards')).toBeInTheDocument()
    expect(screen.getByText('Pagination: 10')).toBeInTheDocument()
  })

  it('handles search input and updates local storage', async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    )

    // Проверяем, что localStorage был обновлен
    await waitFor(() => {
      expect(localStorage.getItem('userSearch')).toBe(null)
    })
  })

  it('shows error component when there is an error', () => {
    ;(useFetchProductsQuery as vi.Mock).mockImplementation(() => ({
      data: null,
      error: new Error('Fetch error'),
      isLoading: false,
    }))

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    )

    expect(screen.getByText('Error occurred')).toBeInTheDocument()
  })

  it('shows loader when loading', () => {
    ;(useFetchProductsQuery as vi.Mock).mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: true,
    }))

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
