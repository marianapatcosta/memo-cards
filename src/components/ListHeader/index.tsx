import React from 'react'
import { StyledContainer, StyledTitle, StyledSubtitle } from './styles'

type ListHeaderProps = {
  title: string
  subtitle: string
}

export const ListHeader = ({ title, subtitle }: ListHeaderProps) => {
  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </StyledContainer>
  )
}
