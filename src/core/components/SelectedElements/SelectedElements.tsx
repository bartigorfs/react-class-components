import styles from './SelectedElements.module.css'
import { useSelector } from 'react-redux'
import {
  selectSelectedProducts,
  selectSelectedProductsCount,
  showSelectedElements,
} from '@store/reducers/products/products.reducer.ts'
import { downloadCSV } from '../../util/DownloadCSV.tsx'
import { Product } from '@api/api.models.ts'

export default function SelectedElements() {
  const selectedItemsCount: number | undefined = useSelector(selectSelectedProductsCount)
  const showElement: boolean = useSelector(showSelectedElements)
  const selectedProducts: Product[] = useSelector(selectSelectedProducts)

  const containerClassName = showElement ? styles.fadeIn : ''

  return (
    <>
      {showElement && (
        <div className={`${styles.container} ${containerClassName}`}>
          <span>
            <strong>Selected</strong>{' '}
            <span className={styles.selectedCount}>{selectedItemsCount}</span>
          </span>
          <a href={downloadCSV(selectedProducts)}>
            <button>Download</button>
          </a>
        </div>
      )}
    </>
  )
}
