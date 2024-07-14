import { useState, useEffect } from 'react';

function useLSSearch(key) {
  const [search, setSearch] = useState(JSON.stringify(localStorage.getItem(key) || ''));

  useEffect(() => {
    return () => {
      localStorage.setItem(key, JSON.stringify(search));
    };
  }, [search, key]);

  return [search, setSearch];
}

export default useLSSearch;
