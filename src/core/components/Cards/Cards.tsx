import React from 'react'
import { ReactNode } from 'react'

import styles from './Cards.module.css'
import Card from '@components/Card/Card'
import { Product } from '@api/api.models'

interface CardsProps {
  cards: Product[]
}

class Cards extends React.PureComponent<CardsProps> {
  render(): ReactNode {
    return (
      <div className={styles.box}>
        {this.props.cards.length > 0 &&
          this.props.cards.map((item: Product) => (
            <Card
              key={item.id}
              images={item.images}
              thumbnail={item.thumbnail}
              title={item.title}
              description={item.description}
            />
          ))}
      </div>
    )
  }
}

export default Cards
