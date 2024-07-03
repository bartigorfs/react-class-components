import React from 'react'

import loader from '@assets/loader.gif'

class Loader extends React.PureComponent {
  render(): React.ReactNode {
    return <img src={loader} alt='Loading...'></img>
  }
}

export default Loader
