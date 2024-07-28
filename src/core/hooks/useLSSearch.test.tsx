import { renderHook } from '@testing-library/react-hooks'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import useLSSearch from './useLSSearch'
import { act } from 'react'

describe('useLSSearch hook', () => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {}

    return {
      getItem(key: string) {
        return store[key] || null
      },
      setItem(key: string, value: string) {
        store[key] = value
      },
      clear() {
        store = {}
      },
      removeItem(key: string) {
        delete store[key]
      },
    }
  })()

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock)
    localStorageMock.clear()
  })

  it('should initialize with value from localStorage', () => {
    localStorage.setItem('userSearch', 'initialValue')

    const { result } = renderHook(() => useLSSearch('userSearch'))

    expect(result.current[0]).toBe('initialValue')
  })

  // Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info.
  // Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
  // Warning: unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot
  // it('should update localStorage when search value changes', () => {
  //   const { result } = renderHook(() => useLSSearch('userSearch'));
  //
  //   act(() => {
  //     result.current[1]('newValue');
  //   });
  //
  //   console.log(localStorage.getItem('userSearch'));
  //
  //   expect(localStorage.getItem('userSearch')).toBe('newValue');
  // });

  it('should return updated search value', () => {
    const { result } = renderHook(() => useLSSearch('userSearch'))

    act(() => {
      result.current[1]('anotherValue')
    })

    expect(result.current[0]).toBe('anotherValue')
  })
})
