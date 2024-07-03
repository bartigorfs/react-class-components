import React from 'react'

import styles from './Header.module.css'

class Header extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <div className={styles.header}>
        <a href='https://github.com/bartigorfs' target='_blank'>
          @bartigorfs
        </a>
      </div>
    )
  }
}

export default Header
