import React from 'react'
import { StyledContainer, StyledMessage } from './styles'

type NoDataProps = {
  message: string
}

export const NoData = ({ message, ...otherProps }: NoDataProps) => {
  return (
    <StyledContainer {...otherProps}>
      <StyledMessage>{message}</StyledMessage>
    </StyledContainer>
  )
}
