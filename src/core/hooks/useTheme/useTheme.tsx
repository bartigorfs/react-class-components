import { useContext } from 'react'
import { IThemeContext, ThemeContext } from '@ctx/themeCtx.tsx'

export const useTheme = (): IThemeContext => {
  return useContext(ThemeContext)
}
