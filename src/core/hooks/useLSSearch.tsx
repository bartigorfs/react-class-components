import { useState, useEffect } from 'react'

function useLSSearch(key: string) {
  const [search, setSearch] = useState(localStorage.getItem(key) || '')

  useEffect(() => {
    return () => {
      localStorage.setItem(key, search)
    }
  }, [search, key])

  return [search, setSearch]
}

export default useLSSearch
