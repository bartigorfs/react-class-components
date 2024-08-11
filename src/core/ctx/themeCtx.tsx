import { Context, createContext } from 'react'

export type Theme = 'light' | 'dark'

export interface IThemeContext {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext: Context<IThemeContext> = createContext<IThemeContext>({
  toggleTheme(): void {},
  theme: 'dark',
})
