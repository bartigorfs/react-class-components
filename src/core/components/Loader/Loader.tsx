import React from 'react'

import loader from '@assets/loader.gif'
import styles from './Loader.module.css'

function Loader() {
  return (
    <div className={styles.container}>
      <img src={loader} alt='Loading...'></img>
    </div>
  )
}

export default Loader
