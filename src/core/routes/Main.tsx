import React, { useEffect, useState } from 'react'
import Cards from '@components/Cards/Cards'
import Loader from '@components/Loader/Loader'
import ThrowError from '@components/ThrowError/ThrowError'
import SearchField from '@components/SearchField/SearchField'
import Pagination from '@components/Pagination/Pagination'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useFetchProductsQuery } from '@store/slices/products.slice.tsx'
import SelectedElements from '@components/SelectedElements/SelectedElements.tsx'

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const isDetailPage = location.pathname.startsWith('/details/')
  const page = Number(searchParams.get('page')) || 1
  const [query, setQuery] = useState(localStorage.getItem('userSearch') || '')

  const { data, error, isLoading } = useFetchProductsQuery({ query, page })

  useEffect(() => {
    setQuery(localStorage.getItem('userSearch') || '')
  }, [])

  const handleSearch = (searchQuery = '') => {
    setSearchParams({ page: '1' })
    setQuery(searchQuery)
    console.log(searchQuery)
    localStorage.setItem('userSearch', searchQuery)
  }

  const closeNestedElement = () => {
    if (isDetailPage) navigate(`/${window.location.search}`)
  }

  return (
    <div className='container'>
      <SearchField onSearch={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='nestedContainer'>
          <div onClick={closeNestedElement} className='containerElement'>
            <Cards cards={data?.products || []} />
          </div>
          {isDetailPage && (
            <div className='containerElement'>
              <Outlet />
            </div>
          )}
        </div>
      )}
      {data?.products.length > 0 && <Pagination totalItemsAmount={data?.total || 0} />}
      {error && <ThrowError />}
      <SelectedElements />
    </div>
  )
}

export default Main
