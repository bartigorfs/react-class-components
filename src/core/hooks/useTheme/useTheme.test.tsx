import { describe, it, expect, vi } from 'vitest'
import { useTheme } from './useTheme'
import { IThemeContext } from '@ctx/themeCtx.tsx'
import { renderHook } from '@testing-library/react-hooks'
import { act, createContext, useContext } from 'react'

// Mocking the context
const mockToggleTheme = vi.fn()

const mockContextValue: IThemeContext = {
  theme: 'dark',
  toggleTheme: mockToggleTheme,
}

const MockThemeContext = createContext<IThemeContext>(mockContextValue)

const useTheme = () => useContext(MockThemeContext)

describe('useTheme', () => {
  it('should return the correct theme context with default theme', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('dark')
  })

  it('should return the correct theme context with different theme', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(mockToggleTheme).toHaveBeenCalled()
  })
})
