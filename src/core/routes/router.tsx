import { createBrowserRouter } from 'react-router-dom'
import Main from './Main.tsx'
import NotFound from '@components/404/404.tsx'
import DescribeError from '@components/DescribeError/DescribeError.tsx'
import React from 'react'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <DescribeError />,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <DescribeError />,
  }
]);

export default router;
