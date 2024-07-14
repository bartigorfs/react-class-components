import { useState, useEffect } from 'react'

function useLSSearch(key: string) {
  const [search, setSearch] = useState(localStorage.getItem(key) || '')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(key, search || '')
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [search, key])

  return [search, setSearch]
}

export default useLSSearch
