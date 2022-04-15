import React from 'react'
import { TextInputProps } from 'react-native'

import { StyledTextInput } from './styles'

export const TextArea = (props: TextInputProps) => {
  return <StyledTextInput multiline {...props} />
}
