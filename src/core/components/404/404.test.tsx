import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import NotFound from '@components/404/404.tsx'

vi.mock('./404.module.css', () => ({
  __esModule: true,
  default: {
    container: 'mocked-container-class',
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
  }
})

describe('NotFound component', () => {
  it('renders the NotFound component', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    const headingElement = screen.getByRole('heading', { name: /Snort, snort, nothing!/i })
    expect(headingElement).toBeInTheDocument()
  })

  it('renders the image with correct alt text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    const imageElement = screen.getByAltText('Not found')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute('src', 'nothing.gif')
  })

  it('renders the Go back button', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    const buttonElement = screen.getByRole('button', { name: /Go back/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('navigates back when button is clicked', () => {
    const navigateMock = vi.fn()
    ;(useNavigate as vi.Mock).mockReturnValue(navigateMock)

    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    const buttonElement = screen.getByRole('button', { name: /Go back/i })
    fireEvent.click(buttonElement)
    expect(navigateMock).toHaveBeenCalledWith(-1)
  })

  it('has the correct className', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    const divElement = screen
      .getByRole('heading', { name: /Snort, snort, nothing!/i })
      .closest('div')
    expect(divElement).toHaveClass('mocked-container-class')
  })
})
