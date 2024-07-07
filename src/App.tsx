import React from 'react'

import { fetchData } from '@api/api'
import { Product } from '@api/api.models'

import Cards from '@components/Cards/Cards'
import Loader from '@components/Loader/Loader'
import ThrowError from '@components/ThrowError/ThrowError'
import SearchField from '@components/SearchField/SearchField'

interface AppState {
  cards: Product[]
  loadingCards: boolean
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    cards: [],
    loadingCards: false,
  }

  fetchProductsData = async (query?: string) => {
    this.setState({
      loadingCards: true,
    })
    try {
      const result = await fetchData(query)
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

  handleSearch = (query: string) => {
    this.fetchProductsData(query)
  }

  async componentDidMount(): Promise<void> {
    this.fetchProductsData()
  }

  render(): React.ReactNode {
    const { cards, loadingCards } = this.state

    return (
      <div className='container'>
        <button onClick={() => this.fetchProductsData()}>ok fetch</button>
        <SearchField onSearch={this.handleSearch} />
        {loadingCards ? <Loader /> : <Cards cards={cards} />}
        <ThrowError />
      </div>
    )
  }
}

export default App
