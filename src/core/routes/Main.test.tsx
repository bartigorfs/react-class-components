import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import Main from './Main'
import { useFetchProductsQuery } from '@store/slices/products.slice.tsx'
import testStore from '@store/testStore.ts'

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

vi.mock('@components/SelectedElements/SelectedElements.tsx', () => ({
  __esModule: true,
  default: () => <div>Selected Elements</div>,
}))

describe('Main Component', () => {
  beforeEach(() => {
    ;(useFetchProductsQuery as vi.Mock).mockImplementation(() => ({
      data: {
        products: [{ id: 1, name: 'Product' }],
        total: 10,
      },
      error: null,
      isLoading: false,
    }))
  })

  it('renders SearchField, Loader, Cards, Pagination, and other components', () => {
    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>,
    )

    // Проверяем, что Loader не отображается
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

    // Проверяем отображение элементов
    expect(screen.getByText('1 cards')).toBeInTheDocument()
    expect(screen.getByText('Pagination: 10')).toBeInTheDocument()
    expect(screen.getByText('Selected Elements')).toBeInTheDocument()
  })

  it('shows Loader when loading', () => {
    ;(useFetchProductsQuery as vi.Mock).mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: true,
    }))

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows error component when there is an error', () => {
    ;(useFetchProductsQuery as vi.Mock).mockImplementation(() => ({
      data: null,
      error: new Error('Fetch error'),
      isLoading: false,
    }))

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByText('Error occurred')).toBeInTheDocument()
  })

  it('navigates back when clicking on nested element', () => {
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Main />
        </MemoryRouter>
      </Provider>,
    )

    // Проверяем, что при клике на элемент срабатывает навигация
    fireEvent.click(screen.getByText('1 cards'))

    expect(window.location.pathname).toBe('/')
  })
})
