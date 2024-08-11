import React from 'react'

import noimage from '@assets/nothing.gif'

import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@hooks/useTheme/useTheme.tsx'
import Checkbox from '@components/Checkbox/Checkbox.tsx'
import { addSelectedId, removeSelectedId } from '@store/actions/products.actions.ts'
import { useDispatch } from 'react-redux'
import { Product } from '@api/api.models.ts'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface CardProps {
  product: Product
  bottomElement?: React.ReactNode
  topElement?: React.ReactNode
  ignoreCardClick?: boolean
}

function Card(props: CardProps) {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCardClick = () => {
    navigate(`/details/${props.product.id}${window.location.search}`)
  }

  const handleCheckboxClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation()
  }

  const handleOnChange = (value: boolean) => {
    if (value) {
      dispatch(addSelectedId(props.product))
    } else {
      dispatch(removeSelectedId(props.product.id))
    }
  }

  return (
    <div key={props.product?.id} className={styles.cardBox} data-theme={theme}>
      {!props.ignoreCardClick && (
        <Checkbox label={'Select'} onChange={handleOnChange} onClick={() => handleCheckboxClick} />
      )}
      <LazyLoadImage
        alt={'Image'}
        onClick={props.ignoreCardClick ? null : () => handleCardClick()}
        height={'200'}
        src={props?.product?.images?.length > 0 ? props?.product?.images[0] : noimage}
        placeholderSrc={props.product?.thumbnail}
        effect='blur'
        width={'200'}
      ></LazyLoadImage>
      <div
        onClick={props.ignoreCardClick ? null : () => handleCardClick()}
        className={styles.cardTextBox}
      >
        <div className='bold'>{props.product?.title}</div>
        <div>{props.product?.description}</div>
      </div>
      {props.bottomElement}
    </div>
  )
}

export default Card
