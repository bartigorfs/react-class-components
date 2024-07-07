import React from 'react'

import Loader from '@components/Loader/Loader'
import ThrowError from '@components/ThrowError/ThrowError'
import { fetchData, searchData } from '@api/api'
import Card from '@components/Card/Card'
import { Product } from '@api/api.models'
import Cards from '@components/Cards/Cards'

interface AppState {
  cards: any[]
  loadingCards: boolean
}

class App extends React.Component {
  state: AppState = {
    cards: [],
    loadingCards: false,
  }

  fetchProductsData = async () => {
    this.setState({
      loadingCards: true,
    })
    try {
      const result = await fetchData()
      this.setState({
        cards: result,
        loadingCards: false,
      })
    } catch (e) {
      this.setState({
        cards: [],
        loadingCards: false,
      })
    }
  }

  async componentDidMount(): Promise<void> {
    this.fetchProductsData()
  }

  render(): React.ReactNode {
    const { cards, loadingCards } = this.state

    return (
      <div className='container'>
        <button onClick={() => this.fetchProductsData()}>ok fetch</button>
        <button onClick={() => searchData('phone')}>ok search</button>
        <input />
        <Loader />
        {loadingCards ? <Loader /> : <Cards cards={cards} />}
        <ThrowError />
      </div>
    )
  }
}

export default App
