import React from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import noimage from '@assets/nothing.gif'

import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@hooks/useTheme/useTheme.tsx'
import Checkbox from '@components/Checkbox/Checkbox.tsx'
import { addSelectedId, removeSelectedId } from '@store/actions/products.actions.ts'

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

  const handleCheckboxClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation()
  }

  const handleOnChange = (value: boolean) => {
    if (value) {
      dispatch(addSelectedId(props.id))
    } else {
      dispatch(removeSelectedId(props.id))
    }
  }

  return (
    <div key={props.id} className={styles.cardBox} data-theme={theme}>
      {!props.ignoreCardClick && (
        <Checkbox label={'Select'} onChange={handleOnChange} onClick={() => handleCheckboxClick} />
      )}
      <LazyLoadImage
        alt={'Image'}
        onClick={props.ignoreCardClick ? null : () => handleCardClick()}
        height={'200'}
        src={props?.images?.length > 0 ? props?.images[0] : noimage}
        placeholderSrc={props.thumbnail}
        effect='blur'
        width={'200'}
      ></LazyLoadImage>
      <div
        onClick={props.ignoreCardClick ? null : () => handleCardClick()}
        className={styles.cardTextBox}
      >
        <div className='bold'>{props.title}</div>
        <div>{props.description}</div>
      </div>
      {props.bottomElement}
    </div>
  )
}

export default Card
