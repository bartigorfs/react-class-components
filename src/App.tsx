import React from 'react'

import Loader from '@components/Loader/Loader'
import ThrowError from '@components/ThrowError/ThrowError'
import { fetchData, searchData } from '@api/api'
import Card from '@components/Card/Card'

class App extends React.Component {
  state = {
    count: 0,
    url: null,
  }

  render(): React.ReactNode {
    return (
      <>
        <Card />
        <button onClick={fetchData}>ok fetch</button>
        <button onClick={() => searchData('phone')}>ok search</button>
        <input />
        <Loader />
        <ThrowError />
      </>
    )
  }
}

export default App
