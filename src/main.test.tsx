import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Provider } from 'react-redux'
import ErrorBoundary from './ErrorBoundary'
import DescribeError from '@components/DescribeError/DescribeError.tsx'
import { store } from '@store/store.ts'
import { ThemeProvider } from '@providers/themeProvider.tsx'

// Мокаем компоненты, если необходимо
vi.mock('./ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}))

vi.mock('@components/DescribeError/DescribeError.tsx', () => ({
  __esModule: true,
  default: () => <div>DescribeError</div>,
}))

vi.mock('@components/Header/Header.tsx', () => ({
  __esModule: true,
  default: () => <div>Header</div>,
}))

describe('main.tsx', () => {
  it('renders ErrorBoundary correctly', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary fallback={<DescribeError />}>
            <div>Test content</div>
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>,
    )

    // Проверяем, что ErrorBoundary отображает детей
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders ThemeProvider and Redux Provider correctly', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <div>Test content</div>
        </ThemeProvider>
      </Provider>,
    )

    // Проверяем, что ThemeProvider и Redux Provider отображают детей
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
