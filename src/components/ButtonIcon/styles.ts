import styled from 'styled-components/native'
import Animated from 'react-native-reanimated'
import {
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'

export const StyledButtonIcon = styled(TouchableWithoutFeedback)`
  height: 52px;
  width: 48px;
  position: relative;
  
`

export const StyledHeight = styled.View`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 30px;
  position: absolute;
  bottom: 1px;
  width: 100%;
`

export const StyledInner = styled(Animated.View)`
  height: 48px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
`
