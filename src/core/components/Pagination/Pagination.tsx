import { useMemo, useState } from 'react'
import styles from './Pagination.module.css'

interface PaginationProps {
  totalItemsAmount: number
}

const getPageCount = (totalItemsAmount: number): number => {
  return totalItemsAmount > 0 ? Math.ceil(totalItemsAmount / 4) : 0
}

function Pagination(props: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(getPageCount(props.totalItemsAmount))

  const setActivePage = (buttonId: number) => {
    console.log(buttonId)
    setCurrentPage(buttonId)
  }

  const paginationItems = useMemo(() => {
    return Array.from({ length: pageCount }, (_, i) => (
      <div
        key={i}
        onClick={() => setActivePage(i)}
        className={`${styles.paginationItem} ${currentPage === i ? styles.active : ''}`}
      >
        {i + 1}
      </div>
    ))
  }, [pageCount, currentPage])

  return (
    <div className={styles.container}>
      <div className={styles.paginationItem}>{'<'}</div>
      {paginationItems.map((item) => item)}
      <div className={styles.paginationItem}>{'>'}</div>
    </div>
  )
}

export default Pagination
