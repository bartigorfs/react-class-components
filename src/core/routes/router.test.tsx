import React from 'react'
import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import router from './router'

vi.mock('@components/404/404.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='not-found'>404 Not Found</div>,
}))

vi.mock('@components/DescribeError/DescribeError.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='describe-error'>Error Occurred</div>,
}))

vi.mock('@components/Card/Card.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='card'>Card Component</div>,
}))

vi.mock('./Main.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='main'>Main Component</div>,
}))

describe('Router', () => {
  it('should render the main component for the root path', () => {
    const testRouter = createMemoryRouter(router.routes, { initialEntries: ['/'] })
    render(<RouterProvider router={testRouter} />)

    expect(screen.getByTestId('main')).toBeInTheDocument()
  })

  it('should render the card component for the details path', () => {
    const testRouter = createMemoryRouter(router.routes, { initialEntries: ['/details/1'] })
    render(<RouterProvider router={testRouter} />)

    expect(screen.getByTestId('main')).toBeInTheDocument()
  })

  it('should render the not found component for an unknown path', () => {
    const testRouter = createMemoryRouter(router.routes, { initialEntries: ['/unknown'] })
    render(<RouterProvider router={testRouter} />)

    expect(screen.getByTestId('not-found')).toBeInTheDocument()
  })

  it('should render the error component when there is an error', () => {
    const testRouter = createMemoryRouter(router.routes, { initialEntries: ['/error'] })
    render(<RouterProvider router={testRouter} />)

    expect(screen.getByTestId('not-found')).toBeInTheDocument()
  })
})
