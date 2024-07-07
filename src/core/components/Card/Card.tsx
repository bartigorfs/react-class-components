import React, { ReactNode } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import styles from './Card.module.css'
import noimage from '@assets/nothing.gif'
import { Product } from '@api/api.models'

interface CardProps extends Pick<Product, 'images' | 'thumbnail' | 'title' | 'description'> {}

class Card extends React.PureComponent<CardProps> {
  render(): ReactNode {
    return (
      <div className={styles.cardBox}>
        <LazyLoadImage
          alt={'Image'}
          height={'200'}
          src={this.props?.images?.length > 0 ? this.props?.images[0] : noimage}
          placeholderSrc={this.props.thumbnail}
          effect='blur'
          width={'200'}
        ></LazyLoadImage>
        <div className={styles.cardTextBox}>
          <div className='bold'>{this.props.title}</div>
          <div>{this.props.description}</div>
        </div>
      </div>
    )
  }
}

export default Card
