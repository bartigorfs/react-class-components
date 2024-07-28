import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import Loader from './Loader'

vi.mock('./Loader.module.css', () => ({
  __esModule: true,
  default: {
    container: 'mocked-container-class',
  },
}))

vi.mock('@assets/loader.gif', () => ({
  __esModule: true,
  default: 'loader.gif',
}))

describe('Loader component', () => {
  it('renders the Loader component', () => {
    render(<Loader />)

    expect(screen.getByAltText('Loading...')).toBeInTheDocument()
  })

  it('displays the correct image source', () => {
    render(<Loader />)

    expect(screen.getByRole('img')).toHaveAttribute('src', 'loader.gif')
  })

  it('applies the correct width and height from props', () => {
    const width = 100
    const height = 200

    render(<Loader width={width} height={height} />)

    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('width', width.toString())
    expect(img).toHaveAttribute('height', height.toString())
  })

  it('has the correct className', () => {
    render(<Loader />)

    const divElement = screen.getByRole('img').closest('div')
    expect(divElement).toHaveClass('mocked-container-class')
  })
})
