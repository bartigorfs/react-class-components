import React, { ReactNode } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import styles from './Card.module.css'
import skeleton from '@assets/skeleton.svg'

interface CardProps {
  title: string
  imageUrl: string
  description: string
}

class Card extends React.PureComponent<CardProps> {
  constructor(props: CardProps) {
    super(props)
  }

  render(): ReactNode {
    return (
      <div className={styles.cardBox}>
        <LazyLoadImage
          alt={'Image'}
          height={'200'}
          src={this.props.imageUrl}
          placeholderSrc={skeleton}
          effect='blur'
          width={'200'}
        ></LazyLoadImage>
        <div className={styles.cardTextBox}>
          <div>{this.props.title}</div>
          <div>{this.props.description}</div>
        </div>
      </div>
    )
  }
}

export default Card
