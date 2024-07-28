import { useState } from 'react'
import { Theme, ThemeContext } from '@ctx/themeCtx.tsx'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark')

  const toggleTheme = () => {
    setTheme((prevTheme: Theme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        data-testid='theme-provider'
        className={`themeWrapper ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
