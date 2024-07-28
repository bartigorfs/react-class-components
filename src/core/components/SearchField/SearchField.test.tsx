import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchField from './SearchField'
import useLSSearch from '@hooks/useLSSearch/useLSSearch.tsx'

vi.mock('@hooks/useLSSearch')

describe('SearchField component', () => {
  const mockSetUserInput = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useLSSearch as jest.Mock).mockReturnValue(['', mockSetUserInput])
  })

  it('renders correctly', () => {
    render(<SearchField onSearch={() => {}} />)

    const inputElement = screen.getByRole('textbox')
    const buttonElement = screen.getByRole('button', { name: /search/i })

    expect(inputElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
  })

  it('updates input value correctly', () => {
    render(<SearchField onSearch={() => {}} />)

    const inputElement = screen.getByRole('textbox')

    fireEvent.change(inputElement, { target: { value: 'test' } })

    expect(mockSetUserInput).toHaveBeenCalledWith('test')
  })

  it('calls onSearch with the correct input value', () => {
    ;(useLSSearch as jest.Mock).mockReturnValue(['test', mockSetUserInput])

    const mockOnSearch = vi.fn()
    render(<SearchField onSearch={mockOnSearch} />)

    const buttonElement = screen.getByRole('button', { name: /search/i })

    fireEvent.click(buttonElement)

    expect(mockOnSearch).toHaveBeenCalledWith('test')
  })

  it('loads the value from localStorage', () => {
    localStorage.setItem('userSearch', 'storedValue')
    render(<SearchField onSearch={() => {}} />)

    expect(mockSetUserInput).toHaveBeenCalledWith('storedValue')
  })
})
