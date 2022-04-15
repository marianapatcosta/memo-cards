import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StyledRegularText } from '../../themes/global-styles'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export const StyledContainer = styled.View`
  flex: 1;
`

export const StyledContent = styled.View`
  padding: 0 16px;
  flex: 1;
`

export const StyledHeader = styled(LinearGradient)`
  height: 120px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: ${getStatusBarHeight() + 26}px 5% 42px;
  background-color: ${({ theme }) => theme.colors.highlight50};
  margin-bottom: 16px;
`

export const StyledImage = styled.Image`
  justify-content: flex-start;
  width: 250px;
  height: 70px;
  margin-top: 20px;
`

export const StyledRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`

export const StyledTitle = styled(StyledRegularText)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.font};
`

export const StyledCardList = styled.FlatList`
  height: 100%;
  flex-grow: 0;
`

export const StyledButtonIcon = styled(TouchableWithoutFeedback)<{
  favoriteFilterOn?: boolean
}>`
  background-color: ${({ theme }) => theme.colors.secondary};
  flex: 1;
  margin-left: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  border-radius: 8px;

  ${({ favoriteFilterOn }) =>
    favoriteFilterOn
      ? ` 
     opacity: 1`
      : `opacity: 0.5;`}
`
