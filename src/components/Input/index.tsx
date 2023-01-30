import React, { ReactNode } from 'react'
import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components'
import {
  StyledContainer,
  StyledInputWrapper,
  StyledInput,
  StyledError,
} from './styles'

type InputProps = TextInputProps & {
  icon?: ReactNode
  error?: string
}

export const Input = ({
  icon,
  error,
  placeholderTextColor,
  style,
  ...otherProps
}: InputProps) => {
  const theme = useTheme()
  return (
    <StyledContainer style={style}>
      <StyledInputWrapper>
        <StyledInput
          {...otherProps}
          hasIcon={!!icon}
          maxLength={50}
          placeholderTextColor={placeholderTextColor || theme.colors.grey50}
        />
        {icon}
      </StyledInputWrapper>

      {!!error && <StyledError>{error}</StyledError>}
    </StyledContainer>
  )
}
