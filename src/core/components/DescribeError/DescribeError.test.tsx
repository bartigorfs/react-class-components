import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import DescribeError from './DescribeError'

vi.mock('./DescribeError.module.css', () => ({
  __esModule: true,
  default: {
    box: 'mocked-box-class',
  },
}))

vi.mock('@public/wasted.gif', () => ({
  __esModule: true,
  default: 'wasted.gif',
}))

describe('DescribeError component', () => {
  it('renders the DescribeError component', () => {
    render(<DescribeError />)
    const headingElement = screen.getByRole('heading', { name: /You got an error! Yay!/i })
    expect(headingElement).toBeInTheDocument()
  })

  it('renders the image with correct alt text', () => {
    render(<DescribeError />)
    const imageElement = screen.getByAltText('Wasted')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute('src', 'https://i.imgur.com/iNeBfPb.gif')
  })

  it('renders the reload button', () => {
    render(<DescribeError />)
    const buttonElement = screen.getByRole('button', { name: /Bruh, reload?/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('reloads the page when button is clicked', () => {
    const reloadMock = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    })

    render(<DescribeError />)
    const buttonElement = screen.getByRole('button', { name: /Bruh, reload?/i })
    fireEvent.click(buttonElement)
    expect(reloadMock).toHaveBeenCalled()
  })

  it('has the corect className', () => {
    render(<DescribeError />)
    const divElement = screen
      .getByRole('heading', { name: /You got an error! Yay!/i })
      .closest('div')
    expect(divElement).toHaveClass('mocked-box-class')
  })
})
