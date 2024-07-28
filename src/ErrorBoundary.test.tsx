import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ErrorBoundary from './ErrorBoundary'

const DescribeError = () => <div>DescribeError Component</div>

const ErrorComponent = () => {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary fallback={<DescribeError />}>
        <div>Test Child</div>
      </ErrorBoundary>,
    )

    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('renders DescribeError component when an error is caught', () => {
    // Suppress the error boundary error message in the console
    vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary fallback={<DescribeError />}>
        <ErrorComponent />
      </ErrorBoundary>,
    )

    expect(screen.getByText('DescribeError Component')).toBeInTheDocument()

    // Restore the console.error mock
    vi.restoreAllMocks()
  })
})
