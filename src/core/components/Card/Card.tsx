import React, { ReactNode } from 'react'

import styles from './Card.module.css'

class Card extends React.PureComponent {
  render(): ReactNode {
    return <div className={styles.cardBox}></div>
  }
}

export default Card
