// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'

import './index.css'
import Header from '@components/Header/Header.tsx'
import DescribeErorr from '@components/DescribeError/DescribeError.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  //  <React.StrictMode>
  <ErrorBoundary fallback={<DescribeErorr />}>
    <Header />
    <App />
  </ErrorBoundary>,
  //  </React.StrictMode>,
)
