import React from 'react'

import Loader from '@components/Loader/Loader'
import ThrowError from '@components/ThrowError/ThrowError'
import { fetchData, searchData } from '@api/api'
import Card from '@components/Card/Card'

class App extends React.Component {
  state = {
    cards: [],
  }

  async componentDidMount(): Promise<void> {
    const result = await fetchData()
    this.setState({
      cards: result,
    })
  }

  render(): React.ReactNode {
    return (
      <>
        {this.state.cards.length > 0 &&
          this.state.cards.map((item) => (
            <Card imageUrl={item.images[0]} title={item.title} description={item.description} />
          ))}
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
