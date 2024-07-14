import { LazyLoadImage } from 'react-lazy-load-image-component'

import styles from './Card.module.css'
import noimage from '@assets/nothing.gif'

interface CardProps {
  id: number;
  images: string[] | undefined;
  thumbnail: string;
  title: string;
  description: string;
}

export default Card

function Card(props: CardProps) {

  return (
    <div className={styles.cardBox}>
      <LazyLoadImage
        alt={'Image'}
        height={'200'}
        src={props?.images?.length > 0 ? props?.images[0] : noimage}
        placeholderSrc={props.thumbnail}
        effect="blur"
        width={'200'}
      ></LazyLoadImage>
      <div className={styles.cardTextBox}>
        <div className="bold">{props.title}</div>
        <div>{props.description}</div>

      </div>
    </div>
  )
}
