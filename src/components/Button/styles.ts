import styled from 'styled-components/native'
import Animated from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled(TouchableWithoutFeedback)`
  width: 100%;
  height: 52px;
  position: relative;
`

export const StyledButton = styled(Animated.View)`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.highlight50};
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 0;
`

export const StyledHeight = styled.View`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.highlight90};
  height: 30px;
  position: absolute;
  bottom: 0;
  width: 100%;
`

export const StyledLabel = styled(StyledTitleText)`
  flex: 1;
  text-align: center;
  font-size: 28px;
  margin: auto;
`
