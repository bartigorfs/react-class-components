import React from 'react'

import styles from './Loader.module.css'

interface LoaderProps {
  width?: number
  height?: number
}

function Loader(props: LoaderProps) {
  return (
    <div className={styles.container}>
      <img
        width={props.width}
        height={props.height}
        src={'https://i.imgur.com/lHYnk4w.gif'}
        alt='Loading...'
      ></img>
    </div>
  )
}

export default Loader
