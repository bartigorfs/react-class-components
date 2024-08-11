import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './404.module.css'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <h1>Snort, snort, nothing!</h1>
      <img src={'https://i.imgur.com/apgV4mk.gif'} alt='Not found' />
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  )
}

export default NotFound
