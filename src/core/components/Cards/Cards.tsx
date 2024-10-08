import React from 'react'

import styles from './Cards.module.css'
import Card from '@components/Card/Card'
import { Product } from '@api/api.models'

interface CardsProps {
  cards: Product[]
}

function Cards(props: CardsProps) {
  return (
    <div data-testid='cards-container' className={styles.box}>
      {props.cards.length > 0 &&
        props.cards.map((item: Product) => <Card key={item.id} product={item} />)}
    </div>
  )
}

export default Cards
