import React from 'react'

import styles from './SearchField.module.css'
import useLSSearch from '@hooks/useLSSearch.tsx'

interface SearchFieldProps {
  onSearch: (query: string) => void
}

function SearchField(props: SearchFieldProps) {
  const [userInput, setUserInput] = useLSSearch<string>('userSearch')
  const userValidationRegEx: RegExp = new RegExp(/^\S*$/)

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (userValidationRegEx.test(value)) {
      setUserInput(value)
    }
  }

  const handleSearch = () => {
    props.onSearch(userInput)
  }

  return (
    <div className={styles.searchContainer}>
      <input value={userInput} onChange={handleSearchInputChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchField
