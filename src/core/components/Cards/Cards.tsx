import React from 'react'

import styles from './Cards.module.css'
import Card from '@components/Card/Card'
import { Product } from '@api/api.models'
import { i } from 'vite/dist/node/types.d-aGj9QkWt'

interface CardsProps {
  cards: Product[]
}

function Cards(props: CardsProps) {
  return (
    <div data-testid='cards-container' className={styles.box}>
      {props.cards.length > 0 &&
        props.cards.map((item: Product) => <Card key={item.id} {...item} />)}
    </div>
  )
}

export default Cards
