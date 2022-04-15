import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

import { StyledContainer, StyledContent, StyledTitle } from './styles'

export type CategoryProps = RectButtonProps & {
  title: string
  checked?: boolean
}

export const Category = ({
  title,
  checked = false,
  ...otherProps
}: CategoryProps) => {
  const theme = useTheme()
  const { primary, secondary, tertiary } = theme.colors

  return (
    <StyledContainer {...otherProps}>
      <StyledContent
        colors={[checked ? primary : secondary, tertiary]}
        checked={checked}
      >
        <StyledTitle>{title}</StyledTitle>
      </StyledContent>
    </StyledContainer>
  )
}
