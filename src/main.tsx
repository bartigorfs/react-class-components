import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorBoundary from './ErrorBoundary.tsx'

import './index.css'
import Header from '@components/Header/Header.tsx'
import DescribeError from '@components/DescribeError/DescribeError.tsx'
import { RouterProvider } from 'react-router-dom'
import router from '@routes/router.tsx'
import { ThemeProvider } from '@providers/themeProvider.tsx'
import { Provider } from 'react-redux'
import { store } from '@store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<DescribeError />}>
      <ThemeProvider>
        <Provider store={store}>
          <Header />
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
