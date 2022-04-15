import React, { ReactNode } from 'react'
import { CardsContextProvider } from '../hooks/cards'
import { ThemeContextProvider } from '../hooks/useTheme'

type AppProviderProps = {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeContextProvider>
      <CardsContextProvider>{children}</CardsContextProvider>
    </ThemeContextProvider>
  )
}

export { AppProvider }
