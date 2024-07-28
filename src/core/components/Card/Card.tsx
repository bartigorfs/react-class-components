import { LazyLoadImage } from 'react-lazy-load-image-component'

import styles from './Card.module.css'
import noimage from '@assets/nothing.gif'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '@components/Loader/Loader.tsx'
import { Product } from '@api/api.models.ts'
import { getElementInfo } from '@api/api.ts'

interface CardProps {
  id?: number
  images?: string[] | undefined
  thumbnail?: string
  title?: string
  description?: string
}

export default Card

function Card(props: CardProps) {
  const [loading, setLoading] = useState(false)
  const { detailId } = useParams()

  const [cardImage, setCardImage] = useState<string | null>(null)
  const [cardTumbnail, setCardTumbnail] = useState<string | null>(null)
  const [cardTitle, setCardTitle] = useState<string | null>(null)
  const [cardDescription, setCardDescription] = useState<string | null>(null)
  const [showClose, setShowClose] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!props.id && detailId) {
      loadCardData(Number(detailId))
    }
  }, [props, detailId])

  const loadCardData = async (id: number | undefined): Promise<void> => {
    if (!id) return

    try {
      setLoading(true)
      const data = await getElementInfo(id)
      setCardImage(data?.images[0])
      setCardTumbnail(data?.thumbnail)
      setCardTitle(data?.title)
      setCardDescription(data?.description)
      setShowClose(true)
      setLoading(false)
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  const handleCardClick = (id: number | undefined) => {
    if (showClose) return
    navigate(`/details/${props.id}${window.location.search}`)
  }

  const handleCloseComponent = () => {
    navigate(`/${window.location.search}`)
  }

  const displayCard = () => (
    <div className={styles.cardBox} onClick={showClose ? null : () => handleCardClick(props.id)}>
      <LazyLoadImage
        alt={'Image'}
        height={'200'}
        src={cardImage ? cardImage : props?.images?.length > 0 ? props?.images[0] : noimage}
        placeholderSrc={cardTumbnail ? cardTumbnail : props.thumbnail}
        effect='blur'
        width={'200'}
      ></LazyLoadImage>
      <div className={styles.cardTextBox}>
        <div className='bold'>{cardTitle ? cardTitle : props.title}</div>
        <div>{cardDescription ? cardDescription : props.description}</div>
      </div>
      {showClose && (
        <div className={styles.buttonContainer}>
          <button onClick={handleCloseComponent}>Close</button>
        </div>
      )}
    </div>
  )

  const displayLoading = () => (
    <div className={styles.cardBox}>
      <Loader height={200} width={200} />
    </div>
  )

  return loading ? displayLoading() : displayCard()
}
