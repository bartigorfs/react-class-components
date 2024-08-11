// SelectedElements.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SelectedElements from './SelectedElements'
import { downloadCSV } from '../../util/DownloadCSV.tsx'
import * as redux from 'react-redux'
import {
  selectSelectedProducts,
  selectSelectedProductsCount,
  showSelectedElements,
} from '@store/reducers/products/products.reducer.ts'

vi.mock('../../util/DownloadCSV.tsx', () => ({
  downloadCSV: vi.fn(() => 'data:text/csv;charset=utf-8,Test%20data'),
}))

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}))

const mockUseSelector = redux.useSelector as jest.Mock

describe('SelectedElements', () => {
  it('should render the component when showElement is true', () => {
    mockUseSelector.mockImplementation((selector) => {
      if (selector === showSelectedElements) return true
      if (selector === selectSelectedProductsCount) return 5
      if (selector === selectSelectedProducts) return []
    })

    render(<SelectedElements />)

    expect(screen.getByText(/Selected/i)).toBeInTheDocument()
    expect(screen.getByText(/5/i)).toBeInTheDocument()
  })

  it('should not render the component when showElement is false', () => {
    mockUseSelector.mockImplementation((selector) => {
      if (selector === showSelectedElements) return false
      if (selector === selectSelectedProductsCount) return 5
      if (selector === selectSelectedProducts) return []
    })

    render(<SelectedElements />)

    expect(screen.queryByText(/Selected/i)).not.toBeInTheDocument()
  })

  it('should trigger download on button click', () => {
    mockUseSelector.mockImplementation((selector) => {
      if (selector === showSelectedElements) return true
      if (selector === selectSelectedProductsCount) return 5
      if (selector === selectSelectedProducts) return []
    })

    render(<SelectedElements />)
    const downloadButton = screen.getByText(/Download/i)
    fireEvent.click(downloadButton)

    // Проверка, что `downloadCSV` была вызвана
    expect(downloadCSV).toHaveBeenCalledWith([])
  })
})
