import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import { Card } from '../Card'

export const StyledContainer = styled(Pressable)`
  width: 100%;
  height: 100%;
`

export const StyledCardFront = styled(Card)``

export const StyledCardBack = styled(Card)`
  position: absolute;
  top: 0;
`
