import styled from 'styled-components/native'
import Animated from 'react-native-reanimated'
import { StyledRegularText, StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled(Animated.View)`
  height: 100%;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  backface-visibility: hidden;
`

export const StyledTitle = styled(StyledTitleText)`
  color: ${({ theme }) => theme.colors.font};
`

export const StyledCategory = styled(StyledRegularText)`
  margin-top: 50px;
`
