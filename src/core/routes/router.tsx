import { createBrowserRouter } from 'react-router-dom'
import Main from './Main.tsx'
import NotFound from '@components/404/404.tsx'
import DescribeError from '@components/DescribeError/DescribeError.tsx'
import React from 'react'
import Card from '@components/Card/Card.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <DescribeError />,
    children: [
      {
        path: '/details/:detailId',
        element: <Card />,
        errorElement: <DescribeError />,
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <DescribeError />,
  },
])

export default router
