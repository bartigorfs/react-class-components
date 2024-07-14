import React from 'react'
import { ReactNode } from 'react'

import classes from './DescribeError.module.css'
import wasted from '@assets/wasted.gif'

class DescribeErorr extends React.PureComponent {
  reloadPage = () => {
    window.location.reload()
  }

  render(): ReactNode {
    return (
      <div className={classes.box}>
        <h1>You got an error! Yay!</h1>
        <img src={wasted} alt='Wasted'></img>
        <button onClick={this.reloadPage}>Bruh, reload?</button>
      </div>
    )
  }
}

export default DescribeErorr
