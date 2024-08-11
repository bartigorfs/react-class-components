import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@providers/themeProvider.tsx'
import { store } from '@store/store.ts'

// Мокирование необходимых зависимостей
vi.mock('./ErrorBoundary.tsx', () => ({
  __esModule: true,
  default: (props: never) => <div>{props.fallback}</div>,
}))

vi.mock('@components/DescribeError/DescribeError.tsx', () => ({
  __esModule: true,
  default: () => <div>DescribeError Component</div>,
}))

vi.mock('@providers/themeProvider.tsx', () => ({
  __esModule: true,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@components/Header/Header.tsx', () => ({
  __esModule: true,
  default: () => <header>Header Component</header>,
}))

vi.mock('@routes/router.tsx', () => ({
  __esModule: true,
  default: {},
}))

describe('App component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>,
    )
  })

  it('renders ErrorBoundary with fallback', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>,
    )
    expect(screen.getByText('DescribeError Component')).toBeInTheDocument()
  })

  it('renders RouterProvider', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>,
    )
  })
})
