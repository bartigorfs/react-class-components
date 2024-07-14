import { useMemo, useState } from 'react'
import styles from './Pagination.module.css'
import { useSearchParams } from 'react-router-dom'

interface PaginationProps {
  totalItemsAmount: number
}

const getPageCount = (totalItemsAmount: number): number => {
  return totalItemsAmount > 0 ? Math.ceil(totalItemsAmount / 4) : 0
}

function Pagination(props: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1)
  const [pageCount] = useState(getPageCount(props.totalItemsAmount))

  const setActivePage = (buttonId: number) => {
    setCurrentPage(buttonId)
    setSearchParams({ page: buttonId })
  }

  const paginationItems: JSX.Element[] = useMemo(() => {
    return Array.from({ length: pageCount }, (_, i) => (
      <div
        key={i + 1}
        onClick={() => setActivePage(i + 1)}
        className={`${styles.paginationItem} ${currentPage === i + 1 ? styles.active : ''}`}
      >
        {i + 1}
      </div>
    ))
  }, [pageCount, props, currentPage])

  return (
    <div className={styles.container}>
      <div
        className={`${styles.paginationItem} ${currentPage <= 0 && styles.inactive}`}
        onClick={() => setActivePage(currentPage - 1)}
      >
        {'<'}
      </div>
      {paginationItems.map((item: JSX.Element) => item)}
      <div
        className={`${styles.paginationItem} ${currentPage === pageCount && styles.inactive}`}
        onClick={() => setActivePage(currentPage + 1)}
      >
        {'>'}
      </div>
    </div>
  )
}

export default Pagination
