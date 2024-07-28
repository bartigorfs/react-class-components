import React, { useEffect } from 'react'

import styles from './SearchField.module.css'
import useLSSearch from '@hooks/useLSSearch/useLSSearch.tsx'
import { useTheme } from '@hooks/useTheme/useTheme.tsx'

interface SearchFieldProps {
  onSearch: (query: string) => void
}

function SearchField(props: SearchFieldProps) {
  const { theme } = useTheme()

  const [userInput, setUserInput] = useLSSearch<string>('userSearch')
  const userValidationRegEx: RegExp = new RegExp(/^\S*$/)

  useEffect(() => {
    setUserInput(localStorage.getItem('userSearch'))
  }, [setUserInput])

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
    <div data-testid='search-input' className={styles.searchContainer} data-theme={theme}>
      <input value={userInput} onChange={handleSearchInputChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchField
