import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import Main from './Main'
import { fetchData } from '@api/api'
import { Product } from '@api/api.models.ts'

vi.mock('@components/Cards/Cards', () => ({
  __esModule: true,
  default: ({ cards }: { cards: Product[] }) => (
    <div data-testid='cards'>
      {cards.map((card) => (
        <div key={card.id}>{card.title}</div>
      ))}
    </div>
  ),
}))

vi.mock('@components/Loader/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid='loader'>Loading...</div>,
}))

vi.mock('@components/ThrowError/ThrowError', () => ({
  __esModule: true,
  default: () => <div data-testid='throwError'>ThrowError Component</div>,
}))

vi.mock('@components/SearchField/SearchField', () => ({
  __esModule: true,
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <div>
      <input data-testid='search-input' onChange={(e) => onSearch(e.target.value)} />
      <button data-testid='search-button' onClick={() => onSearch('query')}>
        Search
      </button>
    </div>
  ),
}))

vi.mock('@components/Pagination/Pagination', () => ({
  __esModule: true,
  default: ({ totalItemsAmount }: { totalItemsAmount: number }) => (
    <div data-testid='pagination'>Pagination: {totalItemsAmount}</div>
  ),
}))

vi.mock('@api/api', () => ({
  fetchData: vi.fn(),
}))

describe('Main component', () => {
  beforeEach(() => {
    ;(fetchData as vi.Mock).mockClear()
  })

  it('renders loader initially', async () => {
    ;(fetchData as vi.Mock).mockResolvedValue({ products: [], total: 0 })
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByTestId('loader')).toBeInTheDocument()

    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument())
  })

  it('renders cards after loading', async () => {
    ;(fetchData as vi.Mock).mockResolvedValue({
      products: [
        { id: 1, title: 'Product 1' },
        { id: 2, title: 'Product 2' },
      ],
      total: 2,
    })

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument())
    expect(screen.getByTestId('cards')).toBeInTheDocument()
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
  })

  it('fetches data on search', async () => {
    ;(fetchData as vi.Mock).mockResolvedValueOnce({
      products: [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ],
      total: 2,
    })

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </MemoryRouter>,
    )

    const searchInput = screen.getByTestId('search-input')
    const searchButton = screen.getByTestId('search-button')

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } })
      fireEvent.click(searchButton)
    })

    await waitFor(() => expect(fetchData).toHaveBeenCalledWith('test', 1))
  })

  it('handles empty search', async () => {
    ;(fetchData as vi.Mock).mockResolvedValueOnce({
      products: [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ],
      total: 2,
    })

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </MemoryRouter>,
    )

    const searchInput = screen.getByTestId('search-input')
    const searchButton = screen.getByTestId('search-button')

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: '' } })
      fireEvent.click(searchButton)
    })

    await waitFor(() => expect(fetchData).toHaveBeenCalledWith('', 1))
  })

  it('displays pagination when there are cards', async () => {
    ;(fetchData as vi.Mock).mockResolvedValue({
      products: [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ],
      total: 2,
    })

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument())
    expect(screen.getByTestId('pagination')).toBeInTheDocument()
    expect(screen.getByText('Pagination: 2')).toBeInTheDocument()
  })

  it('renders ThrowError component', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<Main />} />
          </Routes>
        </MemoryRouter>,
      )
    })

    expect(screen.getByTestId('throwError')).toBeInTheDocument()
  })
})
