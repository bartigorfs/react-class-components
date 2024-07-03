import React from 'react'

import Loader from '@components/Loader/Loader'
import ThrowError from '@components/ThrowError/ThrowError'
import { fetchData, searchData } from '@api/api'

class App extends React.Component {
  state = {
    count: 0,
    url: null,
  }

  render(): React.ReactNode {
    return (
      <>
        <div>
          {this.state.count}
          {this.state.url}
          DB_PASSWORD
          {import.meta.env.VITE_API_URL}
        </div>
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
