import React from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import noimage from '@assets/nothing.gif'

import styles from './Card.module.css'
import { c } from 'vite/dist/node/types.d-aGj9QkWt'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@hooks/useTheme/useTheme.tsx'

interface CardProps {
  id?: number
  images?: string[] | undefined
  thumbnail?: string
  title?: string
  description?: string
  bottomElement?: React.ReactNode
  topElement?: React.ReactNode
  ignoreCardClick?: boolean
}

function Card(props: CardProps) {
  const { theme } = useTheme()
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/details/${props.id}${window.location.search}`)
  }

  return (
    <div
      onClick={props.ignoreCardClick ? null : () => handleCardClick()}
      key={props.id}
      className={styles.cardBox}
      data-theme={theme}
    >
      {props.topElement}
      <LazyLoadImage
        alt={'Image'}
        height={'200'}
        src={props?.images?.length > 0 ? props?.images[0] : noimage}
        placeholderSrc={props.thumbnail}
        effect='blur'
        width={'200'}
      ></LazyLoadImage>
      <div className={styles.cardTextBox}>
        <div className='bold'>{props.title}</div>
        <div>{props.description}</div>
      </div>
      {props.bottomElement}
    </div>
  )
}

export default Card
