import React from 'react'

import classes from './DescribeError.module.css'

function DescribeError() {
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className={classes.box}>
      <h1>You got an error! Yay!</h1>
      <img src={'https://i.imgur.com/iNeBfPb.gif'} alt='Wasted'></img>
      <button onClick={reloadPage}>Bruh, reload?</button>
    </div>
  )
}

export default DescribeError
