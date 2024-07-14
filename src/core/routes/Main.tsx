import React, { useEffect, useState } from 'react'

import { fetchData } from '@api/api'
import { Product } from '@api/api.models'

import Cards from '@components/Cards/Cards'
import Loader from '@components/Loader/Loader'
import ThrowError from '@components/ThrowError/ThrowError'
import SearchField from '@components/SearchField/SearchField'
import Pagination from '@components/Pagination/Pagination.tsx'

function Main() {
  const [loadingCards, setLoadingCards] = useState<boolean>(true)
  const [cards, setCards] = useState<Product[]>([])

  const fetchProductsData = async (query?: string) => {
    setCards([])
    setLoadingCards(true)

    try {
      let result = await fetchData(query)

      if (result && result.length <= 0) {
        result = await fetchData()
      }

      setCards(result)
      setLoadingCards(false)
    } catch (e) {
      setCards([])
      setLoadingCards(false)
    }
  }

  const handleSearch = (query: string) => {
    fetchProductsData(query)
  }

  useEffect(() => {
    fetchProductsData()
  }, [])

  return (
    <div className='container'>
      <SearchField onSearch={handleSearch} />
      {loadingCards ? (
        <Loader />
      ) : (
        <>
          <Cards cards={cards} />
          <Pagination totalItemsAmount={10} />
        </>
      )}
      <ThrowError />
    </div>
  )
}

export default Main
