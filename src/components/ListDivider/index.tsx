import React from 'react'
import { View } from 'react-native'

import { StyledContainer } from './styles'

type ListDividerProps = {
  isCentered?: boolean
}

export const ListDivider = ({ isCentered }: ListDividerProps) => {
  return (
    <StyledContainer
      style={
        isCentered ? { marginVertical: 12 } : { marginTop: 2, marginBottom: 31 }
      }
    />
  )
}
