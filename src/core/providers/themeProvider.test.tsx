import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeContext } from '@ctx/themeCtx.tsx'
import { ThemeProvider } from '@providers/themeProvider.tsx'
import React from 'react'

describe('ThemeProvider', () => {
  it('should apply the initial theme class', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>,
    )

    const parentDiv = screen.getByTestId('theme-provider').closest('div')

    // Ensure the parent element has the correct class
    expect(parentDiv).toHaveClass('theme-dark')
  })

  it('should toggle theme class when theme changes', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = React.useContext(ThemeContext)
      return (
        <div>
          <div className={`themeWrapper ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            Test Content
          </div>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
      )
    }

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    )

    const themeWrapper = screen.getByText('Test Content').closest('.themeWrapper')
    const toggleButton = screen.getByText('Toggle Theme')

    // Check initial theme class
    expect(themeWrapper).toHaveClass('theme-dark')

    // Click the button to toggle the theme
    fireEvent.click(toggleButton)

    // After clicking, the theme should be 'light'
    expect(themeWrapper).toHaveClass('theme-light')
  })

  it('should render children correctly', () => {
    render(
      <ThemeProvider>
        <div>Child Component</div>
      </ThemeProvider>,
    )

    // Check if the child component is rendered correctly
    expect(screen.getByText('Child Component')).toBeInTheDocument()
  })
})
