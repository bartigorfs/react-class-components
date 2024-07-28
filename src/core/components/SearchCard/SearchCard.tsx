import React, { useEffect, useState } from 'react'

import styles from './SearchCard.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '@components/Loader/Loader.tsx'
import { useGetElementInfoQuery } from '@store/slices/products.slice.tsx'
import Card from '@components/Card/Card.tsx'

function SearchCard() {
  const { detailId } = useParams()
  const [searchId, setSearchId] = useState<string | undefined>()

  const { data, error, isLoading } = useGetElementInfoQuery(searchId, {
    skip: !searchId,
  })

  useEffect(() => {
    setSearchId(detailId)
  }, [detailId])

  useEffect(() => {
    console.warn(error)
  }, [error])

  const navigate = useNavigate()

  const handleCloseComponent = () => {
    navigate(`/${window.location.search}`)
  }

  function CloseButton() {
    return (
      <div className={styles.buttonContainer}>
        <button onClick={handleCloseComponent}>Close</button>
      </div>
    )
  }

  const displayCard = () => {
    return <Card {...data} bottomElement={<CloseButton />} ignoreCardClick={true} />
  }

  const displayLoading = () => (
    <div className={styles.cardBox}>
      <Loader height={200} width={200} />
    </div>
  )

  return isLoading ? displayLoading() : displayCard()
}

export default SearchCard
