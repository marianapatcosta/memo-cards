import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const StyledContent = styled.View`
  flex: 1;
  justify-content: space-around;
`

export const StyledTitle = styled(StyledTitleText)`
  color: ${({ theme }) => theme.colors.highlight50};
  font-size: 28px;
  margin-bottom: 0;
`

export const StyledButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 24px;
  padding: 0;
  opacity: 0.8;
`

export const StyledButton = styled(RectButton)`
  height: 35px;
  width: 55px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-width: 1px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`

