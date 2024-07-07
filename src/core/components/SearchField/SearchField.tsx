import React from 'react'

import styles from './SearchField.module.css'

interface SearchFieldProps {
  onSearch: (query: string) => void
}

interface SearchFieldState {
  userInput: string
  userValidationRegEx: RegExp
}

class SearchField extends React.PureComponent<SearchFieldProps, SearchFieldState> {
  state = {
    userInput: '',
    userValidationRegEx: new RegExp(/^\S*$/),
  }

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (this.state.userValidationRegEx.test(value)) {
      this.setState({
        userInput: value,
      })
    }
  }

  handleSearch = () => {
    this.props.onSearch(this.state.userInput)
  }

  render(): React.ReactNode {
    return (
      <div className={styles.searchContainer}>
        <input value={this.state.userInput} onChange={this.handleSearchInputChange} />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    )
  }
}

export default SearchField
