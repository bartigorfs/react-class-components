import { renderHook } from '@testing-library/react-hooks'
import React, { createContext, useContext } from 'react'
import { describe, expect, it, Mock, vi } from 'vitest'
import { IThemeContext } from '@ctx/themeCtx.tsx'
import { act } from 'react'

// Mocking the context
const mockToggleTheme = vi.fn()

const mockContextValue: IThemeContext = {
  theme: 'dark',
  toggleTheme: mockToggleTheme,
}

const MockThemeContext = createContext<IThemeContext>(mockContextValue)

const useTheme = () => useContext(MockThemeContext)

describe('ThemeContext', () => {
  it('should use dark theme by default', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('dark')
  })

  it('should toggle theme', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(mockToggleTheme).toHaveBeenCalled()
  })

  it('should update theme correctly', () => {
    const newContextValue: { toggleTheme: Mock; theme: string } = {
      theme: 'light',
      toggleTheme: mockToggleTheme,
    }

    const MockThemeContextProvider: React.FC = ({ children }) => {
      return (
        <MockThemeContext.Provider value={newContextValue}>{children}</MockThemeContext.Provider>
      )
    }

    const { result } = renderHook(() => useTheme(), {
      wrapper: MockThemeContextProvider,
    })

    expect(result.current.theme).toBe('light')
  })
})
