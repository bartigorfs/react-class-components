import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, useSearchParams } from 'react-router-dom'
import Pagination from './Pagination'

// Мокаем стили, если вы используете CSS-модули
vi.mock('./Pagination.module.css', () => ({
  __esModule: true,
  default: {
    container: 'mocked-container-class',
    paginationItem: 'mocked-pagination-item-class',
    active: 'mocked-active-class',
    inactive: 'mocked-inactive-class',
  },
}))

let searchParamsMock: URLSearchParams
let setSearchParamsMock: vi.Mock

beforeEach(() => {
  searchParamsMock = new URLSearchParams({ page: '1' })
  setSearchParamsMock = vi.fn()
  ;(useSearchParams as vi.Mock).mockReturnValue([searchParamsMock, setSearchParamsMock])
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useSearchParams: vi.fn(() => [searchParamsMock, setSearchParamsMock]),
  }
})

describe('Pagination component', () => {
  it('renders the Pagination component', () => {
    render(
      <MemoryRouter>
        <Pagination totalItemsAmount={20} />
      </MemoryRouter>,
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('displays correct number of pagination items', () => {
    render(
      <MemoryRouter>
        <Pagination totalItemsAmount={20} />
      </MemoryRouter>,
    )

    const paginationItems = screen.getAllByText(/\d+/)
    expect(paginationItems).toHaveLength(5) // 20 items / 4 items per page = 5 pages
  })

  it('activates correct page on click', async () => {
    render(
      <MemoryRouter>
        <Pagination totalItemsAmount={20} />
      </MemoryRouter>,
    )

    const page2 = screen.getByText('2')
    await act(async () => {
      fireEvent.click(page2)
    })

    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: 2 })
  })

  it('goes to the next page on ">" click', async () => {
    render(
      <MemoryRouter>
        <Pagination totalItemsAmount={20} />
      </MemoryRouter>,
    )

    const nextButton = screen.getByText('>')
    await act(async () => {
      fireEvent.click(nextButton)
    })

    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: 2 })
  })

  it('goes to the previous page on "<" click', async () => {
    searchParamsMock.set('page', '2')

    render(
      <MemoryRouter>
        <Pagination totalItemsAmount={20} />
      </MemoryRouter>,
    )

    const prevButton = screen.getByText('<')
    await act(async () => {
      fireEvent.click(prevButton)
    })

    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: 1 })
  })

  it('disables previous button on first page', () => {
    render(
      <MemoryRouter>
        <Pagination totalItemsAmount={20} />
      </MemoryRouter>,
    )

    const prevButton = screen.getByText('<')
    fireEvent.click(prevButton)

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1)
    expect(prevButton).toHaveClass('mocked-inactive-class')
  })

  it('disables next button on last page', () => {
    searchParamsMock.set('page', '5')

    render(
      <MemoryRouter>
        <Pagination totalItemsAmount={20} />
      </MemoryRouter>,
    )

    const nextButton = screen.getByText('>')
    fireEvent.click(nextButton)

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1)
    expect(nextButton).toHaveClass('mocked-inactive-class')
  })
})
