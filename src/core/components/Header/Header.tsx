import React from 'react'

import styles from './Header.module.css'
import { useTheme } from '@hooks/useTheme/useTheme.tsx'

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={styles.header}>
      <a href='https://github.com/bartigorfs' target='_blank'>
        @bartigorfs
      </a>
      <button onClick={toggleTheme}>{theme}</button>
    </div>
  )
}

export default Header
