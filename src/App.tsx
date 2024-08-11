import React from 'react'
import ErrorBoundary from './ErrorBoundary.tsx'
import DescribeError from '@components/DescribeError/DescribeError.tsx'
import { ThemeProvider } from '@providers/themeProvider.tsx'
import { Provider } from 'react-redux'
import { store } from '@store/store.ts'
import Header from '@components/Header/Header.tsx'
import { RouterProvider } from 'react-router-dom'
import router from '@routes/router.tsx'

export default function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary fallback={<DescribeError />}>
        <ThemeProvider>
          <Provider store={store}>
            <Header />
            <RouterProvider router={router} />
          </Provider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
}
