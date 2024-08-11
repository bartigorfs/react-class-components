import React from 'react'

import loader from '@public/loader.gif'
import styles from './Loader.module.css'

interface LoaderProps {
  width?: number
  height?: number
}

function Loader(props: LoaderProps) {
  return (
    <div className={styles.container}>
      <img width={props.width} height={props.height} src={loader} alt='Loading...'></img>
    </div>
  )
}

export default Loader
