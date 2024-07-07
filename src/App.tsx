import React from 'react'

import { fetchData } from '@api/api'
import { Product } from '@api/api.models'

import Cards from '@components/Cards/Cards'
import Loader from '@components/Loader/Loader'
import ThrowError from '@components/ThrowError/ThrowError'
import SearchField from '@components/SearchField/SearchField'

interface AppProps {}

interface AppState {
  cards: Product[]
  loadingCards: boolean
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    cards: [],
    loadingCards: false,
  }

  saveSearchLS = (query: string | undefined) => {
    if (!query) return
    localStorage.setItem('userSearch', query)
  }

  fetchProductsData = async (query?: string) => {
    this.setState({
      loadingCards: true,
    })
    try {
      let result = await fetchData(query)

      if (result && result.length <= 0) {
        result = await fetchData()
      }

      this.setState({
        cards: result!,
        loadingCards: false,
      })

      this.saveSearchLS(query)
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
        <SearchField onSearch={this.handleSearch} />
        {loadingCards ? <Loader /> : <Cards cards={cards} />}
        <ThrowError />
      </div>
    )
  }
}

export default App
