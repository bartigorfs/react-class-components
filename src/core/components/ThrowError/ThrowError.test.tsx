import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import ThrowError from './ThrowError'

describe('ThrowError component', () => {
  it('renders correctly', () => {
    render(<ThrowError />)

    const paragraphElement = screen.getByText(/call for a mother of virus/i)
    const buttonElement = screen.getByRole('button', { name: /ok, throw me some numbers/i })

    expect(paragraphElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
  })

  it('throws an error when the button is clicked', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(<ThrowError />)

    const buttonElement = screen.getByRole('button', { name: /ok, throw me some numbers/i })

    expect(() => {
      fireEvent.click(buttonElement)
    }).toThrowError(/yeah that's fits/i)

    consoleError.mockRestore()
  })
})
