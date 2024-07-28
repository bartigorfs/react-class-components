import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchField from './SearchField'

vi.mock('@hooks/useLSSearch/useLSSearch.tsx', () => {
  return {
    __esModule: true,
    default: vi.fn(),
  }
})

import useLSSearch from '@hooks/useLSSearch/useLSSearch.tsx'

describe('SearchField', () => {
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    useLSSearch.mockReturnValue(['', vi.fn()])
  })

  it('renders input and button', () => {
    render(<SearchField onSearch={mockOnSearch} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('calls onSearch with correct query when button is clicked', () => {
    const userInput = 'test query'
    useLSSearch.mockReturnValue([userInput, vi.fn()])

    render(<SearchField onSearch={mockOnSearch} />)

    fireEvent.click(screen.getByRole('button', { name: /search/i }))
    expect(mockOnSearch).toHaveBeenCalledWith(userInput)
  })
})
