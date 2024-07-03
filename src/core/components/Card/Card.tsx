import React, { ReactNode } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import styles from './Card.module.css'

class Card extends React.PureComponent {
  render(): ReactNode {
    return (
      <div className={styles.cardBox}>
        <LazyLoadImage
          alt={'Image'}
          height={'200'}
          src={
            'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'
          }
          width={'200'}
        ></LazyLoadImage>
        <div className={styles.cardTextBox}>
          <div>Card header</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis non dignissimos
            deserunt, nihil rem sit odio. Sapiente neque aperiam voluptatem ipsum. Laborum facere
            delectus voluptas velit corporis dolorem sint esse!
          </div>
        </div>
      </div>
    )
  }
}

export default Card
