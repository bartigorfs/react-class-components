import React, { useCallback, useContext, useEffect, useState } from 'react'
import { fetchData } from '@api/api'
import { FetchProductsResponse, Product } from '@api/api.models'

import Cards from '@components/Cards/Cards'
import Loader from '@components/Loader/Loader'
import ThrowError from '@components/ThrowError/ThrowError'
import SearchField from '@components/SearchField/SearchField'
import Pagination from '@components/Pagination/Pagination'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ThemeContext } from '../ctx/themeCtx.tsx'

function Main() {
  const [loadingCards, setLoadingCards] = useState<boolean>(true)
  const [cards, setCards] = useState<Product[]>([])
  const [totalItems, setTotalItem] = useState<number>(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const theme = useContext(ThemeContext)

  useEffect(() => {
    console.log(theme)
  }, [theme])

  const isDetailPage = location.pathname.startsWith('/details/')
  const page = Number(searchParams.get('page')) || 1

  const fetchProductsData = useCallback(async (query: string, page: number) => {
    setCards([])
    setLoadingCards(true)

    try {
      let result: FetchProductsResponse | null

      if (query.length > 0) {
        result = await fetchData(query, page)
      } else {
        result = await fetchData('', page)
      }

      if (result && result.products?.length <= 0) {
        result = await fetchData()
      }

      setTotalItem(result?.total || 0)
      setCards(result?.products || [])
      setLoadingCards(false)
    } catch (e) {
      setCards([])
      setLoadingCards(false)
    }
  }, [])

  useEffect(() => {
    const query: string = localStorage.getItem('userSearch') || ''
    fetchProductsData(query, page)
  }, [page])

  const handleSearch = (query?: string) => {
    setSearchParams({ page: '1' })
    fetchProductsData(query || '', 1)
  }

  const closeNestedElement = () => {
    if (isDetailPage) navigate(`/${window.location.search}`)
  }

  return (
    <div className='container'>
      <SearchField onSearch={handleSearch} />
      {loadingCards ? (
        <Loader />
      ) : (
        <div className='nestedContainer'>
          <div onClick={closeNestedElement} className='containerElement'>
            <Cards cards={cards} />
          </div>
          {isDetailPage && (
            <div className='containerElement'>
              <Outlet />
            </div>
          )}
        </div>
      )}
      {cards.length > 0 && <Pagination totalItemsAmount={totalItems} />}
      <ThrowError />
    </div>
  )
}

export default Main
